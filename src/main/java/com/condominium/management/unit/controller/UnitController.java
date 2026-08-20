package com.condominium.management.unit.controller;

import com.condominium.management.unit.dto.UnitRequestDTO;
import com.condominium.management.unit.dto.UnitResponseDTO;
import com.condominium.management.unit.service.UnitService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/units")
@RequiredArgsConstructor
public class UnitController {

    private final UnitService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UnitResponseDTO create(
            @RequestBody @Valid UnitRequestDTO dto
    ) {
        return service.create(dto);
    }

    @GetMapping
    public List<UnitResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public UnitResponseDTO findById(
            @PathVariable Long id
    ) {
        return service.findById(id);
    }

    @PutMapping("/{id}")
    public UnitResponseDTO update(
            @PathVariable Long id,
            @RequestBody @Valid UnitRequestDTO dto
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