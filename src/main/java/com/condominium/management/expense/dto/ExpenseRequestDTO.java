package com.condominium.management.expense.dto;

import com.condominium.management.expense.entity.ExpenseCategory;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ExpenseRequestDTO(

        @NotBlank
        String description,

        @NotNull
        @DecimalMin("0.01")
        BigDecimal amount,

        @NotNull
        LocalDate expenseDate,

        @NotNull
        ExpenseCategory category,

        @NotNull
        Long condominiumId

) {
}
