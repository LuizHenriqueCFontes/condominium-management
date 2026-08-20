package com.condominium.management.condominium.controller;

import com.condominium.management.condominium.dto.CondominiumRequestDTO;
import com.condominium.management.condominium.dto.CondominiumResponseDTO;
import com.condominium.management.condominium.service.CondominiumService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/condominiums")
@RequiredArgsConstructor
public class CondominiumController {

    private final CondominiumService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CondominiumResponseDTO create(
            @RequestBody @Valid CondominiumRequestDTO dto
    ) {
        return service.create(dto);
    }

    @GetMapping
    public List<CondominiumResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public CondominiumResponseDTO findById(
            @PathVariable Long id
    ) {
        return service.findById(id);
    }

    @PutMapping("/{id}")
    public CondominiumResponseDTO update(
            @PathVariable Long id,
            @RequestBody @Valid CondominiumRequestDTO dto
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