# GymTracker API

Backend de GymTracker, una aplicación fullstack para gestionar rutinas y ejercicios de gimnasio. Desarrollado con Node.js, Express y MongoDB siguiendo el patrón Repository.

## Tecnologías

- **Node.js** + **Express** — servidor y rutas
- **MongoDB** + **Mongoose** — base de datos y modelos
- **JWT** + **bcryptjs** — autenticación y cifrado de contraseñas
- **dotenv** — gestión de variables de entorno
- **nodemon** — recarga automática en desarrollo

## Estructura del proyecto

```
gymtracker-api/
├── src/
│   ├── config/
│   │   └── db.js               # Conexión a MongoDB
│   ├── models/
│   │   ├── User.js              # Modelo de usuario
│   │   ├── Exercise.js          # Modelo de ejercicio
│   │   └── Routine.js           # Modelo de rutina
│   ├── repositories/
│   │   ├── userRepository.js    # Acceso a datos de usuarios
│   │   ├── exerciseRepository.js
│   │   └── routineRepository.js
│   ├── controllers/
│   │   ├── authController.js    # Lógica de autenticación
│   │   ├── exerciseController.js
│   │   └── routineController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── exerciseRoutes.js
│   │   └── routineRoutes.js
│   ├── middlewares/
│   │   ├── auth.js              # Verificación de JWT y roles
│   │   └── error.js             # Manejo global de errores
│   └── seeds/
│       ├── csv/                 # Datos en CSV exportados desde Excel
│       ├── seedExercises.js
│       ├── seedUsers.js
│       └── seedRoutines.js
└── index.js                     # Punto de entrada
```

## Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/TU_USUARIO/gymtracker-api.git
cd gymtracker-api
npm install
```

Crea un archivo `.env` en la raíz con estas variables:

```
PORT=3000
MONGO_URI=tu_uri_de_mongodb_atlas
JWT_SECRET=tu_secreto_jwt
```

## Scripts disponibles

```bash
npm run dev             # Arranca en modo desarrollo con nodemon
npm start               # Arranca en producción
npm run seed:exercises  # Inserta los ejercicios en la base de datos
npm run seed:users      # Inserta los usuarios de prueba
npm run seed:routines   # Inserta las rutinas públicas
```

Los seeds se deben ejecutar en ese orden, ya que las rutinas dependen de que existan usuarios y ejercicios previamente.

## Colecciones

### Users
Gestiona los usuarios de la plataforma con dos roles posibles: `admin` y `member`. Las contraseñas se almacenan hasheadas con bcrypt.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| name | String | Nombre del usuario |
| email | String | Email único |
| password | String | Contraseña hasheada |
| role | String | admin / member |
| goal | String | strength / hypertrophy / weight-loss / endurance |

### Exercises
Catálogo de ejercicios organizado por categoría muscular y nivel de dificultad.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| name | String | Nombre del ejercicio |
| category | String | chest / back / legs / shoulders / arms / core / cardio |
| muscleGroup | String | Grupo muscular principal |
| difficulty | String | beginner / intermediate / advanced |
| sets | Number | Series recomendadas |
| reps | Number | Repeticiones recomendadas |
| restSeconds | Number | Descanso en segundos |

### Routines
Rutinas personalizadas vinculadas a un usuario y compuestas por varios ejercicios.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| name | String | Nombre de la rutina |
| description | String | Descripción |
| userId | ObjectId | Referencia al usuario |
| exercises | [ObjectId] | Lista de ejercicios |
| daysPerWeek | Number | Días de entrenamiento por semana |
| goal | String | Objetivo de la rutina |
| isPublic | Boolean | Si es visible para todos |

## Endpoints

### Autenticación

| Método | Ruta | Acceso | Descripción |
|--------|------|--------|-------------|
| POST | /api/auth/register | Público | Registrar nuevo usuario |
| POST | /api/auth/login | Público | Iniciar sesión |
| GET | /api/auth/me | Privado | Obtener usuario actual |
| GET | /api/auth/users | Admin | Listar todos los usuarios |

### Ejercicios

| Método | Ruta | Acceso | Descripción |
|--------|------|--------|-------------|
| GET | /api/exercises | Público | Listar ejercicios (con filtros) |
| GET | /api/exercises/:id | Público | Obtener un ejercicio |
| POST | /api/exercises | Admin | Crear ejercicio |
| PUT | /api/exercises/:id | Admin | Editar ejercicio |
| DELETE | /api/exercises/:id | Admin | Eliminar ejercicio |

Los filtros disponibles en GET /api/exercises son: `category`, `difficulty` y `muscleGroup`.

### Rutinas

| Método | Ruta | Acceso | Descripción |
|--------|------|--------|-------------|
| GET | /api/routines | Público | Listar rutinas públicas |
| GET | /api/routines/my | Privado | Mis rutinas |
| GET | /api/routines/:id | Público | Obtener una rutina |
| POST | /api/routines | Privado | Crear rutina |
| PUT | /api/routines/:id | Privado | Editar rutina |
| DELETE | /api/routines/:id | Privado | Eliminar rutina |

## Autenticación

La API usa JWT con expiración de 7 días. Para acceder a las rutas protegidas hay que incluir el token en el header:

```
Authorization: Bearer tu_token_jwt
```

## Despliegue

La API está desplegada en Render. Cada push a la rama `main` desencadena un nuevo despliegue automático.


## Credenciales de prueba

Para probar la aplicación sin registrarse se puede usar esta cuenta de administrador:

- Email: admin@gymtracker.com
- Contraseña: Gymtracker2024!

La cuenta de administrador permite acceder al panel de usuarios y ejercicios.