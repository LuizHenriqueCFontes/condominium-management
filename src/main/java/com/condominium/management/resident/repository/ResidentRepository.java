package com.condominium.management.resident.repository;

import com.condominium.management.resident.entity.Resident;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResidentRepository
        extends JpaRepository<Resident, Long> {
}