package com.bloodhub.controller;

import com.bloodhub.dto.BloodInventoryRequest;
import com.bloodhub.dto.BloodInventoryResponse;
import com.bloodhub.service.InventoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    // ==========================================
    // PUBLIC - GET ALL INVENTORY
    // ==========================================

    @GetMapping
    public List<BloodInventoryResponse> getInventory() {

        return inventoryService.getInventory();
    }

    // ==========================================
    // BLOOD BANK - GET OWN INVENTORY
    // ==========================================

    @GetMapping("/my")
    public List<BloodInventoryResponse> getMyInventory(
            @RequestHeader("Authorization") String token) {

        return inventoryService.getMyInventory(token);
    }

    // ==========================================
    // BLOOD BANK - UPDATE OWN INVENTORY
    // ==========================================

    @PutMapping
    public BloodInventoryResponse updateInventory(
            @RequestBody BloodInventoryRequest request,
            @RequestHeader("Authorization") String token) {

        return inventoryService.updateMyInventory(
                request.getBloodGroup(),
                request.getUnits(),
                token
        );
    }
}