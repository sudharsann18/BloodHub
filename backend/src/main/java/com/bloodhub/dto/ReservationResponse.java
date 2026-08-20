package com.bloodhub.dto;

import com.bloodhub.entity.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
public class ReservationResponse {

    private Long id;

    private String patientName;

    private String bloodGroup;

    private Integer units;

    private String hospital;

    private String location;

    private String contactNumber;

    private LocalDate reservationDate;

    private LocalTime reservationTime;

    private RequestStatus status;

    private String reservedBy;

}