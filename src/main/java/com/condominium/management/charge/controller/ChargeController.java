package com.condominium.management.charge.controller;

import com.condominium.management.charge.dto.ChargeRequestDTO;
import com.condominium.management.charge.dto.ChargeResponseDTO;
import com.condominium.management.charge.service.ChargeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/charges")
@RequiredArgsConstructor
public class ChargeController {

    private final ChargeService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ChargeResponseDTO create(
            @RequestBody @Valid ChargeRequestDTO dto
    ) {
        return service.create(dto);
    }

    @GetMapping
    public List<ChargeResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ChargeResponseDTO findById(
            @PathVariable Long id
    ) {
        return service.findById(id);
    }

    @PutMapping("/{id}")
    public ChargeResponseDTO update(
            @PathVariable Long id,
            @RequestBody @Valid ChargeRequestDTO dto
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
