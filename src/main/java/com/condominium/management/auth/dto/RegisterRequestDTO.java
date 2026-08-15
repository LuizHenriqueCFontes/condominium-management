package com.condominium.management.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterRequestDTO(

        @NotBlank
        String name,

        @Email
        String email,

        @NotBlank
        String password

) {
}
