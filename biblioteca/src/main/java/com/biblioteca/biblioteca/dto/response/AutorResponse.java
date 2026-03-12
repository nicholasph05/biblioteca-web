package com.biblioteca.biblioteca.dto.response;

public class AutorResponse {

    private String cedula;
    private String nombreCompleto;
    private String nacionalidad;

    public AutorResponse() {
    }

    public AutorResponse(String cedula, String nombreCompleto, String nacionalidad) {
        this.cedula = cedula;
        this.nombreCompleto = nombreCompleto;
        this.nacionalidad = nacionalidad;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public String getNacionalidad() {
        return nacionalidad;
    }

    public void setNacionalidad(String nacionalidad) {
        this.nacionalidad = nacionalidad;
    }
}