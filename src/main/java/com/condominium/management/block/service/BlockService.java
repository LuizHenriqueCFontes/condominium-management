package com.condominium.management.block.service;

import com.condominium.management.block.dto.BlockRequestDTO;
import com.condominium.management.block.dto.BlockResponseDTO;
import com.condominium.management.block.entity.Block;
import com.condominium.management.block.repository.BlockRepository;
import com.condominium.management.condominium.entity.Condominium;
import com.condominium.management.condominium.repository.CondominiumRepository;
import com.condominium.management.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlockService {

    private final BlockRepository blockRepository;
    private final CondominiumRepository condominiumRepository;

    public BlockResponseDTO create(BlockRequestDTO dto) {

        Condominium condominium =
                condominiumRepository.findById(dto.condominiumId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Condomínio não encontrado"
                                )
                        );

        Block block = Block.builder()
                .name(dto.name())
                .condominium(condominium)
                .build();

        block = blockRepository.save(block);

        return toResponse(block);
    }

    public List<BlockResponseDTO> findAll() {

        return blockRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public BlockResponseDTO findById(Long id) {

        Block block = blockRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Bloco não encontrado"
                        )
                );

        return toResponse(block);
    }

    public BlockResponseDTO update(
            Long id,
            BlockRequestDTO dto
    ) {

        Block block = blockRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Bloco não encontrado"
                        )
                );

        Condominium condominium =
                condominiumRepository.findById(dto.condominiumId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Condomínio não encontrado"
                                )
                        );

        block.setName(dto.name());
        block.setCondominium(condominium);

        block = blockRepository.save(block);

        return toResponse(block);
    }

    public void delete(Long id) {

        if (!blockRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Bloco não encontrado"
            );
        }

        blockRepository.deleteById(id);
    }

    private BlockResponseDTO toResponse(Block block) {

        return new BlockResponseDTO(
                block.getId(),
                block.getName(),
                block.getCondominium().getId(),
                block.getCondominium().getName()
        );
    }
}