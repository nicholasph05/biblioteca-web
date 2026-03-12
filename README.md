# Sistema de Biblioteca

Aplicación web para la gestión de autores, libros y usuarios de una biblioteca.

## Tecnologías utilizadas
- Backend: Spring Boot
- Seguridad: Spring Security + JWT
- Base de datos: MySQL
- Frontend: React

## Tipos de usuario
- ADMINISTRADOR
- EMPLEADO

## Funcionalidades
- Inicio de sesión con user_name y password
- CRUD de autores
- CRUD de libros
- CRUD de usuarios
- Reporte de autores por cédula con sus libros asociados

## Reglas de negocio
- No se puede eliminar un autor con libros asociados
- No se puede eliminar el último administrador
- No se puede eliminar el usuario autenticado
- El empleado solo puede acceder al módulo de reportes
