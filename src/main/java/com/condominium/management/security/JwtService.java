package com.condominium.management.security;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.condominium.management.user.entity.User;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    public String generateToken(User user){

        return JWT.create()
                .withSubject(user.getEmail())
                .withIssuedAt(new Date())
                .withExpiresAt(
                        new Date(System.currentTimeMillis() + expiration)
                )
                .sign(
                        Algorithm.HMAC256(secret)
                );
    }

    public String validateToken(String token){

        return JWT.require(
                        Algorithm.HMAC256(secret)
                )
                .build()
                .verify(token)
                .getSubject();
    }

}
