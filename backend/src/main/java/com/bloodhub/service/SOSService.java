package com.bloodhub.service;

import com.bloodhub.dto.SOSRequestDTO;
import com.bloodhub.dto.SOSResponseDTO;
import com.bloodhub.entity.SOSRequest;
import com.bloodhub.entity.SOSStatus;
import com.bloodhub.entity.User;
import com.bloodhub.repository.SOSRepository;
import com.bloodhub.repository.UserRepository;
import com.bloodhub.security.JwtService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SOSService {

    private final SOSRepository sosRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public SOSService(
            SOSRepository sosRepository,
            UserRepository userRepository,
            JwtService jwtService) {

        this.sosRepository = sosRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    // ==========================================
    // CREATE / BROADCAST SOS
    // ==========================================

    public SOSResponseDTO createSOS(
            SOSRequestDTO dto,
            String token) {

        User user = getUserFromToken(token);

        if (dto.getBloodGroup() == null ||
                dto.getBloodGroup().isBlank()) {

            throw new RuntimeException(
                    "Blood group is required");
        }

        if (dto.getUnits() == null ||
                dto.getUnits() <= 0) {

            throw new RuntimeException(
                    "Units must be greater than 0");
        }

        SOSRequest sos = SOSRequest.builder()
                .patientName(user.getFullName())
                .hospital(dto.getHospital())
                .phone(user.getPhone())
                .bloodGroup(dto.getBloodGroup())
                .units(dto.getUnits())
                .message(dto.getMessage())
                .status(SOSStatus.BROADCASTED)
                .createdAt(LocalDateTime.now())
                .requestedBy(user)
                .build();

        sosRepository.save(sos);

        return convertToResponse(sos);
    }

    // ==========================================
    // OTHER USERS SEE AVAILABLE SOS
    // ==========================================

    public List<SOSResponseDTO> getAvailableSOS(
            String token) {

        User user = getUserFromToken(token);

        return sosRepository
                .findAvailableSOS(
                        SOSStatus.BROADCASTED,
                        user.getId()
                )
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // USER SEES THEIR OWN SOS
    // ==========================================

    public List<SOSResponseDTO> getMySOS(
            String token) {

        User user = getUserFromToken(token);

        /*
         * IMPORTANT:
         *
         * Do NOT throw an error when the user has
         * an active SOS.
         *
         * The requester needs to call this endpoint
         * to check whether someone has accepted
         * their SOS.
         */

        return sosRepository
                .findByRequestedByOrderByIdDesc(user)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // DONOR ACCEPTS SOS
    // ==========================================

    public SOSResponseDTO acceptSOS(
            Long id,
            String token) {

        User donor = getUserFromToken(token);

        SOSRequest sos = sosRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "SOS request not found"));

        // User cannot accept their own SOS
        if (sos.getRequestedBy() != null &&
                sos.getRequestedBy().getId()
                        .equals(donor.getId())) {

            throw new RuntimeException(
                    "You cannot accept your own SOS request");
        }

        // Only BROADCASTED requests can be accepted
        if (sos.getStatus() != SOSStatus.BROADCASTED) {

            throw new RuntimeException(
                    "This SOS request is no longer available");
        }

        // Save donor
        sos.setAcceptedBy(donor);

        // Change status
        sos.setStatus(SOSStatus.ACCEPTED);

        sosRepository.save(sos);

        return convertToResponse(sos);
    }

    // ==========================================
    // REQUESTER CONFIRMS DONOR
    // ==========================================

    public SOSResponseDTO confirmSOS(
            Long id,
            String token) {

        User requester = getUserFromToken(token);

        SOSRequest sos = sosRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "SOS request not found"));

        // Only requester can confirm
        if (sos.getRequestedBy() == null ||
                !sos.getRequestedBy().getId()
                        .equals(requester.getId())) {

            throw new RuntimeException(
                    "Only the SOS requester can confirm the donor");
        }

        // Must be accepted first
        if (sos.getStatus() != SOSStatus.ACCEPTED) {

            throw new RuntimeException(
                    "SOS must be accepted before confirmation");
        }

        // Make sure a donor exists
        if (sos.getAcceptedBy() == null) {

            throw new RuntimeException(
                    "No donor has accepted this SOS");
        }

        sos.setStatus(SOSStatus.CONFIRMED);

        sosRepository.save(sos);

        return convertToResponse(sos);
    }

    // ==========================================
    // DONOR SEES SOS THEY ACCEPTED
    // ==========================================

    public List<SOSResponseDTO> getAcceptedSOS(
            String token) {

        User donor = getUserFromToken(token);

        return sosRepository
                .findByAcceptedByOrderByIdDesc(donor)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // JWT → USER
    // ==========================================

    private User getUserFromToken(String token) {

        if (token == null ||
                !token.startsWith("Bearer ")) {

            throw new RuntimeException(
                    "Invalid authorization token");
        }

        token = token.substring(7);

        String email =
                jwtService.extractEmail(token);

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"));
    }

    // ==========================================
    // ENTITY → RESPONSE
    // ==========================================

    private SOSResponseDTO convertToResponse(
            SOSRequest sos) {

        User requester = sos.getRequestedBy();
        User donor = sos.getAcceptedBy();

        return new SOSResponseDTO(
                sos.getId(),

                sos.getPatientName(),

                sos.getHospital(),

                sos.getPhone(),

                sos.getBloodGroup(),

                sos.getUnits(),

                sos.getMessage(),

                sos.getStatus(),

                sos.getCreatedAt(),

                // Requester ID
                requester != null
                        ? requester.getId()
                        : null,

                // Requester name
                requester != null
                        ? requester.getFullName()
                        : null,

                // Donor ID
                donor != null
                        ? donor.getId()
                        : null,

                // Donor name
                donor != null
                        ? donor.getFullName()
                        : null,

                // Donor phone
                donor != null
                        ? donor.getPhone()
                        : null
        );
    }
}