import type { Metadata } from 'next';
import { AuthButton } from '@/components/auth-button';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Sign in with Google to rate claw ecosystem projects on Clawwar.'
};

export default function LoginPage() {
    return (
        <main className="flex min-h-[70vh] items-center justify-center">
            <section className="w-full max-w-lg rounded-[2.2rem] border border-white/10 bg-[#140f17]/95 p-8 text-center shadow-[0_18px_55px_rgba(3,2,8,0.38)]">
                <p className="text-sm uppercase tracking-[0.35em] text-[#8cd5ff]">Google auth</p>
                <h1 className="mt-4 text-4xl font-black text-[#f4eeff]">Enter the arena</h1>
                <p className="mt-4 text-base leading-7 text-white/70">Voting is restricted to signed-in users so each account can keep a single updatable score per claw project.</p>
                <div className="mt-8 flex justify-center">
                    <AuthButton />
                </div>
            </section>
        </main>
    );
}
