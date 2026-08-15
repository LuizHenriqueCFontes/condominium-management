package com.condominium.management.condominium.controller;

import com.condominium.management.condominium.dto.*;
import com.condominium.management.condominium.service.CondominiumService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/condominiums")
@RequiredArgsConstructor
public class CondominiumController {

    private final CondominiumService service;

    @PostMapping
    public CondominiumResponseDTO create(
            @RequestBody @Valid CondominiumRequestDTO dto
    ){
        return service.create(dto);
    }
}
