package com.bloodhub.dto;

import com.bloodhub.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileResponse {

    private Long id;

    private String fullName;

    private String email;

    private String phone;

    private Role role;

}