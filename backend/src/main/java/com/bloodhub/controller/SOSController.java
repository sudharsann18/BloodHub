package com.bloodhub.controller;

import com.bloodhub.dto.SOSRequestDTO;
import com.bloodhub.dto.SOSResponseDTO;
import com.bloodhub.service.SOSService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sos")
public class SOSController {

    private final SOSService sosService;

    public SOSController(SOSService sosService) {
        this.sosService = sosService;
    }

    // ==========================================
    // USER BROADCASTS SOS
    // ==========================================

    @PostMapping
    public SOSResponseDTO createSOS(
            @RequestBody SOSRequestDTO request,
            @RequestHeader("Authorization") String token) {

        return sosService.createSOS(request, token);
    }

    // ==========================================
    // OTHER USERS SEE AVAILABLE SOS
    // ==========================================

    @GetMapping("/available")
    public List<SOSResponseDTO> getAvailableSOS(
            @RequestHeader("Authorization") String token) {

        return sosService.getAvailableSOS(token);
    }

    // ==========================================
    // USER SEES THEIR OWN SOS
    // ==========================================

    @GetMapping("/my")
    public List<SOSResponseDTO> getMySOS(
            @RequestHeader("Authorization") String token) {

        return sosService.getMySOS(token);
    }

    // ==========================================
    // DONOR ACCEPTS SOS
    // ==========================================

    @PutMapping("/{id}/accept")
    public SOSResponseDTO acceptSOS(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token) {

        return sosService.acceptSOS(id, token);
    }

    // ==========================================
    // REQUESTER CONFIRMS DONOR
    // ==========================================

    @PutMapping("/{id}/confirm")
    public SOSResponseDTO confirmSOS(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token) {

        return sosService.confirmSOS(id, token);
    }

    // ==========================================
    // DONOR SEES SOS THEY ACCEPTED
    // ==========================================

    @GetMapping("/accepted")
    public List<SOSResponseDTO> getAcceptedSOS(
            @RequestHeader("Authorization") String token) {

        return sosService.getAcceptedSOS(token);
    }
}