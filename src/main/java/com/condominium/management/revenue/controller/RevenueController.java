package com.condominium.management.revenue.controller;

import com.condominium.management.revenue.dto.RevenueRequestDTO;
import com.condominium.management.revenue.dto.RevenueResponseDTO;
import com.condominium.management.revenue.service.RevenueService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/revenues")
@RequiredArgsConstructor
public class RevenueController {

    private final RevenueService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RevenueResponseDTO create(
            @RequestBody @Valid RevenueRequestDTO dto
    ) {
        return service.create(dto);
    }
}
