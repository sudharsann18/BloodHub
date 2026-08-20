package com.bloodhub.repository;

import com.bloodhub.entity.SOSRequest;
import com.bloodhub.entity.SOSStatus;
import com.bloodhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SOSRepository extends JpaRepository<SOSRequest, Long> {

    // ==========================================
    // ACTIVE SOS REQUESTS
    // ==========================================

    List<SOSRequest> findByStatusOrderByIdDesc(
            SOSStatus status
    );


    // ==========================================
    // SOS CREATED BY A USER
    // ==========================================

    List<SOSRequest> findByRequestedByOrderByIdDesc(
            User user
    );


    // ==========================================
    // SOS ACCEPTED BY A DONOR
    // ==========================================

    List<SOSRequest> findByAcceptedByOrderByIdDesc(
            User user
    );


    // ==========================================
    // AVAILABLE SOS FOR OTHER USERS
    // Excludes the person who created the SOS
    // ==========================================

    @Query("""
        SELECT s
        FROM SOSRequest s
        WHERE s.status = :status
        AND s.requestedBy.id <> :userId
        ORDER BY s.id DESC
    """)
    List<SOSRequest> findAvailableSOS(
            SOSStatus status,
            Long userId
    );


    // ==========================================
    // USER'S SOS BY STATUS
    // ==========================================

    List<SOSRequest> findByRequestedByAndStatus(
            User user,
            SOSStatus status
    );


    // ==========================================
    // AVAILABLE SOS FOR A PARTICULAR BLOOD GROUP
    // ==========================================

    @Query("""
        SELECT s
        FROM SOSRequest s
        WHERE s.status = :status
        AND s.bloodGroup = :bloodGroup
        AND s.requestedBy.id <> :userId
        ORDER BY s.id DESC
    """)
    List<SOSRequest> findAvailableSOSByBloodGroup(
            SOSStatus status,
            String bloodGroup,
            Long userId
    );

}