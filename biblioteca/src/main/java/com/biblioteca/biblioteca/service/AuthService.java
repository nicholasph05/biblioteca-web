package com.biblioteca.biblioteca.service;

import com.biblioteca.biblioteca.dto.request.LoginRequest;
import com.biblioteca.biblioteca.dto.response.LoginResponse;
import com.biblioteca.biblioteca.exception.BadRequestException;
import com.biblioteca.biblioteca.model.Usuario;
import com.biblioteca.biblioteca.repository.UsuarioRepository;
import com.biblioteca.biblioteca.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;

    public AuthService(AuthenticationManager authenticationManager,
                       UsuarioRepository usuarioRepository,
                       JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.usuarioRepository = usuarioRepository;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUserName(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new BadRequestException("Credenciales inválidas");
        }

        Usuario usuario = usuarioRepository.findByUserName(request.getUserName())
                .orElseThrow(() -> new BadRequestException("Credenciales inválidas"));

        String token = jwtService.generateToken(
                usuario.getUserName(),
                usuario.getTipo().name()
        );

        return new LoginResponse(
                usuario.getId(),
                usuario.getUserName(),
                usuario.getTipo().name(),
                token,
                "Inicio de sesión exitoso"
        );
    }
}