package com.condominium.management.unit.dto;

import com.condominium.management.unit.entity.UnitStatus;
import com.condominium.management.unit.entity.UnitType;

public record UnitResponseDTO(

        Long id,

        String number,

        Integer floor,

        UnitType type,

        UnitStatus status,

        Long blockId,

        String blockName

) {
}
