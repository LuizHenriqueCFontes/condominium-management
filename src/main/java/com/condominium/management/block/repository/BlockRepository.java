package com.condominium.management.block.repository;

import com.condominium.management.block.entity.Block;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlockRepository
extends JpaRepository<Block, Long> {
}