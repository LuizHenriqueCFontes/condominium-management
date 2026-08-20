package com.condominium.management.charge.service;

import com.condominium.management.charge.dto.ChargeRequestDTO;
import com.condominium.management.charge.dto.ChargeResponseDTO;
import com.condominium.management.charge.entity.Charge;
import com.condominium.management.charge.entity.ChargeStatus;
import com.condominium.management.charge.repository.ChargeRepository;
import com.condominium.management.unit.entity.Unit;
import com.condominium.management.unit.repository.UnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ChargeService {

    private final ChargeRepository chargeRepository;
    private final UnitRepository unitRepository;

    public ChargeResponseDTO create(
            ChargeRequestDTO dto
    ) {

        Unit unit = unitRepository.findById(dto.unitId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Unidade não encontrada"
                        )
                );

        Charge charge = Charge.builder()
                .description(dto.description())
                .amount(dto.amount())
                .dueDate(dto.dueDate())
                .referenceMonth(dto.referenceMonth())
                .status(ChargeStatus.PENDING)
                .unit(unit)
                .createdAt(LocalDateTime.now())
                .build();

        charge = chargeRepository.save(charge);

        return new ChargeResponseDTO(
                charge.getId(),
                charge.getDescription(),
                charge.getAmount(),
                charge.getDueDate(),
                charge.getReferenceMonth(),
                charge.getStatus(),
                unit.getId(),
                unit.getNumber()
        );
    }
}
