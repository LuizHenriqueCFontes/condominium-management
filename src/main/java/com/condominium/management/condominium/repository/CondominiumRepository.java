package com.condominium.management.condominium.repository;

import com.condominium.management.condominium.entity.Condominium;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CondominiumRepository
        extends JpaRepository<Condominium, Long> {
}
