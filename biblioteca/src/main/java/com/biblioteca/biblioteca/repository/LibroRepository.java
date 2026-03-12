package com.biblioteca.biblioteca.repository;

import com.biblioteca.biblioteca.model.Libro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LibroRepository extends JpaRepository<Libro, String> {
    List<Libro> findByAutorCedula(String cedula);
}