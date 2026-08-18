package com.condominium.management.unit.service;

import com.condominium.management.block.entity.Block;
import com.condominium.management.block.repository.BlockRepository;
import com.condominium.management.unit.dto.UnitRequestDTO;
import com.condominium.management.unit.dto.UnitResponseDTO;
import com.condominium.management.unit.entity.Unit;
import com.condominium.management.unit.repository.UnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UnitService {

    private final UnitRepository unitRepository;
    private final BlockRepository blockRepository;

    public UnitResponseDTO create(UnitRequestDTO dto) {

        Block block = blockRepository.findById(dto.blockId())
                .orElseThrow(() ->
                        new RuntimeException("Bloco não encontrado")
                );

        Unit unit = Unit.builder()
                .number(dto.number())
                .floor(dto.floor())
                .type(dto.type())
                .status(dto.status())
                .block(block)
                .createdAt(LocalDateTime.now())
                .build();

        unit = unitRepository.save(unit);

        return new UnitResponseDTO(
                unit.getId(),
                unit.getNumber(),
                unit.getFloor(),
                unit.getType(),
                unit.getStatus(),
                block.getId(),
                block.getName()
        );
    }
}
