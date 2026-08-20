package com.bloodhub.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SOSRequestDTO {

    private String hospital;

    private String bloodGroup;

    private Integer units;

    private String message;
}