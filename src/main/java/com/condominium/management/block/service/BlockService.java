package com.condominium.management.block.service;

import com.condominium.management.block.dto.*;
import com.condominium.management.block.entity.Block;
import com.condominium.management.block.repository.BlockRepository;
import com.condominium.management.condominium.entity.Condominium;
import com.condominium.management.condominium.repository.CondominiumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BlockService {

    private final BlockRepository blockRepository;
    private final CondominiumRepository condominiumRepository;

    public BlockResponseDTO create(
            BlockRequestDTO dto
    ) {

        Condominium condominium =
                condominiumRepository.findById(dto.condominiumId())
                        .orElseThrow();

        Block block = Block.builder()
                .name(dto.name())
                .condominium(condominium)
                .build();

        block = blockRepository.save(block);

        return new BlockResponseDTO(
                block.getId(),
                block.getName(),
                condominium.getId(),
                condominium.getName()
        );
    }
}