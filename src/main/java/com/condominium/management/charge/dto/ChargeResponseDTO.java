package com.condominium.management.charge.dto;

import com.condominium.management.charge.entity.ChargeStatus;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ChargeResponseDTO(

        Long id,

        String description,

        BigDecimal amount,

        LocalDate dueDate,

        String referenceMonth,

        ChargeStatus status,

        Long unitId,

        String unitNumber

) {
}
