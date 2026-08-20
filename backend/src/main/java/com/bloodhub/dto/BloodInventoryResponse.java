package com.bloodhub.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BloodInventoryResponse {

    private Long id;

    private String bloodGroup;

    private Integer units;

    private Long bloodBankId;

    private String bloodBankName;
}