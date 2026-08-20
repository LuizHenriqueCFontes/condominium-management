package com.condominium.management.unit.service;

import com.condominium.management.block.entity.Block;
import com.condominium.management.block.repository.BlockRepository;
import com.condominium.management.exception.ResourceNotFoundException;
import com.condominium.management.unit.dto.UnitRequestDTO;
import com.condominium.management.unit.dto.UnitResponseDTO;
import com.condominium.management.unit.entity.Unit;
import com.condominium.management.unit.repository.UnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UnitService {

    private final UnitRepository unitRepository;
    private final BlockRepository blockRepository;

    public UnitResponseDTO create(UnitRequestDTO dto) {

        Block block = blockRepository.findById(dto.blockId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Bloco não encontrado"
                        )
                );

        Unit unit = Unit.builder()
                .number(dto.number())
                .floor(dto.floor())
                .type(dto.type())
                .status(dto.status())
                .block(block)
                .build();

        unit = unitRepository.save(unit);

        return toResponse(unit);
    }

    public List<UnitResponseDTO> findAll() {

        return unitRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public UnitResponseDTO findById(Long id) {

        Unit unit = unitRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Unidade não encontrada"
                        )
                );

        return toResponse(unit);
    }

    public UnitResponseDTO update(
            Long id,
            UnitRequestDTO dto
    ) {

        Unit unit = unitRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Unidade não encontrada"
                        )
                );

        Block block = blockRepository.findById(dto.blockId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Bloco não encontrado"
                        )
                );

        unit.setNumber(dto.number());
        unit.setFloor(dto.floor());
        unit.setType(dto.type());
        unit.setStatus(dto.status());
        unit.setBlock(block);

        unit = unitRepository.save(unit);

        return toResponse(unit);
    }

    public void delete(Long id) {

        if (!unitRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Unidade não encontrada"
            );
        }

        unitRepository.deleteById(id);
    }

    private UnitResponseDTO toResponse(Unit unit) {

        return new UnitResponseDTO(
                unit.getId(),
                unit.getNumber(),
                unit.getFloor(),
                unit.getType(),
                unit.getStatus(),
                unit.getBlock().getId(),
                unit.getBlock().getName()
        );
    }
}