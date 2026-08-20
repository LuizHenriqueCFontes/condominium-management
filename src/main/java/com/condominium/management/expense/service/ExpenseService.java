package com.condominium.management.expense.service;

import com.condominium.management.condominium.entity.Condominium;
import com.condominium.management.condominium.repository.CondominiumRepository;
import com.condominium.management.expense.dto.ExpenseRequestDTO;
import com.condominium.management.expense.dto.ExpenseResponseDTO;
import com.condominium.management.expense.entity.Expense;
import com.condominium.management.expense.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final CondominiumRepository condominiumRepository;

    public ExpenseResponseDTO create(
            ExpenseRequestDTO dto
    ) {

        Condominium condominium =
                condominiumRepository.findById(dto.condominiumId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Condomínio não encontrado"
                                )
                        );

        Expense expense = Expense.builder()
                .description(dto.description())
                .amount(dto.amount())
                .expenseDate(dto.expenseDate())
                .category(dto.category())
                .condominium(condominium)
                .createdAt(LocalDateTime.now())
                .build();

        expense = expenseRepository.save(expense);

        return new ExpenseResponseDTO(
                expense.getId(),
                expense.getDescription(),
                expense.getAmount(),
                expense.getExpenseDate(),
                expense.getCategory(),
                condominium.getId(),
                condominium.getName()
        );
    }
}
