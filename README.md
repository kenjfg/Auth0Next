# Auth0Next

Aplicación de login con [Auth0](https://auth0.com) construida con [Next.js](https://nextjs.org) (App Router).

El objetivo del proyecto es ofrecer un flujo de autenticación completo — inicio de sesión, cierre de sesión y acceso a rutas protegidas — delegando la gestión de identidades en Auth0.

> **Estado:** MVP funcional. Login con correo y contraseña, Google o GitHub desde un formulario propio.

## Funcionalidades

- **Formulario de login propio** en la página de inicio (`/`) con tres opciones:
  - **Continue with Email:** envía el correo como `login_hint` a la conexión `Username-Password-Authentication`.
  - **Continue with Google:** va directo a Google (`connection=google-oauth2`).
  - **Continue with GitHub:** va directo a GitHub (`connection=github`).
- Enlace **Regístrate** que abre la pantalla de registro de Auth0 (`screen_hint=signup`).
- Con sesión iniciada, la página de inicio muestra la foto, el nombre y el correo del usuario.
- Ruta protegida (`/dashboard`) con el proveedor usado, si el correo está verificado y el ID del usuario. Si no hay sesión, redirige al login.
- Cierre de sesión.

Rutas de autenticación montadas por el SDK en `proxy.ts`: `/auth/login`, `/auth/logout`, `/auth/callback` y `/auth/profile`.

### Cómo funcionan los botones

Cada botón apunta a `/auth/login` con parámetros en la URL. El SDK de Auth0 los reenvía al endpoint `/authorize`, así que el usuario va directo al proveedor elegido sin pasar por la pantalla de selección de Auth0:

```text
/auth/login?connection=google-oauth2
/auth/login?connection=github
/auth/login?connection=Username-Password-Authentication&login_hint=correo@ejemplo.com
/auth/login?screen_hint=signup
```

## Estructura del proyecto

```text
app/
  page.tsx            # Inicio: formulario de login o datos del usuario
  login-form.tsx      # Botones de correo, Google y GitHub
  user-card.tsx       # Tarjeta de usuario y nombre del proveedor
  dashboard/page.tsx  # Ruta protegida
lib/auth0.ts          # Cliente de Auth0 (lee las variables de entorno)
proxy.ts              # Middleware de Auth0 (rutas /auth/* y sesión)
```

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

## Herramientas de desarrollo con IA

- `.mcp.json` configura el [servidor MCP de Auth0](https://github.com/auth0/auth0-mcp-server), que permite administrar el tenant (aplicaciones, conexiones, logs) desde el agente.
- `.claude/skills/` y `.agents/skills/` contienen las skills del proyecto (`spec`, `spec-impl`, `caveman`), registradas en `skills-lock.json`.

## Recursos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Auth0 Next.js SDK](https://github.com/auth0/nextjs-auth0)
- [Documentación de Auth0](https://auth0.com/docs)
