package com.condominium.management.revenue.controller;

import com.condominium.management.revenue.dto.RevenueRequestDTO;
import com.condominium.management.revenue.dto.RevenueResponseDTO;
import com.condominium.management.revenue.service.RevenueService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public List<RevenueResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public RevenueResponseDTO findById(
            @PathVariable Long id
    ) {
        return service.findById(id);
    }

    @PutMapping("/{id}")
    public RevenueResponseDTO update(
            @PathVariable Long id,
            @RequestBody @Valid RevenueRequestDTO dto
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
