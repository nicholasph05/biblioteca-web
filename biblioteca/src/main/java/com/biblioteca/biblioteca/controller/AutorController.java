package com.biblioteca.biblioteca.controller;

import com.biblioteca.biblioteca.dto.request.AutorRequest;
import com.biblioteca.biblioteca.dto.response.AutorResponse;
import com.biblioteca.biblioteca.service.AutorService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/autores")
public class AutorController {

    private final AutorService autorService;

    public AutorController(AutorService autorService) {
        this.autorService = autorService;
    }

    @GetMapping
    public ResponseEntity<List<AutorResponse>> listarTodos() {
        return ResponseEntity.ok(autorService.listarTodos());
    }

    @GetMapping("/{cedula}")
    public ResponseEntity<AutorResponse> obtenerPorCedula(@PathVariable String cedula) {
        return ResponseEntity.ok(autorService.obtenerPorCedula(cedula));
    }

    @PostMapping
    public ResponseEntity<Void> crear(@Valid @RequestBody AutorRequest request) {
        autorService.crear(request);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{cedula}")
    public ResponseEntity<Void> actualizar(@PathVariable String cedula,
                                           @Valid @RequestBody AutorRequest request) {
        autorService.actualizar(cedula, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{cedula}")
    public ResponseEntity<Void> eliminar(@PathVariable String cedula) {
        autorService.eliminar(cedula);
        return ResponseEntity.noContent().build();
    }
}