package com.condominium.management.block.controller;


import com.condominium.management.block.dto.BlockRequestDTO;
import com.condominium.management.block.dto.BlockResponseDTO;
import com.condominium.management.block.service.BlockService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blocks")
@RequiredArgsConstructor
public class BlockController {

    private final BlockService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BlockResponseDTO create(
            @RequestBody @Valid BlockRequestDTO dto
    ) {
        return service.create(dto);
    }

    @GetMapping
    public List<BlockResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public BlockResponseDTO findById(
            @PathVariable Long id
    ) {
        return service.findById(id);
    }

    @PutMapping("/{id}")
    public BlockResponseDTO update(
            @PathVariable Long id,
            @RequestBody @Valid BlockRequestDTO dto
    ) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
            @PathVariable Long id
    ) {
        service.delete(id);
    }
}
