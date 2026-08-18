package com.condominium.management.revenue.service;

import com.condominium.management.condominium.entity.Condominium;
import com.condominium.management.condominium.repository.CondominiumRepository;
import com.condominium.management.revenue.dto.RevenueRequestDTO;
import com.condominium.management.revenue.dto.RevenueResponseDTO;
import com.condominium.management.revenue.entity.Revenue;
import com.condominium.management.revenue.repository.RevenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RevenueService {

    private final RevenueRepository revenueRepository;
    private final CondominiumRepository condominiumRepository;

    public RevenueResponseDTO create(
            RevenueRequestDTO dto
    ) {

        Condominium condominium =
                condominiumRepository.findById(dto.condominiumId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Condomínio não encontrado"
                                )
                        );

        Revenue revenue = Revenue.builder()
                .description(dto.description())
                .amount(dto.amount())
                .revenueDate(dto.revenueDate())
                .category(dto.category())
                .condominium(condominium)
                .createdAt(LocalDateTime.now())
                .build();

        revenue = revenueRepository.save(revenue);

        return new RevenueResponseDTO(
                revenue.getId(),
                revenue.getDescription(),
                revenue.getAmount(),
                revenue.getRevenueDate(),
                revenue.getCategory(),
                condominium.getId(),
                condominium.getName()
        );
    }
}
