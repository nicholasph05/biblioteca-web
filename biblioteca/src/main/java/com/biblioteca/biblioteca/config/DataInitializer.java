package com.biblioteca.biblioteca.config;

import com.biblioteca.biblioteca.model.TipoUsuario;
import com.biblioteca.biblioteca.model.Usuario;
import com.biblioteca.biblioteca.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsuarios(UsuarioRepository usuarioRepository,
                                   PasswordEncoder passwordEncoder) {
        return args -> {
            if (usuarioRepository.findByUserName("admin").isEmpty()) {
                Usuario admin = new Usuario();
                admin.setUserName("admin");
                admin.setPassword(passwordEncoder.encode("1234"));
                admin.setTipo(TipoUsuario.ADMINISTRADOR);
                usuarioRepository.save(admin);
            }

            if (usuarioRepository.findByUserName("empleado1").isEmpty()) {
                Usuario empleado = new Usuario();
                empleado.setUserName("empleado1");
                empleado.setPassword(passwordEncoder.encode("1234"));
                empleado.setTipo(TipoUsuario.EMPLEADO);
                usuarioRepository.save(empleado);
            }
        };
    }
}