package com.condominium.management.block.dto;

public record BlockResponseDTO(

        Long id,

        String name,

        Long condominiumId,

        String condominiumName

) {
}
