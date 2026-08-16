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

El frontend consume los servicios REST expuestos por el backend.

Spring Security se encarga de la autenticación y autorización, mientras que JWT permite autenticar las solicitudes mediante tokens.


**Autenticación y autorización**

La aplicación implementa autenticación mediante JSON Web Tokens.
Después de iniciar sesión correctamente, el backend genera un token que se utiliza para autenticar las solicitudes posteriores.
El acceso a los diferentes recursos depende del rol asignado al usuario.


**Administrador**
- Acceso a funcionalidades administrativas
- Gestión de recursos
- Gestión de información del sistema
- Estudiante
- Acceso a funcionalidades permitidas
- Consulta de recursos disponibles

Los endpoints protegidos verifican el token de autenticación y los permisos del usuario antes de permitir el acceso.


**Operaciones CRUD**
El sistema implementa operaciones CRUD para la gestión de información:

- Crear registros
- Consultar información
- Actualizar registros
- Eliminar registros

Estas operaciones son expuestas mediante endpoints REST y la información se almacena en MySQL.


**Base de datos**
La aplicación utiliza MySQL como sistema de gestión de bases de datos relacional.
La base de datos almacena información relacionada con usuarios, roles y recursos bibliográficos.


## Ejecución del proyecto 
**Requisitos****

Para ejecutar el proyecto es necesario tener instalados:

- Java
- Maven
- Node.js
- npm
- MySQL


**Clonar el repositorio**
git clone https://github.com/nicholasph05/biblioteca-web.git


**Ejecutar el backend**
**Ingresar al directorio del proyecto:**
cd biblioteca-web


**Configurar la conexión a MySQL en el archivo de configuración de Spring Boot.
**

Ejemplo:

spring.datasource.url=jdbc:mysql://localhost:3306/biblioteca
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_CONTRASEÑA


**Ejecutar el backend:**
mvn spring-boot:run


**Ejecutar el frontend**
**Ingresar al directorio del frontend:**
cd frontend


**Instalar las dependencias:**
npm install


**Ejecutar la aplicación:**
npm run dev


**Pruebas de API**
Los endpoints de la API pueden probarse mediante Postman.

Para acceder a los endpoints protegidos se debe enviar un token JWT válido en la cabecera de la solicitud:

Authorization: Bearer TU_TOKEN


## Conceptos aplicados

Este proyecto me permitió aplicar y fortalecer conocimientos relacionados con:

- Desarrollo full stack
- Diseño de APIs REST
- Autenticación y autorización
- Spring Security
- JWT
- Bases de datos relacionales
- Control de acceso basado en roles
- Arquitectura de software
- Programación orientada a objetos
- Separación entre frontend y backend
- Protección de rutas y endpoints
- Posibles mejoras futuras
- Contenerización con Docker
- Pruebas automatizadas
- Implementación de CI/CD
- Despliegue en servicios cloud
- Documentación de la API con Swagger/OpenAPI
- Mejor manejo global de errores
- Recuperación de contraseña
- Notificaciones
- Logging y monitoreo


## Autor

Nicholas Pareja

Estudiante de Ingeniería Informática | Software Developer

GitHub: https://github.com/nicholasph05

LinkedIn: https://www.linkedin.com/in/nicholas-pareja-4316a718a/
