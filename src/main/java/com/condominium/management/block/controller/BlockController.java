package com.condominium.management.block.controller;


import com.condominium.management.block.dto.*;
import com.condominium.management.block.service.BlockService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blocks")
@RequiredArgsConstructor
public class BlockController {

    private final BlockService service;

    @PostMapping
    public BlockResponseDTO create(
            @RequestBody @Valid BlockRequestDTO dto
    ) {
        return service.create(dto);
    }
}
