# Auth0Next

Aplicación de login con [Auth0](https://auth0.com) construida con [Next.js](https://nextjs.org) (App Router).

El objetivo del proyecto es ofrecer un flujo de autenticación completo — inicio de sesión, cierre de sesión y acceso a rutas protegidas — delegando la gestión de identidades en Auth0.

> **Estado:** MVP. Login con correo y contraseña, Google o GitHub mediante el Universal Login de Auth0.

## Funcionalidades

- Inicio de sesión y registro con **correo y contraseña**, **Google** o **GitHub** (pantalla de Auth0 Universal Login).
- Página de inicio (`/`) que muestra el usuario autenticado.
- Ruta protegida (`/dashboard`) que redirige al login si no hay sesión.
- Cierre de sesión.

Rutas de autenticación montadas por el SDK en `proxy.ts`: `/auth/login`, `/auth/logout`, `/auth/callback` y `/auth/profile`.

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Auth0](https://auth0.com) para autenticación

## Requisitos

- Node.js 20 o superior
- Una cuenta de Auth0 con una aplicación de tipo **Regular Web Application**

## Configuración de Auth0

1. En el [dashboard de Auth0](https://manage.auth0.com), crea una aplicación de tipo **Regular Web Application**.
2. En la configuración de la aplicación, define:
   - **Allowed Callback URLs:** `http://localhost:3000/auth/callback`
   - **Allowed Logout URLs:** `http://localhost:3000`
3. En **Authentication → Database**, activa la conexión **Username-Password-Authentication** para tu aplicación (login con correo).
4. En **Authentication → Social**, activa **Google** (`google-oauth2`) y **GitHub** (`github`) para tu aplicación.
   - En desarrollo puedes usar las claves de desarrollo de Auth0; para producción configura tus propias credenciales OAuth de Google y GitHub.
5. Copia `.env.example` como `.env.local` y completa las variables:

```bash
AUTH0_DOMAIN=tu-tenant.auth0.com
AUTH0_CLIENT_ID=tu-client-id
AUTH0_CLIENT_SECRET=tu-client-secret
AUTH0_SECRET=una-cadena-aleatoria-de-32-bytes   # genera una con: openssl rand -hex 32
APP_BASE_URL=http://localhost:3000
```

> No subas `.env.local` al repositorio; ya está incluido en `.gitignore`.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Scripts

| Comando         | Descripción                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Inicia el servidor de desarrollo         |
| `npm run build` | Genera la build de producción            |
| `npm run start` | Sirve la build de producción             |
| `npm run lint`  | Ejecuta ESLint                           |

## Recursos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Auth0 Next.js SDK](https://github.com/auth0/nextjs-auth0)
- [Documentación de Auth0](https://auth0.com/docs)
