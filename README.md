

Este proyecto surge de la necesidad demejorar la salud y el bienestar de esta comunidad, que a menudo se ve
afectada por largas horas de trabajo frente a la computadora, lo que conducea una falta de ejercicio y una 
dieta desequilibrada. NutriFit busca promoverla adopción de hábitos saludables mediante el seguimiento y 
registro de la alimentación y la actividad física diaria, generando conciencia sobre la importancia de
la nutrición y el ejercicio en el bienestar general. El proyecto NutriFit permite a los usuarios registrar
sus comidas diarias y la actividad física, proporcionando un seguimiento detallado de su dieta y
ejercicio.Esta combinación de características facilita el seguimiento de la dieta y el ejercicio, 
motiva a los usuarios y promueve una cultura de salud y bienestar dentro de la comunidad tecnológica.




Las comidas de la base de datos incluyen los siguientes detalles: 

- nombre
- tipo (desayuno, almuerzo, cena, snack)
- proteinas
- carbohidratos
- calorias
- fecha


La receta de la base de datos incluyen los siguientes detalles: 
- nombre
- descripción
- ingredientes
- instrucciones
- calorías
- proteínas
- carbohidratos

Las actividades físicas de la base de datos incluyen los siguientes detalles:
- tipo (correr, trotar, nadar, levantar pesas)
- duración (en minutos)
- calorías quemadas
- fecha

Y los usuarios de la base de datos incluyen:

- nombre del usuario;
- contrasena;
- altura;
- peso;
- genero;
- email;
- edad;


Los endpoints de la API REST son los siguientes:

### Autenticación y Registro 

| Método  |  Descripción  |
|---|---|
| **POST** | Login: /auth/login  |
| **POST** | Registro: /auth/register |

### Administración de Comidas 

| Método  |  Descripción  |
|---|---|
| **POST** | Crear Comida: /comidas |
| **GET** | Obtener Comidas por Usuario: /comidas/usuario/{usuarioId} |
| **PATCH** | Actualizar parcialmente Comida: /comidas/{id} |
| **DELETE** | Eliminar Comida: /comidas/{id} |

### Administración de Recetas 

| Método  |  Descripción  |
|---|---|
| **POST** | Crear Receta: /recetas |
| **GET** | Obtener Recetas por Usuario: /recetas/usuario/{usuarioId} |
| **PATCH** | Actualizar parcialmente Receta: /recetas/{id} |
| **DELETE** | Eliminar Receta: /recetas/{id} |

### Administración de Actividades Físicas 

| Método  |  Descripción  |
|---|---|
| **POST** | Crear Actividad Física: /actividades-fisicas |
| **GET** | Obtener Actividades Físicas por Usuario: /actividades-fisicas/usuario/{usuarioId} |
| **PATCH** | Actualizar parcialmente Actividad Física: /actividades-fisicas/{id} |
| **DELETE** | Eliminar Actividad Física: /actividades-fisicas/{id} |

## Variables de entorno
- PG_HOST=database-2.c67h2wwit96k.us-east-1.rds.amazonaws.com
- PG_PASSWORD=minejos2005
- PG_PORT=5432
- PG_USERNAME=postgres
- POSTGRES_DB=postgres

## Inicializar tu proyecto Vite

Para inicializar el proyecto puedes usar los pasos de la documentación de Vite [**aquí**](https://vitejs.dev/guide/).

## Documentación permitida 

- [**Axios**](https://axios-http.com/docs/intro)
- [**React**](https://react.dev/reference/react)
- [**React Router**](https://reactrouter.com/web/guides/quick-start)


