package com.condominium.management.unit.controller;

import com.condominium.management.unit.dto.UnitRequestDTO;
import com.condominium.management.unit.dto.UnitResponseDTO;
import com.condominium.management.unit.service.UnitService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/units")
@RequiredArgsConstructor
public class UnitController {

    private final UnitService service;

    @PostMapping
    public UnitResponseDTO create(
            @RequestBody @Valid UnitRequestDTO dto
    ) {
        return service.create(dto);
    }
}
