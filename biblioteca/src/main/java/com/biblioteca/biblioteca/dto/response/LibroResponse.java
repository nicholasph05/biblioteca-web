package com.biblioteca.biblioteca.dto.response;


public class LibroResponse {

    private String isbn;
    private String titulo;
    private String editorial;
    private String genero;
    private Integer anioPublicacion;
    private String autorCedula;
    private String autorNombre;

    public LibroResponse() {
    }

    public LibroResponse(String isbn, String titulo, String editorial, String genero,
                         Integer anioPublicacion, String autorCedula, String autorNombre) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.editorial = editorial;
        this.genero = genero;
        this.anioPublicacion = anioPublicacion;
        this.autorCedula = autorCedula;
        this.autorNombre = autorNombre;
    }

    public String getIsbn() {
        return isbn;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getEditorial() {
        return editorial;
    }

    public String getGenero() {
        return genero;
    }

    public Integer getAnioPublicacion() {
        return anioPublicacion;
    }

    public String getAutorCedula() {
        return autorCedula;
    }

    public String getAutorNombre() {
        return autorNombre;
    }
}