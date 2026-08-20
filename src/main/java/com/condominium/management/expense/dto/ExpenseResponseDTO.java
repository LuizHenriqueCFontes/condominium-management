package com.condominium.management.expense.dto;

import com.condominium.management.expense.entity.ExpenseCategory;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ExpenseResponseDTO(

        Long id,

        String description,

        BigDecimal amount,

        LocalDate expenseDate,

        ExpenseCategory category,

        Long condominiumId,

        String condominiumName

) {
}
