package com.bloodhub.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "reservations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientName;

    private String bloodGroup;

    private Integer units;

    private String hospital;

    private String location;

    private String contactNumber;

    private LocalDate reservationDate;

    private LocalTime reservationTime;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    // User who created the reservation
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User reservedBy;

    // Blood bank that will fulfill the reservation
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blood_bank_id")
    private User bloodBank;
}