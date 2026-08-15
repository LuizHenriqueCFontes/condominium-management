package com.condominium.management.condominium.dto;

public record CondominiumResponseDTO(

        Long id,

        String name,

        String cnpj,

        String email,

        String phone,

        String address,

        String status

) {
}