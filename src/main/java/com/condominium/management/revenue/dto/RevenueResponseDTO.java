package com.condominium.management.revenue.dto;


import com.condominium.management.revenue.entity.RevenueCategory;

import java.math.BigDecimal;
import java.time.LocalDate;

public record RevenueResponseDTO(

        Long id,

        String description,

        BigDecimal amount,

        LocalDate revenueDate,

        RevenueCategory category,

        Long condominiumId,

        String condominiumName

) {
}
