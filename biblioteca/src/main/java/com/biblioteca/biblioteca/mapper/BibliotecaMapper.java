package com.biblioteca.biblioteca.mapper;

import com.biblioteca.biblioteca.dto.request.AutorRequest;
import com.biblioteca.biblioteca.dto.request.UsuarioRequest;
import com.biblioteca.biblioteca.dto.response.AutorResponse;
import com.biblioteca.biblioteca.dto.response.LibroResponse;
import com.biblioteca.biblioteca.dto.response.UsuarioResponse;
import com.biblioteca.biblioteca.model.Autor;
import com.biblioteca.biblioteca.model.Libro;
import com.biblioteca.biblioteca.model.Usuario;

public class BibliotecaMapper {

    private BibliotecaMapper() {
    }

    public static Autor toAutor(AutorRequest request) {
        Autor autor = new Autor();
        autor.setCedula(request.getCedula());
        autor.setNombreCompleto(request.getNombreCompleto());
        autor.setNacionalidad(request.getNacionalidad());
        return autor;
    }

    public static AutorResponse toAutorResponse(Autor autor) {
        return new AutorResponse(
                autor.getCedula(),
                autor.getNombreCompleto(),
                autor.getNacionalidad()
        );
    }

    public static Usuario toUsuario(UsuarioRequest request) {
        Usuario usuario = new Usuario();
        usuario.setUserName(request.getUserName());
        usuario.setPassword(request.getPassword());
        usuario.setTipo(request.getTipo());
        return usuario;
    }

    public static UsuarioResponse toUsuarioResponse(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getUserName(),
                usuario.getTipo().name()
        );
    }

    public static LibroResponse toLibroResponse(Libro libro) {
        return new LibroResponse(
                libro.getIsbn(),
                libro.getTitulo(),
                libro.getEditorial(),
                libro.getGenero(),
                libro.getAnioPublicacion(),
                libro.getAutor().getCedula(),
                libro.getAutor().getNombreCompleto()
        );
    }
}