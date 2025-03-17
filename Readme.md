# Backend - Aplicación de Notas y Tareas

## Descripción

Este es el backend de una aplicación para la gestión de notas y tareas dentro de clases. La API permite a los usuarios registrarse, autenticarse y administrar sus clases, notas y tareas organizadas en un tablero estilo Kanban con columnas "To Do", "Doing" y "Done".

## Tecnologías Utilizadas

- **Backend:** Node.js con Express
- **Base de datos:** MongoDB con Mongoose
- **Autenticación:** JWT (JSON Web Token) y bcrypt para el manejo de contraseñas
- **Middleware:** Express Validator para validación de datos
- **CORS:** Para permitir peticiones desde el frontend

## Características del Backend

- **Autenticación de usuarios** (registro, inicio de sesión y protección de rutas con JWT).
- **Gestión de clases:** Crear, editar y eliminar clases.
- **Gestión de tareas:** Asignar tareas a clases y organizarlas en "To Do", "Doing" y "Done".
- **Protección de rutas:** Middleware para verificar sesiones activas.
- **Manejo de errores:** Respuestas estructuradas y control de errores en las peticiones.

## Instalación y Configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/backend-notas.git
   cd backend-notas
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno (crear un archivo `.env` con las siguientes claves):
   ```env
   PORT=5000
   MONGO_URI=tu_url_de_mongodb
   JWT_SECRET=tu_clave_secreta
   ```
4. Iniciar el servidor:
   ```bash
   npm start
   ```
## Estado del Proyecto

Actualmente en desarrollo. Se están agregando mejoras en:
- Mejor gestión de usuarios y permisos.
- WebSockets para actualización en tiempo real.
- Implementación de notificaciones para tareas pendientes.

## Futuras Mejoras

- Implementar roles de usuario (profesor/estudiante).
- Generación de reportes y análisis de tareas completadas.
- Integración con almacenamiento en la nube para adjuntar archivos.

## Contribuciones

Dado que es un proyecto de práctica, las contribuciones externas no están habilitadas por el momento, pero cualquier sugerencia es bienvenida.

