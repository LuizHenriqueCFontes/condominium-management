package com.condominium.management.resident.service;

import com.condominium.management.resident.dto.ResidentRequestDTO;
import com.condominium.management.resident.dto.ResidentResponseDTO;
import com.condominium.management.resident.entity.Resident;
import com.condominium.management.resident.repository.ResidentRepository;
import com.condominium.management.unit.entity.Unit;
import com.condominium.management.unit.repository.UnitRepository;
import com.condominium.management.user.entity.User;
import com.condominium.management.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ResidentService {

    private final ResidentRepository residentRepository;
    private final UserRepository userRepository;
    private final UnitRepository unitRepository;

    public ResidentResponseDTO create(
            ResidentRequestDTO dto
    ) {

        User user = userRepository.findById(dto.userId())
                .orElseThrow(() ->
                        new RuntimeException("Usuário não encontrado")
                );

        Unit unit = unitRepository.findById(dto.unitId())
                .orElseThrow(() ->
                        new RuntimeException("Unidade não encontrada")
                );

        Resident resident = Resident.builder()
                .cpf(dto.cpf())
                .phone(dto.phone())
                .birthDate(dto.birthDate())
                .user(user)
                .unit(unit)
                .createdAt(LocalDateTime.now())
                .build();

        resident = residentRepository.save(resident);

        return new ResidentResponseDTO(
                resident.getId(),
                user.getName(),
                user.getEmail(),
                resident.getCpf(),
                resident.getPhone(),
                resident.getBirthDate(),
                unit.getId(),
                unit.getNumber()
        );
    }
}