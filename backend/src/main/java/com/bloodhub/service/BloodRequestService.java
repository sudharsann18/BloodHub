package com.bloodhub.service;

import com.bloodhub.dto.BloodRequestRequest;
import com.bloodhub.dto.BloodRequestResponse;
import com.bloodhub.entity.BloodRequest;
import com.bloodhub.entity.RequestStatus;
import com.bloodhub.entity.Role;
import com.bloodhub.entity.User;
import com.bloodhub.repository.BloodRequestRepository;
import com.bloodhub.repository.UserRepository;
import com.bloodhub.security.JwtService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BloodRequestService {

    private final BloodRequestRepository bloodRequestRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public BloodRequestService(
            BloodRequestRepository bloodRequestRepository,
            UserRepository userRepository,
            JwtService jwtService) {

        this.bloodRequestRepository = bloodRequestRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    // =========================
    // USER CREATES REQUEST
    // =========================

    public BloodRequestResponse createRequest(
            BloodRequestRequest request,
            String token) {

        User user = getUserFromToken(token);

        // Find selected blood bank
        if (request.getBloodBankId() == null) {
            throw new RuntimeException("Blood bank must be selected");
        }

        User bloodBank = userRepository.findById(request.getBloodBankId())
                .orElseThrow(() ->
                        new RuntimeException("Blood bank not found"));

        // Make sure selected account is actually a Blood Bank
        if (bloodBank.getRole() != Role.BLOOD_BANK) {
            throw new RuntimeException(
                    "Selected user is not a blood bank");
        }

        BloodRequest bloodRequest = BloodRequest.builder()
                .patientName(request.getPatientName())
                .bloodGroup(request.getBloodGroup())
                .units(request.getUnits())
                .hospital(request.getHospital())
                .location(request.getLocation())
                .contactNumber(request.getContactNumber())
                .urgency(request.getUrgency())
                .status(RequestStatus.REQUESTED)
                .createdAt(LocalDateTime.now())
                .requestedBy(user)
                .bloodBank(bloodBank)
                .build();

        bloodRequestRepository.save(bloodRequest);

        return convertToResponse(bloodRequest);
    }

    // =========================
    // USER VIEWS OWN REQUESTS
    // =========================

    public List<BloodRequestResponse> getMyRequests(String token) {

        User user = getUserFromToken(token);

        return bloodRequestRepository
                .findByRequestedBy(user)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =========================
    // BLOOD BANK VIEWS ITS REQUESTS
    // =========================

    public List<BloodRequestResponse> getAllRequests(String token) {

        User bloodBank = getUserFromToken(token);

        return bloodRequestRepository
                .findByBloodBank(bloodBank)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =========================
    // BLOOD BANK ACCEPTS REQUEST
    // =========================

    public BloodRequestResponse acceptRequest(
            Long id,
            String token) {

        User bloodBank = getUserFromToken(token);

        BloodRequest request = bloodRequestRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Request not found"));

        // Security check
        if (request.getBloodBank() == null ||
                !request.getBloodBank().getId().equals(bloodBank.getId())) {

            throw new RuntimeException(
                    "You are not authorized to accept this request");
        }

        request.setStatus(RequestStatus.ACCEPTED);

        bloodRequestRepository.save(request);

        return convertToResponse(request);
    }

    // =========================
    // BLOOD BANK VIEWS ACCEPTED REQUESTS
    // =========================

    public List<BloodRequestResponse> getAcceptedRequests(
            String token) {

        User bloodBank = getUserFromToken(token);

        return bloodRequestRepository
                .findByBloodBankAndStatus(
                        bloodBank,
                        RequestStatus.ACCEPTED
                )
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =========================
    // COMPLETE REQUEST
    // =========================

    public BloodRequestResponse completeRequest(
            Long id,
            String token) {

        User bloodBank = getUserFromToken(token);

        BloodRequest request = bloodRequestRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Request not found"));

        // Security check
        if (request.getBloodBank() == null ||
                !request.getBloodBank().getId().equals(bloodBank.getId())) {

            throw new RuntimeException(
                    "You are not authorized to complete this request");
        }

        request.setStatus(RequestStatus.COMPLETED);

        bloodRequestRepository.save(request);

        return convertToResponse(request);
    }

    // =========================
    // GET USER FROM JWT
    // =========================

    private User getUserFromToken(String token) {

        if (token == null || !token.startsWith("Bearer ")) {
            throw new RuntimeException(
                    "Invalid authorization token");
        }

        token = token.substring(7);

        String email = jwtService.extractEmail(token);

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    // =========================
    // ENTITY → RESPONSE
    // =========================

    private BloodRequestResponse convertToResponse(
            BloodRequest request) {

        return new BloodRequestResponse(
                request.getId(),
                request.getPatientName(),
                request.getBloodGroup(),
                request.getUnits(),
                request.getHospital(),
                request.getLocation(),
                request.getContactNumber(),
                request.getUrgency(),
                request.getStatus(),
                request.getCreatedAt(),
                request.getRequestedBy().getFullName()
        );
    }
}