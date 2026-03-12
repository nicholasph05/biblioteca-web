package com.biblioteca.biblioteca.service;

import com.biblioteca.biblioteca.dto.response.AutorReporteResponse;
import com.biblioteca.biblioteca.dto.response.LibroResumenDto;
import com.biblioteca.biblioteca.model.Autor;
import com.biblioteca.biblioteca.model.Libro;
import com.biblioteca.biblioteca.repository.AutorRepository;
import com.biblioteca.biblioteca.repository.LibroRepository;
import org.springframework.stereotype.Service;
import com.biblioteca.biblioteca.exception.ResourceNotFoundException;
import java.util.List;

@Service
public class ReporteService {

    private final AutorRepository autorRepository;
    private final LibroRepository libroRepository;

    public ReporteService(AutorRepository autorRepository, LibroRepository libroRepository) {
        this.autorRepository = autorRepository;
        this.libroRepository = libroRepository;
    }

    public AutorReporteResponse obtenerAutorConLibros(String cedula) {
        Autor autor = autorRepository.findById(cedula)
                .orElseThrow(() -> new ResourceNotFoundException("Autor no encontrado"));

        List<Libro> libros = libroRepository.findByAutorCedula(cedula);

        List<LibroResumenDto> librosDto = libros.stream()
                .map(libro -> new LibroResumenDto(libro.getIsbn(), libro.getTitulo()))
                .toList();

        return new AutorReporteResponse(
                autor.getCedula(),
                autor.getNombreCompleto(),
                autor.getNacionalidad(),
                librosDto
        );
    }
}