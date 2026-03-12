package com.biblioteca.biblioteca.controller;

import com.biblioteca.biblioteca.dto.response.AutorReporteResponse;
import com.biblioteca.biblioteca.service.ReporteService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reportes")
public class ReporteController {

    private final ReporteService reporteService;

    public ReporteController(ReporteService reporteService) {
        this.reporteService = reporteService;
    }

    @GetMapping("/autores/{cedula}")
    public AutorReporteResponse obtenerAutorConLibros(@PathVariable String cedula) {
        return reporteService.obtenerAutorConLibros(cedula);
    }
}