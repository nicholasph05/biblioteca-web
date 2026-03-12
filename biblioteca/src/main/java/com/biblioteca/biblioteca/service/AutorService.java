package com.biblioteca.biblioteca.service;

import com.biblioteca.biblioteca.dto.request.AutorRequest;
import com.biblioteca.biblioteca.dto.response.AutorResponse;
import com.biblioteca.biblioteca.exception.BadRequestException;
import com.biblioteca.biblioteca.exception.ResourceNotFoundException;
import com.biblioteca.biblioteca.mapper.BibliotecaMapper;
import com.biblioteca.biblioteca.model.Autor;
import com.biblioteca.biblioteca.repository.AutorRepository;
import org.springframework.stereotype.Service;
import com.biblioteca.biblioteca.repository.LibroRepository;
import java.util.Set;
import java.util.List;

@Service
public class AutorService {

    private final AutorRepository autorRepository;
    private final LibroRepository libroRepository;

    public AutorService(AutorRepository autorRepository, LibroRepository libroRepository) {
        this.autorRepository = autorRepository;
        this.libroRepository = libroRepository;
    }

    public List<AutorResponse> listarTodos() {
        return autorRepository.findAll()
                .stream()
                .map(BibliotecaMapper::toAutorResponse)
                .toList();
    }

    public AutorResponse obtenerPorCedula(String cedula) {
        Autor autor = autorRepository.findById(cedula)
                .orElseThrow(() -> new ResourceNotFoundException("Autor no encontrado"));

        return BibliotecaMapper.toAutorResponse(autor);
    }

    public AutorResponse crear(AutorRequest request) {
        request.setCedula(limpiarTexto(request.getCedula()));
        request.setNombreCompleto(limpiarTexto(request.getNombreCompleto()));
        request.setNacionalidad(limpiarTexto(request.getNacionalidad()));

        validarNacionalidad(request.getNacionalidad());

        if (autorRepository.existsById(request.getCedula())) {
            throw new BadRequestException("Ya existe un autor con esa cédula");
        }

        Autor autor = BibliotecaMapper.toAutor(request);
        Autor guardado = autorRepository.save(autor);

        return BibliotecaMapper.toAutorResponse(guardado);
    }

    public AutorResponse actualizar(String cedula, AutorRequest request) {
        request.setCedula(limpiarTexto(request.getCedula()));
        request.setNombreCompleto(limpiarTexto(request.getNombreCompleto()));
        request.setNacionalidad(limpiarTexto(request.getNacionalidad()));

        validarNacionalidad(request.getNacionalidad());

        Autor autor = autorRepository.findById(cedula)
                .orElseThrow(() -> new ResourceNotFoundException("Autor no encontrado"));

        autor.setNombreCompleto(request.getNombreCompleto());
        autor.setNacionalidad(request.getNacionalidad());

        Autor actualizado = autorRepository.save(autor);

        return BibliotecaMapper.toAutorResponse(actualizado);
    }

    public void eliminar(String cedula) {
        Autor autor = autorRepository.findById(cedula)
                .orElseThrow(() -> new ResourceNotFoundException("Autor no encontrado"));

        boolean tieneLibrosAsociados = !libroRepository.findByAutorCedula(cedula).isEmpty();

        if (tieneLibrosAsociados) {
            throw new BadRequestException("No se puede eliminar el autor porque tiene libros asociados");
        }

        autorRepository.delete(autor);
    }

    private static final Set<String> NACIONALIDADES_VALIDAS = Set.of(
            "Colombia",
            "Argentina",
            "México",
            "Perú",
            "Chile",
            "Ecuador",
            "Venezuela",
            "España",
            "Estados Unidos",
            "Francia",
            "Italia",
            "Alemania",
            "Portugal",
            "Brasil",
            "Reino Unido",
            "Canadá",
            "Japón");

    private void validarNacionalidad(String nacionalidad) {
        if (!NACIONALIDADES_VALIDAS.contains(nacionalidad)) {
            throw new BadRequestException("La nacionalidad seleccionada no es válida");
        }
    }

    private String limpiarTexto(String valor) {
        return valor == null ? null : valor.trim().replaceAll("\\s{2,}", " ");
    }
}