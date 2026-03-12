package com.biblioteca.biblioteca.service;

import com.biblioteca.biblioteca.dto.request.UsuarioRequest;
import com.biblioteca.biblioteca.dto.response.UsuarioResponse;
import com.biblioteca.biblioteca.exception.BadRequestException;
import com.biblioteca.biblioteca.exception.ResourceNotFoundException;
import com.biblioteca.biblioteca.mapper.BibliotecaMapper;
import com.biblioteca.biblioteca.model.TipoUsuario;
import com.biblioteca.biblioteca.model.Usuario;
import com.biblioteca.biblioteca.repository.UsuarioRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UsuarioResponse> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(BibliotecaMapper::toUsuarioResponse)
                .toList();
    }

    public UsuarioResponse obtenerPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        return BibliotecaMapper.toUsuarioResponse(usuario);
    }

    public UsuarioResponse crear(UsuarioRequest request) {
        request.setUserName(limpiarUserName(request.getUserName()));

        if (usuarioRepository.existsByUserName(request.getUserName())) {
            throw new BadRequestException("El user_name ya existe");
        }

        Usuario usuario = BibliotecaMapper.toUsuario(request);
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));

        return BibliotecaMapper.toUsuarioResponse(usuarioRepository.save(usuario));
    }

    public UsuarioResponse actualizar(Long id, UsuarioRequest request) {
        request.setUserName(limpiarUserName(request.getUserName()));

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        if (!usuario.getUserName().equals(request.getUserName())
                && usuarioRepository.existsByUserName(request.getUserName())) {
            throw new BadRequestException("El user_name ya existe");
        }

        if (usuario.getTipo() == TipoUsuario.ADMINISTRADOR
                && request.getTipo() != TipoUsuario.ADMINISTRADOR
                && esUltimoAdministrador(usuario)) {
            throw new BadRequestException("No se puede modificar el último administrador del sistema");
        }

        usuario.setUserName(request.getUserName());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setTipo(request.getTipo());

        return BibliotecaMapper.toUsuarioResponse(usuarioRepository.save(usuario));
    }

    public void eliminar(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        String usuarioAutenticado = obtenerUserNameAutenticado();
        if (usuario.getUserName().equals(usuarioAutenticado)) {
            throw new BadRequestException("No puedes eliminar tu propio usuario");
        }

        if (usuario.getTipo() == TipoUsuario.ADMINISTRADOR && esUltimoAdministrador(usuario)) {
            throw new BadRequestException("No se puede eliminar el último administrador del sistema");
        }

        usuarioRepository.delete(usuario);
    }

    private String limpiarUserName(String userName) {
        return userName == null ? null : userName.trim();
    }

    private boolean esUltimoAdministrador(Usuario usuario) {
        long totalAdmins = usuarioRepository.findAll()
                .stream()
                .filter(u -> u.getTipo() == TipoUsuario.ADMINISTRADOR)
                .count();

        return usuario.getTipo() == TipoUsuario.ADMINISTRADOR && totalAdmins <= 1;
    }

    private String obtenerUserNameAutenticado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            return null;
        }

        return authentication.getName();
    }
}