package com.condominium.management.resident.controller;

import com.condominium.management.resident.dto.ResidentRequestDTO;
import com.condominium.management.resident.dto.ResidentResponseDTO;
import com.condominium.management.resident.service.ResidentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
}
