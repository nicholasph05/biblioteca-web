package com.biblioteca.biblioteca.graphql;

import com.biblioteca.biblioteca.service.AuthService;
import com.biblioteca.biblioteca.service.AutorService;
import com.biblioteca.biblioteca.service.LibroService;
import com.biblioteca.biblioteca.service.UsuarioService;
import com.biblioteca.biblioteca.service.ReporteService;
import org.springframework.stereotype.Controller;
import com.biblioteca.biblioteca.dto.request.LoginRequest;
import com.biblioteca.biblioteca.dto.response.LoginResponse;
import com.biblioteca.biblioteca.graphql.input.LoginInput;
import jakarta.validation.Valid;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import com.biblioteca.biblioteca.dto.response.AutorReporteResponse;
import com.biblioteca.biblioteca.dto.response.AutorResponse;
import com.biblioteca.biblioteca.dto.response.LibroResponse;
import com.biblioteca.biblioteca.dto.response.UsuarioResponse;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import com.biblioteca.biblioteca.dto.request.AutorRequest;
import com.biblioteca.biblioteca.graphql.input.AutorInput;
import com.biblioteca.biblioteca.graphql.input.AutorUpdateInput;
import com.biblioteca.biblioteca.dto.request.LibroRequest;
import com.biblioteca.biblioteca.graphql.input.LibroInput;
import com.biblioteca.biblioteca.graphql.input.LibroUpdateInput;
import com.biblioteca.biblioteca.dto.request.UsuarioRequest;
import com.biblioteca.biblioteca.graphql.input.UsuarioInput;
import com.biblioteca.biblioteca.graphql.input.UsuarioUpdateInput;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;
import com.biblioteca.biblioteca.dto.response.ResumenBibliotecaResponse;
import com.biblioteca.biblioteca.dto.response.AutorResponse;
import com.biblioteca.biblioteca.dto.response.LibroResponse;
import org.springframework.graphql.data.method.annotation.SchemaMapping;

@Controller
public class BibliotecaGraphQlController {

    private final AuthService authService;
    private final AutorService autorService;
    private final LibroService libroService;
    private final UsuarioService usuarioService;
    private final ReporteService reporteService;

    public BibliotecaGraphQlController(
            AuthService authService,
            AutorService autorService,
            LibroService libroService,
            UsuarioService usuarioService,
            ReporteService reporteService) {
        this.authService = authService;
        this.autorService = autorService;
        this.libroService = libroService;
        this.usuarioService = usuarioService;
        this.reporteService = reporteService;
    }

    @MutationMapping
    public LoginResponse login(@Argument @Valid LoginInput input) {
        LoginRequest request = new LoginRequest();
        request.setUserName(input.getUserName());
        request.setPassword(input.getPassword());

        return authService.login(request);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public AutorResponse crearAutor(@Argument @Valid AutorInput input) {
        AutorRequest request = new AutorRequest();
        request.setCedula(input.getCedula());
        request.setNombreCompleto(input.getNombreCompleto());
        request.setNacionalidad(input.getNacionalidad());

        return autorService.crear(request);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public AutorResponse actualizarAutor(@Argument String cedula, @Argument @Valid AutorUpdateInput input) {
        AutorRequest request = new AutorRequest();
        request.setCedula(cedula);
        request.setNombreCompleto(input.getNombreCompleto());
        request.setNacionalidad(input.getNacionalidad());

        return autorService.actualizar(cedula, request);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public Boolean eliminarAutor(@Argument String cedula) {
        autorService.eliminar(cedula);
        return true;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public LibroResponse crearLibro(@Argument @Valid LibroInput input) {
        LibroRequest request = new LibroRequest();
        request.setIsbn(input.getIsbn());
        request.setTitulo(input.getTitulo());
        request.setEditorial(input.getEditorial());
        request.setGenero(input.getGenero());
        request.setAnioPublicacion(input.getAnioPublicacion());
        request.setAutorCedula(input.getAutorCedula());

        return libroService.crear(request);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public LibroResponse actualizarLibro(@Argument String isbn, @Argument @Valid LibroUpdateInput input) {
        LibroRequest request = new LibroRequest();
        request.setIsbn(isbn);
        request.setTitulo(input.getTitulo());
        request.setEditorial(input.getEditorial());
        request.setGenero(input.getGenero());
        request.setAnioPublicacion(input.getAnioPublicacion());
        request.setAutorCedula(input.getAutorCedula());

        return libroService.actualizar(isbn, request);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public Boolean eliminarLibro(@Argument String isbn) {
        libroService.eliminar(isbn);
        return true;
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public UsuarioResponse crearUsuario(@Argument @Valid UsuarioInput input) {
        UsuarioRequest request = new UsuarioRequest();
        request.setUserName(input.getUserName());
        request.setPassword(input.getPassword());
        request.setTipo(input.getTipo());

        return usuarioService.crear(request);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public UsuarioResponse actualizarUsuario(@Argument Long id, @Argument @Valid UsuarioUpdateInput input) {
        UsuarioRequest request = new UsuarioRequest();
        request.setUserName(input.getUserName());
        request.setPassword(input.getPassword());
        request.setTipo(input.getTipo());

        return usuarioService.actualizar(id, request);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public Boolean eliminarUsuario(@Argument Long id) {
        usuarioService.eliminar(id);
        return true;
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public List<AutorResponse> autores() {
        return autorService.listarTodos();
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public AutorResponse autorPorCedula(@Argument String cedula) {
        return autorService.obtenerPorCedula(cedula);
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public List<LibroResponse> libros() {
        return libroService.listarTodos();
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public LibroResponse libroPorIsbn(@Argument String isbn) {
        return libroService.obtenerPorIsbn(isbn);
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public List<UsuarioResponse> usuarios() {
        return usuarioService.listarTodos();
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public UsuarioResponse usuarioPorId(@Argument Long id) {
        return usuarioService.obtenerPorId(id);
    }

    @QueryMapping
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'EMPLEADO')")
    public AutorReporteResponse reporteAutorPorCedula(@Argument String cedula) {
        return reporteService.obtenerAutorConLibros(cedula);
    }

    @QueryMapping
    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'EMPLEADO')")
    public ResumenBibliotecaResponse resumenBiblioteca() {
        return reporteService.obtenerResumenBiblioteca();
    }

    @SchemaMapping(typeName = "Libro", field = "autor")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public AutorResponse autor(LibroResponse libro) {
        return autorService.obtenerPorCedula(libro.getAutorCedula());
    }
}