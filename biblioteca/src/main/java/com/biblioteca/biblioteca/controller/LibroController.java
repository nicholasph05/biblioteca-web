package com.biblioteca.biblioteca.controller;

import com.biblioteca.biblioteca.dto.request.LibroRequest;
import com.biblioteca.biblioteca.dto.response.LibroResponse;
import com.biblioteca.biblioteca.service.LibroService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/libros")
public class LibroController {

    private final LibroService libroService;

    public LibroController(LibroService libroService) {
        this.libroService = libroService;
    }

    @GetMapping
    public List<LibroResponse> listarTodos() {
        return libroService.listarTodos();
    }

    @GetMapping("/{isbn}")
    public LibroResponse obtenerPorIsbn(@PathVariable String isbn) {
        return libroService.obtenerPorIsbn(isbn);
    }

    @PostMapping
    public LibroResponse crear(@Valid @RequestBody LibroRequest request) {
        return libroService.crear(request);
    }

    @PutMapping("/{isbn}")
    public LibroResponse actualizar(@PathVariable String isbn, @Valid @RequestBody LibroRequest request) {
        return libroService.actualizar(isbn, request);
    }

    @DeleteMapping("/{isbn}")
    public void eliminar(@PathVariable String isbn) {
        libroService.eliminar(isbn);
    }
}