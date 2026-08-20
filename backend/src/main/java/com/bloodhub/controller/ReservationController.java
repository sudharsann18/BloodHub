package com.bloodhub.controller;

import com.bloodhub.dto.ReservationRequest;
import com.bloodhub.dto.ReservationResponse;
import com.bloodhub.service.ReservationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    // USER creates reservation
    @PostMapping
    public ReservationResponse createReservation(
            @RequestBody ReservationRequest request,
            @RequestHeader("Authorization") String token) {

        return reservationService.createReservation(request, token);
    }

    // BLOOD BANK views only its reservations
    @GetMapping
    public List<ReservationResponse> getReservations(
            @RequestHeader("Authorization") String token) {

        return reservationService.getAllReservations(token);
    }

    // BLOOD BANK approves its own reservation
    @PutMapping("/{id}/approve")
    public ReservationResponse approveReservation(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token) {

        return reservationService.approveReservation(id, token);
    }

    // USER views own reservations
    @GetMapping("/my")
    public List<ReservationResponse> getMyReservations(
            @RequestHeader("Authorization") String token) {

        return reservationService.getMyReservations(token);
    }

    // BLOOD BANK COMPLETES RESERVATION
    @PutMapping("/{id}/complete")
    public ReservationResponse completeReservation(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token) {

        return reservationService.completeReservation(id, token);
    }
}