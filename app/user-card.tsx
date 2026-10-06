import type { User } from "@auth0/nextjs-auth0/types";

const providers: Record<string, string> = {
  auth0: "Correo y contraseña",
  "google-oauth2": "Google",
  github: "GitHub",
};

export function providerName(sub: string) {
  const id = sub.split("|")[0];
  return providers[id] ?? id;
}

export function UserCard({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-4">
      {user.picture && (
        // Las fotos vienen de dominios variables (Google, GitHub, Gravatar), así que no usamos next/image.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.picture}
          alt=""
          width={56}
          height={56}
          className="h-14 w-14 rounded-full"
          referrerPolicy="no-referrer"
        />
      )}
      <div className="text-left">
        <p className="text-lg font-semibold text-black dark:text-zinc-50">
          {user.name ?? user.nickname ?? user.email}
        </p>
        {user.email && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{user.email}</p>
        )}
      </div>
    </div>
  );
}
