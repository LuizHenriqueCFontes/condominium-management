package com.condominium.management.condominium.service;

import com.condominium.management.condominium.dto.*;
import com.condominium.management.condominium.entity.Condominium;
import com.condominium.management.condominium.repository.CondominiumRepository;
import com.condominium.management.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CondominiumService {

    private final CondominiumRepository repository;

    public CondominiumResponseDTO create(
            CondominiumRequestDTO dto
    ) {

        Condominium condominium = Condominium.builder()
                .name(dto.name())
                .cnpj(dto.cnpj())
                .email(dto.email())
                .phone(dto.phone())
                .address(dto.address())
                .status(dto.status())
                .build();

        condominium = repository.save(condominium);

        return toResponse(condominium);
    }

    public List<CondominiumResponseDTO> findAll() {

        return repository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public CondominiumResponseDTO findById(Long id) {

        Condominium condominium = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Condomínio não encontrado"
                        )
                );

        return toResponse(condominium);
    }

    public CondominiumResponseDTO update(
            Long id,
            CondominiumRequestDTO dto
    ) {

        Condominium condominium = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Condomínio não encontrado"
                        )
                );

        condominium.setName(dto.name());
        condominium.setCnpj(dto.cnpj());
        condominium.setEmail(dto.email());
        condominium.setPhone(dto.phone());
        condominium.setAddress(dto.address());
        condominium.setStatus(dto.status());

        condominium = repository.save(condominium);

        return toResponse(condominium);
    }

    public void delete(Long id) {

        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Condomínio não encontrado"
            );
        }

        repository.deleteById(id);
    }

    private CondominiumResponseDTO toResponse(
            Condominium condominium
    ) {

        return new CondominiumResponseDTO(
                condominium.getId(),
                condominium.getName(),
                condominium.getCnpj(),
                condominium.getEmail(),
                condominium.getPhone(),
                condominium.getAddress(),
                condominium.getStatus()
        );
    }
}
