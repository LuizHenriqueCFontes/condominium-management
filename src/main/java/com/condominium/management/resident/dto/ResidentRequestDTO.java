
package com.condominium.management.resident.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ResidentRequestDTO(

        @NotBlank
        String cpf,

        String phone,

        LocalDate birthDate,

        @NotNull
        Long userId,

        @NotNull
        Long unitId

) {
}
