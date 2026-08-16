# Sistema de Gestión de Biblioteca

Aplicación web full stack para la gestión de usuarios y recursos bibliográficos, con autenticación, autorización basada en roles y protección de rutas.

El proyecto fue desarrollado utilizando Spring Boot para el backend, React para el frontend y MySQL para la persistencia de datos.

## Funcionalidades principales

- Autenticación de usuarios mediante JWT
- Autorización utilizando Spring Security
- Control de acceso basado en roles
- Roles diferenciados para administrador y estudiante
- Protección de endpoints en el backend
- Protección de rutas en el frontend
- Operaciones CRUD para la gestión de recursos
- Gestión de usuarios
- Persistencia de información con MySQL
- Integración entre frontend y backend mediante API REST
  

## Tecnologías utilizadas

### Backend

- Java
- Spring Boot
- Spring Security
- JWT
- API REST

### Frontend

- React
- JavaScript

### Base de datos

- MySQL

### Herramientas

- Git
- GitHub
- Postman

## Arquitectura

La aplicación utiliza una arquitectura cliente-servidor.

React Frontend
      |
      | HTTP / REST
      v
Spring Boot API
      |
      |-- Spring Security
      |-- Autenticación JWT
      |
      v
    MySQL
