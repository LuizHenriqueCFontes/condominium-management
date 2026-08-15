package com.condominium.management.block.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BlockRequestDTO(

        @NotBlank
        String name,

        @NotNull
        Long condominiumId

) {
}
