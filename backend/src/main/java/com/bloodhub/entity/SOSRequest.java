package com.bloodhub.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "sos_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SOSRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientName;

    private String hospital;

    private String phone;

    private String bloodGroup;

    private Integer units;

    @Column(length = 1000)
    private String message;

    @Enumerated(EnumType.STRING)
    private SOSStatus status;

    private LocalDateTime createdAt;

    // User who broadcasted the SOS
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requested_by")
    private User requestedBy;

    // User who accepted the SOS
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accepted_by")
    private User acceptedBy;
}