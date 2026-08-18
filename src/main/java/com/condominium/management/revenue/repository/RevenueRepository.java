package com.condominium.management.revenue.repository;

import com.condominium.management.revenue.entity.Revenue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RevenueRepository
        extends JpaRepository<Revenue, Long> {
}
