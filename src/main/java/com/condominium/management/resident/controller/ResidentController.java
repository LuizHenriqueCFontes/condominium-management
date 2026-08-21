package com.condominium.management.resident.controller;

import com.condominium.management.resident.dto.ResidentRequestDTO;
import com.condominium.management.resident.dto.ResidentResponseDTO;
import com.condominium.management.resident.service.ResidentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/residents")
@RequiredArgsConstructor
public class ResidentController {

    private final ResidentService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResidentResponseDTO create(
            @RequestBody @Valid ResidentRequestDTO dto
    ) {
        return service.create(dto);
    }

    @GetMapping
    public List<ResidentResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResidentResponseDTO findById(
            @PathVariable Long id
    ) {
        return service.findById(id);
    }

    @PutMapping("/{id}")
    public ResidentResponseDTO update(
            @PathVariable Long id,
            @RequestBody @Valid ResidentRequestDTO dto
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