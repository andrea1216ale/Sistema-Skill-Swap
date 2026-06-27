# Skill Swap Backend

Este backend está listo para usarse con un frontend Angular y Docker.

## Endpoints disponibles

- `GET /` - Prueba del servidor
- `GET /api/usuarios` - Listar usuarios
- `GET /api/usuario/:id` - Obtener un usuario por id
- `POST /api/registro` - Registrar usuario
- `POST /api/login` - Iniciar sesión
- `PUT /api/usuario/:id` - Actualizar usuario

## Conexión desde Angular

En Angular, usa la IP de tu servidor y el puerto 3000. Ejemplo de URL base:

```ts
export const API_URL = 'http://192.168.X.X:3000';
```

Ejemplo de servicios Angular:

```ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://192.168.X.X:3000/api';

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.baseUrl}/registro`, data);
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
}
```

> Reemplaza `192.168.X.X` por la IP de tu máquina donde corre Docker.

## Docker

Levanta el servicio con:

```sh
docker compose up --build
```

Esto crea:

- `db`: MySQL en el puerto `3306`
- `api`: backend Node en el puerto `3000`

## Base de datos

Los valores por defecto en Docker son:

- host: `db`
- user: `root`
- password: `root`
- database: `skillswap`

La API se conecta con variables de entorno para que funcione en Docker.
