package com.bloodhub.dto;

import lombok.Data;

@Data
public class BloodRequestRequest {

    private String patientName;

    private String bloodGroup;

    private Integer units;

    private String hospital;

    private String location;

    private String contactNumber;

    private String urgency;

    // Selected blood bank
    private Long bloodBankId;
}