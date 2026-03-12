package com.biblioteca.biblioteca.dto.response;

import java.util.List;

public class AutorReporteResponse {

    private String cedula;
    private String nombreCompleto;
    private String nacionalidad;
    private List<LibroResumenDto> libros;

    public AutorReporteResponse() {
    }

    public AutorReporteResponse(String cedula, String nombreCompleto, String nacionalidad, List<LibroResumenDto> libros) {
        this.cedula = cedula;
        this.nombreCompleto = nombreCompleto;
        this.nacionalidad = nacionalidad;
        this.libros = libros;
    }

    public String getCedula() {
        return cedula;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public String getNacionalidad() {
        return nacionalidad;
    }

    public List<LibroResumenDto> getLibros() {
        return libros;
    }
}