# Employees API

API HTTP construida con Node.js, Express y TypeScript para gestionar empleados.

## Índice

- [Descripción](#descripción)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecución del servidor](#ejecución-del-servidor)
- [Ejecución de pruebas](#ejecución-de-pruebas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Endpoints de la API](#endpoints-de-la-api)
- [Colección de Postman](#colección-de-postman)
- [Demostración en video](#demostración-en-video)
- [Autor](#autor)

## Descripción

Esta API permite realizar operaciones CRUD básicas sobre un listado de empleados en memoria. Está construida siguiendo buenas prácticas de arquitectura y organización de código, utilizando las siguientes tecnologías:

- **Node.js**
- **Express**
- **TypeScript**

## Requisitos previos

- **Node.js** v14 o superior
- **npm** v6 o superior

## Instalación

1. **Clona este repositorio**:

   ```bash
   git clone https://github.com/dmarmijosa/arquitectura-servidores-semana1
   cd semana1
   ```

2. **Instala las dependencias**:

   ```bash
   npm install
   ```

## Ejecución del servidor

### Modo de desarrollo

Para ejecutar el servidor en modo de desarrollo con recarga automática:

```bash
npm run dev
```

El servidor estará escuchando en `http://localhost:8000`.

### Modo de producción

Para compilar y ejecutar el servidor en modo de producción:

```bash
npm run build
npm start
```

## Ejecución de pruebas

Para ejecutar las pruebas unitarias con Jest y Supertest:

```bash
npm run test
```

## Estructura del proyecto

El proyecto sigue una estructura modular para facilitar la escalabilidad y el mantenimiento:

```
employees-api/
├── app.ts                  // Archivo principal de la aplicación
├── bin/
│   └── www.ts              // Archivo de arranque del servidor
│   └── employees.json      // Datos de empleados
├── config/
│   └── routes.ts           // Configuración de rutas
├── config-postman/
│   └── *.collection.json   // Configuración de rutas para postman
├── controllers/
│   └── employeesController.ts // Controladores de empleados
├── middlewares/            // Middlewares de Express (vacío por defecto)
├── models/
│   └── employeeModel.ts    // Modelo de datos de empleado
├── tests/
│   └── employees.test.ts   // Pruebas unitarias
├── package.json
├── tsconfig.json           // Configuración de TSC
├── jest.config.js          // Configuración de JEST
├── README.md
```

## Endpoints de la API

### 1. Obtener todos los empleados

- **Método**: `GET`
- **URL**: `/api/employees`
- **Descripción**: Devuelve un array con todos los empleados.

### 2. Obtener empleados con paginación

- **Método**: `GET`
- **URL**: `/api/employees?page=N`
- **Descripción**: Devuelve 2 empleados por página.
- **Ejemplos**:
  - `/api/employees?page=1` devuelve los empleados 0 y 1.
  - `/api/employees?page=2` devuelve los empleados 2 y 3.

### 3. Obtener el empleado de mayor edad

- **Método**: `GET`
- **URL**: `/api/employees/oldest`
- **Descripción**: Devuelve el empleado con más edad.

### 4. Filtrar empleados por privilegios

- **Método**: `GET`
- **URL**: `/api/employees?user=true`
- **Descripción**: Devuelve empleados con `privileges` igual a `"user"`.

### 5. Filtrar empleados por badge

- **Método**: `GET`
- **URL**: `/api/employees?badges=BADGE`
- **Descripción**: Devuelve empleados que tienen el badge especificado.
- **Ejemplo**:
  - `/api/employees?badges=black` devuelve empleados con el badge `"black"`.

### 6. Añadir un nuevo empleado

- **Método**: `POST`
- **URL**: `/api/employees`
- **Descripción**: Añade un nuevo empleado al listado en memoria.
- **Body**: Debe ser un objeto JSON con el mismo formato que los empleados existentes.
- **Ejemplo de JSON**:

  ```json
  {
    "name": "Alice",
    "age": 28,
    "phone": {
      "personal": "555-987-654",
      "work": "555-654-321",
      "ext": "1234"
    },
    "privileges": "user",
    "favorites": {
      "artist": "Van Gogh",
      "food": "sushi"
    },
    "finished": [10, 20],
    "badges": ["red", "yellow"],
    "points": [
      {
        "points": 90,
        "bonus": 15
      },
      {
        "points": 80,
        "bonus": 10
      }
    ]
  }
  ```

### 7. Obtener empleado por nombre

- **Método**: `GET`
- **URL**: `/api/employees/NAME`
- **Descripción**: Devuelve el empleado cuyo nombre es `NAME`.
- **Ejemplo**:
  - `/api/employees/Sue` devuelve el empleado con nombre `"Sue"`.

## Colección de Postman

La colección de Postman se encuentra en la carpeta `config-postman/SEMANA 1 ARQUITECTURA SERVIDORES.postman_collection.json`. Contiene peticiones preconfiguradas para todos los endpoints mencionados.

**Cómo importar la colección en Postman**:

1. Abre Postman.
2. Haz clic en **Import**.
3. Selecciona el archivo `Employees API.postman_collection.json` desde la carpeta `postman`.
4. La colección aparecerá en tu lista de colecciones.

## Demostración en video

Puedes ver una demostración del funcionamiento de la API y una explicación del código en el siguiente enlace:

[Enlace al video de demostración](https://youtu.be/L068H2xw4Qw) 

## Autor

- **Danny Armijos** - [dmarmijosa](https://github.com/dmarmijosa)
