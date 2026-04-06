package com.biblioteca.biblioteca.graphql.input;

import com.biblioteca.biblioteca.model.TipoUsuario;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UsuarioUpdateInput {

    @NotBlank(message = "El user_name es obligatorio")
    @Size(min = 4, max = 50, message = "El user_name debe tener entre 4 y 50 caracteres")
    @Pattern(
        regexp = "^[a-zA-Z0-9._-]+$",
        message = "El user_name solo puede contener letras, números, punto, guion y guion bajo"
    )
    private String userName;

    @NotBlank(message = "La password es obligatoria")
    @Size(min = 4, max = 100, message = "La password debe tener entre 4 y 100 caracteres")
    private String password;

    @NotNull(message = "El tipo de usuario es obligatorio")
    private TipoUsuario tipo;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public TipoUsuario getTipo() {
        return tipo;
    }

    public void setTipo(TipoUsuario tipo) {
        this.tipo = tipo;
    }
}