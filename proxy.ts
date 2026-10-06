import type { NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

// Monta /auth/login, /auth/logout, /auth/callback y /auth/profile, y mantiene la sesión activa.
export async function proxy(request: NextRequest) {
  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
