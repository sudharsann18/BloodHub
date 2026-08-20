package com.bloodhub.dto;

import com.bloodhub.entity.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class BloodRequestResponse {

    private Long id;

    private String patientName;

    private String bloodGroup;

    private Integer units;

    private String hospital;

    private String location;

    private String contactNumber;

    private String urgency;

    private RequestStatus status;

    private LocalDateTime createdAt;

    private String requestedBy;

}