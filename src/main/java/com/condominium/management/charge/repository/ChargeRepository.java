package com.condominium.management.charge.repository;

import com.condominium.management.charge.entity.Charge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChargeRepository
        extends JpaRepository<Charge, Long> {
}
