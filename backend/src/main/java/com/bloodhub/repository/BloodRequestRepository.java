package com.bloodhub.repository;

import com.bloodhub.entity.BloodRequest;
import com.bloodhub.entity.RequestStatus;
import com.bloodhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {

    List<BloodRequest> findByRequestedBy(User user);

    List<BloodRequest> findByStatus(RequestStatus status);

    List<BloodRequest> findByBloodBank(User bloodBank);

    List<BloodRequest> findByBloodBankAndStatus(
            User bloodBank,
            RequestStatus status
    );
}