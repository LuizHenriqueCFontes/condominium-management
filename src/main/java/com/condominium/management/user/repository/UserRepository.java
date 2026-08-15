package com.condominium.management.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.condominium.management.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

}