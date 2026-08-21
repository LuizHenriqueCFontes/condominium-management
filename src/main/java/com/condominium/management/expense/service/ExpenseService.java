package com.condominium.management.expense.service;

import com.condominium.management.condominium.entity.Condominium;
import com.condominium.management.condominium.repository.CondominiumRepository;
import com.condominium.management.exception.ResourceNotFoundException;
import com.condominium.management.expense.dto.ExpenseRequestDTO;
import com.condominium.management.expense.dto.ExpenseResponseDTO;
import com.condominium.management.expense.entity.Expense;
import com.condominium.management.expense.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final CondominiumRepository condominiumRepository;

    public ExpenseResponseDTO create(ExpenseRequestDTO dto) {

        Condominium condominium = condominiumRepository.findById(
                dto.condominiumId()
        ).orElseThrow(() ->
                new ResourceNotFoundException(
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

        return toResponse(expense);
    }

    public List<ExpenseResponseDTO> findAll() {

        return expenseRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ExpenseResponseDTO findById(Long id) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Despesa não encontrada"
                        )
                );

        return toResponse(expense);
    }

    public ExpenseResponseDTO update(
            Long id,
            ExpenseRequestDTO dto
    ) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Despesa não encontrada"
                        )
                );

        Condominium condominium = condominiumRepository.findById(
                dto.condominiumId()
        ).orElseThrow(() ->
                new ResourceNotFoundException(
                        "Condomínio não encontrado"
                )
        );

        expense.setDescription(dto.description());
        expense.setAmount(dto.amount());
        expense.setExpenseDate(dto.expenseDate());
        expense.setCategory(dto.category());
        expense.setCondominium(condominium);

        expense = expenseRepository.save(expense);

        return toResponse(expense);
    }

    public void delete(Long id) {

        if (!expenseRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Despesa não encontrada"
            );
        }

        expenseRepository.deleteById(id);
    }

    private ExpenseResponseDTO toResponse(Expense expense) {

        return new ExpenseResponseDTO(
                expense.getId(),
                expense.getDescription(),
                expense.getAmount(),
                expense.getExpenseDate(),
                expense.getCategory(),
                expense.getCondominium().getId(),
                expense.getCondominium().getName()
        );
    }
}
