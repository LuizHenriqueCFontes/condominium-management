package com.condominium.management.revenue.service;

import com.condominium.management.condominium.entity.Condominium;
import com.condominium.management.condominium.repository.CondominiumRepository;
import com.condominium.management.exception.ResourceNotFoundException;
import com.condominium.management.revenue.dto.RevenueRequestDTO;
import com.condominium.management.revenue.dto.RevenueResponseDTO;
import com.condominium.management.revenue.entity.Revenue;
import com.condominium.management.revenue.repository.RevenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RevenueService {

    private final RevenueRepository revenueRepository;
    private final CondominiumRepository condominiumRepository;

    public RevenueResponseDTO create(RevenueRequestDTO dto) {

        Condominium condominium = condominiumRepository.findById(
                dto.condominiumId()
        ).orElseThrow(() ->
                new ResourceNotFoundException(
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

        return toResponse(revenue);
    }

    public List<RevenueResponseDTO> findAll() {

        return revenueRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public RevenueResponseDTO findById(Long id) {

        Revenue revenue = revenueRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Receita não encontrada"
                        )
                );

        return toResponse(revenue);
    }

    public RevenueResponseDTO update(
            Long id,
            RevenueRequestDTO dto
    ) {

        Revenue revenue = revenueRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Receita não encontrada"
                        )
                );

        Condominium condominium = condominiumRepository.findById(
                dto.condominiumId()
        ).orElseThrow(() ->
                new ResourceNotFoundException(
                        "Condomínio não encontrado"
                )
        );

        revenue.setDescription(dto.description());
        revenue.setAmount(dto.amount());
        revenue.setRevenueDate(dto.revenueDate());
        revenue.setCategory(dto.category());
        revenue.setCondominium(condominium);

        revenue = revenueRepository.save(revenue);

        return toResponse(revenue);
    }

    public void delete(Long id) {

        if (!revenueRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Receita não encontrada"
            );
        }

        revenueRepository.deleteById(id);
    }

    private RevenueResponseDTO toResponse(Revenue revenue) {

        return new RevenueResponseDTO(
                revenue.getId(),
                revenue.getDescription(),
                revenue.getAmount(),
                revenue.getRevenueDate(),
                revenue.getCategory(),
                revenue.getCondominium().getId(),
                revenue.getCondominium().getName()
        );
    }
}
