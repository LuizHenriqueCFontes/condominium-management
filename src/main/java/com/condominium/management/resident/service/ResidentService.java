package com.condominium.management.resident.service;

import com.condominium.management.exception.ResourceNotFoundException;
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

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResidentService {

    private final ResidentRepository residentRepository;
    private final UserRepository userRepository;
    private final UnitRepository unitRepository;

    public ResidentResponseDTO create(ResidentRequestDTO dto) {

        User user = userRepository.findById(dto.userId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Usuário não encontrado"
                        )
                );

        Unit unit = unitRepository.findById(dto.unitId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Unidade não encontrada"
                        )
                );

        Resident resident = Resident.builder()
                .cpf(dto.cpf())
                .phone(dto.phone())
                .birthDate(dto.birthDate())
                .user(user)
                .unit(unit)
                .createdAt(java.time.LocalDateTime.now())
                .build();

        resident = residentRepository.save(resident);

        return toResponse(resident);
    }

    public List<ResidentResponseDTO> findAll() {

        return residentRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ResidentResponseDTO findById(Long id) {

        Resident resident = residentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Morador não encontrado"
                        )
                );

        return toResponse(resident);
    }

    public ResidentResponseDTO update(
            Long id,
            ResidentRequestDTO dto
    ) {

        Resident resident = residentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Morador não encontrado"
                        )
                );

        User user = userRepository.findById(dto.userId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Usuário não encontrado"
                        )
                );

        Unit unit = unitRepository.findById(dto.unitId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Unidade não encontrada"
                        )
                );

        resident.setCpf(dto.cpf());
        resident.setPhone(dto.phone());
        resident.setBirthDate(dto.birthDate());
        resident.setUser(user);
        resident.setUnit(unit);

        resident = residentRepository.save(resident);

        return toResponse(resident);
    }

    public void delete(Long id) {

        if (!residentRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Morador não encontrado"
            );
        }

        residentRepository.deleteById(id);
    }

    private ResidentResponseDTO toResponse(Resident resident) {

        return new ResidentResponseDTO(
                resident.getId(),
                resident.getUser().getName(),
                resident.getUser().getEmail(),
                resident.getCpf(),
                resident.getPhone(),
                resident.getBirthDate(),
                resident.getUnit().getId(),
                resident.getUnit().getNumber()
        );
    }
}