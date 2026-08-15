package com.condominium.management.condominium.dto;

import jakarta.validation.constraints.NotBlank;

public record CondominiumRequestDTO(

        @NotBlank
        String name,

        @NotBlank
        String cnpj,

        String email,

        String phone,

        String address,

        String status

) {
}
