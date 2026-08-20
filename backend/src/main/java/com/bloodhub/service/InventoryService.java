package com.bloodhub.service;

import com.bloodhub.dto.BloodInventoryResponse;
import com.bloodhub.entity.BloodInventory;
import com.bloodhub.entity.Role;
import com.bloodhub.entity.User;
import com.bloodhub.repository.BloodInventoryRepository;
import com.bloodhub.repository.UserRepository;
import com.bloodhub.security.JwtService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryService {

    private final BloodInventoryRepository bloodInventoryRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public InventoryService(
            BloodInventoryRepository bloodInventoryRepository,
            UserRepository userRepository,
            JwtService jwtService) {

        this.bloodInventoryRepository = bloodInventoryRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    // ==========================================
    // USER / PUBLIC - GET ALL INVENTORY
    // ==========================================

    public List<BloodInventoryResponse> getInventory() {

        return bloodInventoryRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // BLOOD BANK - GET ITS OWN INVENTORY
    // ==========================================

    public List<BloodInventoryResponse> getMyInventory(
            String token) {

        User bloodBank = getBloodBankFromToken(token);

        return bloodInventoryRepository
                .findByBloodBank(bloodBank)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // BLOOD BANK - UPDATE INVENTORY
    // ==========================================

    public BloodInventoryResponse updateMyInventory(
            String bloodGroup,
            Integer units,
            String token) {

        User bloodBank = getBloodBankFromToken(token);

        if (bloodGroup == null || bloodGroup.trim().isEmpty()) {
            throw new RuntimeException(
                    "Blood group is required"
            );
        }

        if (units == null || units < 0) {
            throw new RuntimeException(
                    "Units cannot be negative"
            );
        }

        BloodInventory inventory =
                bloodInventoryRepository
                        .findByBloodBankAndBloodGroup(
                                bloodBank,
                                bloodGroup
                        )
                        .orElse(
                                BloodInventory.builder()
                                        .bloodGroup(bloodGroup)
                                        .units(0)
                                        .bloodBank(bloodBank)
                                        .build()
                        );

        inventory.setBloodGroup(bloodGroup);
        inventory.setUnits(units);
        inventory.setBloodBank(bloodBank);

        bloodInventoryRepository.save(inventory);

        return convertToResponse(inventory);
    }

    // ==========================================
    // GET BLOOD BANK FROM JWT
    // ==========================================

    private User getBloodBankFromToken(String token) {

        if (token == null || !token.startsWith("Bearer ")) {
            throw new RuntimeException(
                    "Invalid authorization token"
            );
        }

        token = token.substring(7);

        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        if (user.getRole() != Role.BLOOD_BANK) {
            throw new RuntimeException(
                    "Only blood banks can manage inventory"
            );
        }

        return user;
    }

    // ==========================================
    // ENTITY → RESPONSE
    // ==========================================

    private BloodInventoryResponse convertToResponse(
            BloodInventory inventory) {

        return new BloodInventoryResponse(
                inventory.getId(),
                inventory.getBloodGroup(),
                inventory.getUnits(),
                inventory.getBloodBank().getId(),
                inventory.getBloodBank().getFullName()
        );
    }
}