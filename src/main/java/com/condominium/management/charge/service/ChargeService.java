package com.condominium.management.charge.service;

import com.condominium.management.charge.dto.ChargeRequestDTO;
import com.condominium.management.charge.dto.ChargeResponseDTO;
import com.condominium.management.charge.entity.Charge;
import com.condominium.management.charge.entity.ChargeStatus;
import com.condominium.management.charge.repository.ChargeRepository;
import com.condominium.management.exception.ResourceNotFoundException;
import com.condominium.management.unit.entity.Unit;
import com.condominium.management.unit.repository.UnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChargeService {

    private final ChargeRepository chargeRepository;
    private final UnitRepository unitRepository;

    public ChargeResponseDTO create(ChargeRequestDTO dto) {

        Unit unit = unitRepository.findById(dto.unitId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
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

        return toResponse(charge);
    }

    public List<ChargeResponseDTO> findAll() {

        return chargeRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ChargeResponseDTO findById(Long id) {

        Charge charge = chargeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cobrança não encontrada"
                        )
                );

        return toResponse(charge);
    }

    public ChargeResponseDTO update(
            Long id,
            ChargeRequestDTO dto
    ) {

        Charge charge = chargeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cobrança não encontrada"
                        )
                );

        Unit unit = unitRepository.findById(dto.unitId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Unidade não encontrada"
                        )
                );

        charge.setDescription(dto.description());
        charge.setAmount(dto.amount());
        charge.setDueDate(dto.dueDate());
        charge.setReferenceMonth(dto.referenceMonth());
        charge.setUnit(unit);

        charge = chargeRepository.save(charge);

        return toResponse(charge);
    }

    public void delete(Long id) {

        if (!chargeRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Cobrança não encontrada"
            );
        }

        chargeRepository.deleteById(id);
    }

    private ChargeResponseDTO toResponse(Charge charge) {

        return new ChargeResponseDTO(
                charge.getId(),
                charge.getDescription(),
                charge.getAmount(),
                charge.getDueDate(),
                charge.getReferenceMonth(),
                charge.getStatus(),
                charge.getUnit().getId(),
                charge.getUnit().getNumber()
        );
    }
}