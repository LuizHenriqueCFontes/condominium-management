package com.condominium.management.unit.dto;

import com.condominium.management.unit.entity.UnitStatus;
import com.condominium.management.unit.entity.UnitType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UnitRequestDTO(

        @NotBlank
        String number,

        Integer floor,

        @NotNull
        UnitType type,

        @NotNull
        UnitStatus status,

        @NotNull
        Long blockId

) {
}
