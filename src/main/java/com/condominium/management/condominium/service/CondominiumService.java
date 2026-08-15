package com.condominium.management.condominium.service;

import com.condominium.management.condominium.dto.*;
import com.condominium.management.condominium.entity.Condominium;
import com.condominium.management.condominium.repository.CondominiumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CondominiumService {

    private final CondominiumRepository repository;

    public CondominiumResponseDTO create(
            CondominiumRequestDTO dto
    ){

        Condominium condominium =
                Condominium.builder()
                        .name(dto.name())
                        .cnpj(dto.cnpj())
                        .email(dto.email())
                        .phone(dto.phone())
                        .address(dto.address())
                        .status(dto.status())
                        .build();

        condominium = repository.save(condominium);

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
