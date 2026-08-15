package com.condominium.management.role.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.condominium.management.role.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String name);

}
