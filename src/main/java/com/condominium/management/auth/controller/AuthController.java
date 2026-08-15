package com.condominium.management.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.condominium.management.auth.dto.LoginRequestDTO;
import com.condominium.management.auth.dto.LoginResponseDTO;
import com.condominium.management.auth.dto.RegisterRequestDTO;
import com.condominium.management.auth.service.AuthenticationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService service;

    @PostMapping("/login")
    public LoginResponseDTO login(
            @RequestBody @Valid LoginRequestDTO dto
    ){
        return service.login(dto);
    }
    
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(
            @RequestBody @Valid RegisterRequestDTO dto
    ){
        service.register(dto);
    }
}
