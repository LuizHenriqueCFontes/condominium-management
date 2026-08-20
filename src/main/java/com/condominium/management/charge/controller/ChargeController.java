package com.condominium.management.charge.controller;

import com.condominium.management.charge.dto.ChargeRequestDTO;
import com.condominium.management.charge.dto.ChargeResponseDTO;
import com.condominium.management.charge.service.ChargeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
}
