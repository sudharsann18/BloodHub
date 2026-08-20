package com.bloodhub.dto;

import lombok.Data;

@Data
public class BloodInventoryRequest {

    private String bloodGroup;

    private Integer units;
}