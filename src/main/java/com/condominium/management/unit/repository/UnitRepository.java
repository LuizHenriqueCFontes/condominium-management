package com.condominium.management.unit.repository;

import com.condominium.management.unit.entity.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnitRepository
        extends JpaRepository<Unit, Long> {
}
