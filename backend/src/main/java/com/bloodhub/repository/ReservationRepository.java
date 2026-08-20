package com.bloodhub.repository;

import com.bloodhub.entity.Reservation;
import com.bloodhub.entity.RequestStatus;
import com.bloodhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    // Reservations by status
    List<Reservation> findByStatus(RequestStatus status);

    // Latest reservation created by a user
    Optional<Reservation> findTopByReservedByOrderByIdDesc(User user);

    // All reservations belonging to a particular user
    List<Reservation> findByReservedBy(User user);

    // All reservations belonging to a particular blood bank
    List<Reservation> findByBloodBank(User bloodBank);

    // Reservations belonging to a blood bank with a particular status
    List<Reservation> findByBloodBankAndStatus(
            User bloodBank,
            RequestStatus status
    );
}