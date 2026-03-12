package com.biblioteca.biblioteca.dto.response;

public class UsuarioResponse {

    private Long id;
    private String userName;
    private String tipo;

    public UsuarioResponse() {
    }

    public UsuarioResponse(Long id, String userName, String tipo) {
        this.id = id;
        this.userName = userName;
        this.tipo = tipo;
    }

    public Long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getTipo() {
        return tipo;
    }
}