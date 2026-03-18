"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButton() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <button
        className="rounded-full border border-bone/20 bg-bone/10 px-4 py-2 text-sm font-semibold text-bone transition hover:border-gold hover:text-gold"
        onClick={() => signOut()}
        type="button"
      >
        {session.user.name ?? "Arena User"} / Sign out
      </button>
    );
  }

  return (
    <button
      className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition hover:bg-bone"
      onClick={() => signIn("google")}
      type="button"
    >
      Sign in with Google
    </button>
  );
}
