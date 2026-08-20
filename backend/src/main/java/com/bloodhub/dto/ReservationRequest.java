package com.bloodhub.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservationRequest {

    private String patientName;
    private String bloodGroup;
    private Integer units;
    private String hospital;
    private String location;
    private String contactNumber;
    private String reservationDate;
    private String reservationTime;

    // Selected blood bank
    private Long bloodBankId;
}