package com.condominium.management.auth.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.condominium.management.auth.dto.LoginRequestDTO;
import com.condominium.management.auth.dto.LoginResponseDTO;
import com.condominium.management.auth.dto.RegisterRequestDTO;
import com.condominium.management.role.entity.Role;
import com.condominium.management.role.repository.RoleRepository;
import com.condominium.management.security.JwtService;
import com.condominium.management.user.entity.User;
import com.condominium.management.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager manager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public LoginResponseDTO login(
            LoginRequestDTO dto
    ){

        Authentication authentication =
                manager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                dto.email(),
                                dto.password()
                        )
                );

        User user =
                (User) authentication.getPrincipal();

        String token =
                jwtService.generateToken(user);

        return new LoginResponseDTO(token);
    }
    
    public void register(
            RegisterRequestDTO dto
    ){

        if(userRepository.findByEmail(dto.email()).isPresent()){
            throw new RuntimeException("E-mail já cadastrado");
        }

        Role role =
                roleRepository.findByName("ADMIN")
                        .orElseThrow();

        User user = User.builder()
                .name(dto.name())
                .email(dto.email())
                .password(
                        passwordEncoder.encode(dto.password())
                )
                .active(true)
                .role(role)
                .build();

        userRepository.save(user);
    }
}
