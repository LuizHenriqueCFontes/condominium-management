package com.condominium.management.revenue.dto;

import com.condominium.management.revenue.entity.RevenueCategory;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record RevenueRequestDTO(

        @NotBlank
        String description,

        @NotNull
        @DecimalMin("0.01")
        BigDecimal amount,

        @NotNull
        LocalDate revenueDate,

        @NotNull
        RevenueCategory category,

        @NotNull
        Long condominiumId

) {
}
