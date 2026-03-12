package com.biblioteca.biblioteca.dto.response;

public class LibroResumenDto {

    private String isbn;
    private String titulo;

    public LibroResumenDto() {
    }

    public LibroResumenDto(String isbn, String titulo) {
        this.isbn = isbn;
        this.titulo = titulo;
    }

    public String getIsbn() {
        return isbn;
    }

    public String getTitulo() {
        return titulo;
    }
}