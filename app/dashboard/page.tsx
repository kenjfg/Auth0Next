import Link from "next/link";
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { UserCard, providerName } from "../user-card";

export default async function Dashboard() {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login?returnTo=/dashboard");
  }

  const { user } = session;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-col gap-8 rounded-2xl bg-white px-8 py-12 dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Dashboard
        </h1>

        <UserCard user={user} />

        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
          <dt className="text-zinc-500">Proveedor</dt>
          <dd className="text-black dark:text-zinc-50">{providerName(user.sub)}</dd>
          <dt className="text-zinc-500">Correo verificado</dt>
          <dd className="text-black dark:text-zinc-50">{user.email_verified ? "Sí" : "No"}</dd>
          <dt className="text-zinc-500">ID</dt>
          <dd className="break-all font-mono text-black dark:text-zinc-50">{user.sub}</dd>
        </dl>

        <div className="flex gap-4 text-sm font-medium">
          <Link href="/" className="text-zinc-600 hover:underline dark:text-zinc-400">
            ← Inicio
          </Link>
          <a href="/auth/logout" className="text-zinc-600 hover:underline dark:text-zinc-400">
            Cerrar sesión
          </a>
        </div>
      </main>
    </div>
  );
}
