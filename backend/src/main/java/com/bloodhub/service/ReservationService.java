package com.bloodhub.service;

import com.bloodhub.dto.ReservationRequest;
import com.bloodhub.dto.ReservationResponse;
import com.bloodhub.entity.RequestStatus;
import com.bloodhub.entity.Reservation;
import com.bloodhub.entity.User;
import com.bloodhub.repository.ReservationRepository;
import com.bloodhub.repository.UserRepository;
import com.bloodhub.security.JwtService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public ReservationService(
            ReservationRepository reservationRepository,
            UserRepository userRepository,
            JwtService jwtService) {

        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    // =========================
    // USER CREATES RESERVATION
    // =========================

    public ReservationResponse createReservation(
            ReservationRequest request,
            String token) {

        User user = getUserFromToken(token);

        // Find selected blood bank
        User bloodBank = userRepository.findById(request.getBloodBankId())
                .orElseThrow(() ->
                        new RuntimeException("Blood bank not found"));

        // Make sure selected account is actually a blood bank
        if (bloodBank.getRole() == null ||
                !bloodBank.getRole().name().equals("BLOOD_BANK")) {

            throw new RuntimeException("Selected user is not a blood bank");
        }

        Reservation reservation = Reservation.builder()
                .patientName(request.getPatientName())
                .bloodGroup(request.getBloodGroup())
                .units(request.getUnits())
                .hospital(request.getHospital())
                .location(request.getLocation())
                .contactNumber(request.getContactNumber())
                .reservationDate(LocalDate.parse(request.getReservationDate()))
                .reservationTime(LocalTime.parse(request.getReservationTime()))
                .status(RequestStatus.REQUESTED)
                .reservedBy(user)
                .bloodBank(bloodBank)
                .build();

        reservationRepository.save(reservation);

        return convertToResponse(reservation);
    }

    // =========================
    // BLOOD BANK VIEWS ITS RESERVATIONS
    // =========================

    public List<ReservationResponse> getAllReservations(
            String token) {

        User bloodBank = getUserFromToken(token);

        return reservationRepository
                .findByBloodBank(bloodBank)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =========================
    // BLOOD BANK APPROVES RESERVATION
    // =========================

    public ReservationResponse approveReservation(
            Long id,
            String token) {

        User bloodBank = getUserFromToken(token);

        Reservation reservation = reservationRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Reservation not found"));

        // Make sure this reservation belongs to this blood bank
        if (reservation.getBloodBank() == null ||
                !reservation.getBloodBank().getId().equals(bloodBank.getId())) {

            throw new RuntimeException(
                    "You are not authorized to approve this reservation");
        }

        reservation.setStatus(RequestStatus.ACCEPTED);

        reservationRepository.save(reservation);

        return convertToResponse(reservation);
    }
    // =========================
// BLOOD BANK COMPLETES RESERVATION
// =========================

    public ReservationResponse completeReservation(
            Long id,
            String token) {

        User bloodBank = getUserFromToken(token);

        Reservation reservation = reservationRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Reservation not found"));

        // Make sure this reservation belongs to this blood bank
        if (reservation.getBloodBank() == null ||
                !reservation.getBloodBank().getId().equals(bloodBank.getId())) {

            throw new RuntimeException(
                    "You are not authorized to complete this reservation");
        }

        // Only ACCEPTED reservations can be completed
        if (reservation.getStatus() != RequestStatus.ACCEPTED) {
            throw new RuntimeException(
                    "Only accepted reservations can be completed");
        }

        reservation.setStatus(RequestStatus.COMPLETED);

        reservationRepository.save(reservation);

        return convertToResponse(reservation);
    }

    // =========================
    // GET USER FROM JWT
    // =========================

    private User getUserFromToken(String token) {

        if (token == null || !token.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid authorization token");
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

    private ReservationResponse convertToResponse(
            Reservation reservation) {

        return new ReservationResponse(
                reservation.getId(),
                reservation.getPatientName(),
                reservation.getBloodGroup(),
                reservation.getUnits(),
                reservation.getHospital(),
                reservation.getLocation(),
                reservation.getContactNumber(),
                reservation.getReservationDate(),
                reservation.getReservationTime(),
                reservation.getStatus(),
                reservation.getReservedBy().getFullName()
        );
    }

    // =========================
// USER VIEWS OWN RESERVATIONS
// =========================

    public List<ReservationResponse> getMyReservations(
            String token) {

        User user = getUserFromToken(token);

        return reservationRepository
                .findByReservedBy(user)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
}