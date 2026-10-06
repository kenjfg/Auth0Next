import Link from "next/link";
import { auth0 } from "@/lib/auth0";
import { LoginForm } from "./login-form";
import { UserCard } from "./user-card";

const primaryButton =
  "flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] sm:w-40";
const secondaryButton =
  "flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:w-40";

export default async function Home() {
  const session = await auth0.getSession();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-col items-center gap-10 rounded-2xl bg-white px-8 py-16 text-center dark:bg-zinc-950">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Auth0Next
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {session
              ? "Has iniciado sesión correctamente."
              : "Inicia sesión con tu correo, Google o GitHub."}
          </p>
        </div>

        {session ? (
          <>
            <UserCard user={session.user} />
            <div className="flex w-full flex-col gap-4 text-base font-medium sm:w-auto sm:flex-row">
              <Link href="/dashboard" className={primaryButton}>
                Dashboard
              </Link>
              <a href="/auth/logout" className={secondaryButton}>
                Cerrar sesión
              </a>
            </div>
          </>
        ) : (
          <LoginForm />
        )}
      </main>
    </div>
  );
}
