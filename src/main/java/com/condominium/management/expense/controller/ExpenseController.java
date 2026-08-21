package com.condominium.management.expense.controller;

import com.condominium.management.expense.dto.ExpenseRequestDTO;
import com.condominium.management.expense.dto.ExpenseResponseDTO;
import com.condominium.management.expense.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExpenseResponseDTO create(
            @RequestBody @Valid ExpenseRequestDTO dto
    ) {
        return service.create(dto);
    }

    @GetMapping
    public List<ExpenseResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ExpenseResponseDTO findById(
            @PathVariable Long id
    ) {
        return service.findById(id);
    }

    @PutMapping("/{id}")
    public ExpenseResponseDTO update(
            @PathVariable Long id,
            @RequestBody @Valid ExpenseRequestDTO dto
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
