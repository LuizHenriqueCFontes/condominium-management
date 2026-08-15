package com.condominium.management.condominium.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "condominiums")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Condominium {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String cnpj;

    private String email;

    private String phone;

    private String address;

    private String status;

    private LocalDateTime createdAt;
}