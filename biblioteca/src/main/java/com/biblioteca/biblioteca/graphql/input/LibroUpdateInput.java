package com.biblioteca.biblioteca.graphql.input;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class LibroUpdateInput {

    @NotBlank(message = "El título es obligatorio")
    @Size(min = 2, max = 150, message = "El título debe tener entre 2 y 150 caracteres")
    @Pattern(
        regexp = ".*[A-Za-zÁÉÍÓÚáéíóúÑñ0-9].*",
        message = "El título no puede estar compuesto solo por símbolos"
    )
    private String titulo;

    @NotBlank(message = "La editorial es obligatoria")
    @Size(min = 2, max = 100, message = "La editorial debe tener entre 2 y 100 caracteres")
    @Pattern(
        regexp = ".*[A-Za-zÁÉÍÓÚáéíóúÑñ].*",
        message = "La editorial debe contener letras válidas"
    )
    private String editorial;

    @NotBlank(message = "El género es obligatorio")
    @Size(max = 50, message = "El género no puede superar 50 caracteres")
    private String genero;

    @NotNull(message = "El año de publicación es obligatorio")
    @Min(value = 1450, message = "El año de publicación no puede ser menor a 1450")
    private Integer anioPublicacion;

    @NotBlank(message = "La cédula del autor es obligatoria")
    @Pattern(regexp = "^[0-9]+$", message = "La cédula del autor solo puede contener números")
    private String autorCedula;

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getEditorial() {
        return editorial;
    }

    public void setEditorial(String editorial) {
        this.editorial = editorial;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public Integer getAnioPublicacion() {
        return anioPublicacion;
    }

    public void setAnioPublicacion(Integer anioPublicacion) {
        this.anioPublicacion = anioPublicacion;
    }

    public String getAutorCedula() {
        return autorCedula;
    }

    public void setAutorCedula(String autorCedula) {
        this.autorCedula = autorCedula;
    }
}