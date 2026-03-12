package com.biblioteca.biblioteca.service;

import com.biblioteca.biblioteca.dto.request.LibroRequest;
import com.biblioteca.biblioteca.dto.response.LibroResponse;
import com.biblioteca.biblioteca.exception.BadRequestException;
import com.biblioteca.biblioteca.exception.ResourceNotFoundException;
import com.biblioteca.biblioteca.mapper.BibliotecaMapper;
import com.biblioteca.biblioteca.model.Autor;
import com.biblioteca.biblioteca.model.Libro;
import com.biblioteca.biblioteca.repository.AutorRepository;
import com.biblioteca.biblioteca.repository.LibroRepository;
import org.springframework.stereotype.Service;
import java.time.Year;
import java.util.Set;
import java.util.List;

@Service
public class LibroService {

    private final LibroRepository libroRepository;
    private final AutorRepository autorRepository;

    public LibroService(LibroRepository libroRepository, AutorRepository autorRepository) {
        this.libroRepository = libroRepository;
        this.autorRepository = autorRepository;
    }

    public List<LibroResponse> listarTodos() {
        return libroRepository.findAll()
                .stream()
                .map(BibliotecaMapper::toLibroResponse)
                .toList();
    }

    public LibroResponse obtenerPorIsbn(String isbn) {
        Libro libro = libroRepository.findById(isbn)
                .orElseThrow(() -> new ResourceNotFoundException("Libro no encontrado"));
        return BibliotecaMapper.toLibroResponse(libro);
    }

    public LibroResponse crear(LibroRequest request) {
        request.setIsbn(limpiarTexto(request.getIsbn()));
        request.setTitulo(limpiarTexto(request.getTitulo()));
        request.setEditorial(limpiarTexto(request.getEditorial()));
        request.setGenero(limpiarTexto(request.getGenero()));
        request.setAutorCedula(limpiarTexto(request.getAutorCedula()));

        validarAnioPublicacion(request.getAnioPublicacion());
        validarGenero(request.getGenero());

        if (libroRepository.existsById(request.getIsbn())) {
            throw new BadRequestException("Ya existe un libro con ese ISBN");
        }

        Autor autor = autorRepository.findById(request.getAutorCedula())
                .orElseThrow(() -> new ResourceNotFoundException("Autor no encontrado"));

        Libro libro = new Libro();
        libro.setIsbn(request.getIsbn());
        libro.setTitulo(request.getTitulo());
        libro.setEditorial(request.getEditorial());
        libro.setGenero(request.getGenero());
        libro.setAnioPublicacion(request.getAnioPublicacion());
        libro.setAutor(autor);

        return BibliotecaMapper.toLibroResponse(libroRepository.save(libro));
    }

    public LibroResponse actualizar(String isbn, LibroRequest request) {
        request.setIsbn(limpiarTexto(request.getIsbn()));
        request.setTitulo(limpiarTexto(request.getTitulo()));
        request.setEditorial(limpiarTexto(request.getEditorial()));
        request.setGenero(limpiarTexto(request.getGenero()));
        request.setAutorCedula(limpiarTexto(request.getAutorCedula()));

        validarAnioPublicacion(request.getAnioPublicacion());
        validarGenero(request.getGenero());

        Libro libro = libroRepository.findById(isbn)
                .orElseThrow(() -> new ResourceNotFoundException("Libro no encontrado"));

        Autor autor = autorRepository.findById(request.getAutorCedula())
                .orElseThrow(() -> new ResourceNotFoundException("Autor no encontrado"));

        if (!libro.getIsbn().equals(request.getIsbn())) {
            throw new BadRequestException("El ISBN no se puede modificar");
        }

        libro.setTitulo(request.getTitulo());
        libro.setEditorial(request.getEditorial());
        libro.setGenero(request.getGenero());
        libro.setAnioPublicacion(request.getAnioPublicacion());
        libro.setAutor(autor);

        return BibliotecaMapper.toLibroResponse(libroRepository.save(libro));
    }

    public void eliminar(String isbn) {
        Libro libro = libroRepository.findById(isbn)
                .orElseThrow(() -> new ResourceNotFoundException("Libro no encontrado"));
        libroRepository.delete(libro);
    }

    private static final Set<String> GENEROS_VALIDOS = Set.of(
            "Novela",
            "Cuento",
            "Poesía",
            "Ensayo",
            "Drama",
            "Fantasía",
            "Ciencia ficción",
            "Terror",
            "Historia",
            "Biografía",
            "Infantil",
            "Académico");

    private void validarAnioPublicacion(Integer anio) {
        int anioActual = Year.now().getValue();

        if (anio > anioActual) {
            throw new BadRequestException("El año de publicación no puede ser mayor al año actual");
        }
    }

    private void validarGenero(String genero) {
        if (!GENEROS_VALIDOS.contains(genero)) {
            throw new BadRequestException("El género seleccionado no es válido");
        }
    }

    private String limpiarTexto(String valor) {
        return valor == null ? null : valor.trim().replaceAll("\\s{2,}", " ");
    }
}