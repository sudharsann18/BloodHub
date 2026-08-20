package com.bloodhub.dto;

import com.bloodhub.entity.SOSStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class SOSResponseDTO {

    private Long id;

    private String patientName;

    private String hospital;

    private String phone;

    private String bloodGroup;

    private Integer units;

    private String message;

    private SOSStatus status;

    private LocalDateTime createdAt;

    // Requester details
    private Long requestedById;
    private String requestedByName;

    // Donor details
    private Long acceptedById;
    private String acceptedByName;
    private String acceptedByPhone;
}