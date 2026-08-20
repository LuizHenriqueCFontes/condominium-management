package com.condominium.management.expense.controller;

import com.condominium.management.expense.dto.ExpenseRequestDTO;
import com.condominium.management.expense.dto.ExpenseResponseDTO;
import com.condominium.management.expense.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
}
