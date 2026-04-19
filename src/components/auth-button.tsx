'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export function AuthButton() {
    const { data: session } = useSession();

    if (session?.user) {
        return (
            <button
                className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:border-[#6af2b0] hover:text-[#6af2b0]"
                onClick={() => signOut()}
                type="button">
                {session.user.name ?? 'Arena User'} / Sign out
            </button>
        );
    }

    return (
        <button
            className="rounded-full bg-[#6af2b0] px-4 py-2 text-sm font-semibold text-[#0d1f1a] transition hover:bg-[#9af8c9]"
            onClick={() => signIn('google')}
            type="button">
            Sign in with Google
        </button>
    );
}
