package com.biblioteca.biblioteca.repository;

import com.biblioteca.biblioteca.model.TipoUsuario;
import com.biblioteca.biblioteca.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUserName(String userName);
    boolean existsByUserName(String userName);
    long countByTipo(TipoUsuario tipo);
}