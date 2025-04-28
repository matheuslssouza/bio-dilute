package com.biodilute.biodilute.auth.controller;

import com.biodilute.biodilute.auth.dto.LoginRequestDTO;
import com.biodilute.biodilute.auth.dto.LoginResponseDTO;
import com.biodilute.biodilute.auth.dto.TokenValidationDTO;
import com.biodilute.biodilute.auth.service.AuthService;
import org.antlr.v4.runtime.Token;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AuthService authService;

    public AuthController(AuthenticationManager authenticationManager, AuthService authService) {
        this.authenticationManager = authenticationManager;
        this.authService = authService;
    }

    @PostMapping("/auth")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        // Autenticação com Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(), loginRequestDTO.getPassword())
        );

        // Gera o token JWT
        String token = authService.generateToken(authentication);

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @GetMapping("/auth/verify")
    public ResponseEntity<TokenValidationDTO> verify() {
        return ResponseEntity.ok(authService.verifyAuth());
    }
}
