package com.bloodhub.repository;

import com.bloodhub.entity.BloodInventory;
import com.bloodhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BloodInventoryRepository
        extends JpaRepository<BloodInventory, Long> {

    Optional<BloodInventory> findByBloodBankAndBloodGroup(
            User bloodBank,
            String bloodGroup
    );

    List<BloodInventory> findByBloodBank(User bloodBank);
}