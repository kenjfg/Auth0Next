# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev     # dev server at http://localhost:3000 (also re-writes AGENTS.md)
npm run build   # production build — also the type-check, there is no separate tsc script
npm run lint    # ESLint (flat config, eslint-config-next)
```

There is no test suite. Running the app requires `.env.local` (copy `.env.example`) with `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, `AUTH0_SECRET` and `APP_BASE_URL`.

## Architecture

Next.js 16 App Router + React 19 + Tailwind 4 login app; all identity handling is delegated to Auth0 via `@auth0/nextjs-auth0` v4.

- `lib/auth0.ts` exports a single `Auth0Client` singleton configured purely from env vars. Import it as `@/lib/auth0` (`@/*` maps to the repo root).
- `proxy.ts` is the Next 16 replacement for `middleware.ts` (the old name is deprecated). It runs `auth0.middleware()` on every non-static request, which both mounts the SDK routes (`/auth/login`, `/auth/logout`, `/auth/callback`, `/auth/profile`) and rolls the session. There are no `app/auth/*` route files — don't add them.
- Pages are async Server Components that call `auth0.getSession()` directly. Protected routes (e.g. `app/dashboard/page.tsx`) redirect to `/auth/login?returnTo=<path>` when there is no session.
- The custom login UI (`app/login-form.tsx`) is plain links/a GET form to `/auth/login`; the SDK forwards query params (`connection`, `login_hint`, `screen_hint`) to Auth0 `/authorize`, skipping the Universal Login provider picker. Connection names in use: `Username-Password-Authentication`, `google-oauth2`, `github`.
- Auth links must be `<a href>`, not `next/link`, since `/auth/*` are handled by the proxy, not App Router pages.
- The login provider is derived from the `sub` prefix (`providerName()` in `app/user-card.tsx`); add new connections to its map.
- User avatars use `<img>` (not `next/image`) because they come from arbitrary provider domains.

## Conventions

- UI copy, code comments and README are in Spanish (`<html lang="es">`); keep new text consistent. Login button labels are intentionally English ("Continue with …").
- Styling is inline Tailwind utility classes with `dark:` variants; shared class strings are hoisted into consts at the top of the file.

## Tooling

- `.mcp.json` configures the Auth0 MCP server for managing the tenant (applications, connections, logs).
- Project skills live in `.claude/skills/` (mirrored in `.agents/skills/`, tracked in `skills-lock.json`): `/spec` writes a spec into `specs/`, `/spec-impl <NN-spec-name>` implements an approved spec on a new branch, `caveman` is a terse-output mode.
