package com.bloodhub.dto;

import com.bloodhub.entity.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    private String fullName;

    private String email;

    private String phone;

    private String password;

    private Role role;

}