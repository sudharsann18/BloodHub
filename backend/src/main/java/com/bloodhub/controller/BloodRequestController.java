package com.bloodhub.controller;

import com.bloodhub.dto.BloodRequestRequest;
import com.bloodhub.dto.BloodRequestResponse;
import com.bloodhub.service.BloodRequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/request")
public class BloodRequestController {

    private final BloodRequestService bloodRequestService;

    public BloodRequestController(BloodRequestService bloodRequestService) {
        this.bloodRequestService = bloodRequestService;
    }

    // USER creates a blood request
    @PostMapping
    public BloodRequestResponse createRequest(
            @RequestBody BloodRequestRequest request,
            @RequestHeader("Authorization") String token) {

        return bloodRequestService.createRequest(request, token);
    }

    // USER views their own requests
    @GetMapping("/my")
    public List<BloodRequestResponse> getMyRequests(
            @RequestHeader("Authorization") String token) {

        return bloodRequestService.getMyRequests(token);
    }

    // BLOOD BANK views only its requests
    @GetMapping("/all")
    public List<BloodRequestResponse> getAllRequests(
            @RequestHeader("Authorization") String token) {

        return bloodRequestService.getAllRequests(token);
    }

    // BLOOD BANK accepts its own request
    @PutMapping("/{id}/accept")
    public BloodRequestResponse acceptRequest(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token) {

        return bloodRequestService.acceptRequest(id, token);
    }

    // BLOOD BANK views its accepted requests
    @GetMapping("/accepted")
    public List<BloodRequestResponse> getAcceptedRequests(
            @RequestHeader("Authorization") String token) {

        return bloodRequestService.getAcceptedRequests(token);
    }

    // BLOOD BANK completes its own request
    @PutMapping("/{id}/complete")
    public BloodRequestResponse completeRequest(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token) {

        return bloodRequestService.completeRequest(id, token);
    }
}