package com.biblioteca.biblioteca.dto.response;

public class ResumenBibliotecaResponse {

    private int totalAutores;
    private int totalLibros;
    private int totalUsuarios;
    private int totalAdministradores;
    private int totalEmpleados;

    public int getTotalAutores() {
        return totalAutores;
    }

    public void setTotalAutores(int totalAutores) {
        this.totalAutores = totalAutores;
    }

    public int getTotalLibros() {
        return totalLibros;
    }

    public void setTotalLibros(int totalLibros) {
        this.totalLibros = totalLibros;
    }

    public int getTotalUsuarios() {
        return totalUsuarios;
    }

    public void setTotalUsuarios(int totalUsuarios) {
        this.totalUsuarios = totalUsuarios;
    }

    public int getTotalAdministradores() {
        return totalAdministradores;
    }

    public void setTotalAdministradores(int totalAdministradores) {
        this.totalAdministradores = totalAdministradores;
    }

    public int getTotalEmpleados() {
        return totalEmpleados;
    }

    public void setTotalEmpleados(int totalEmpleados) {
        this.totalEmpleados = totalEmpleados;
    }
}