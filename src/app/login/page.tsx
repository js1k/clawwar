import type { Metadata } from "next";
import { AuthButton } from "@/components/auth-button";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in with Google to rate claws on Clawwar."
};

export default function LoginPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center">
      <section className="w-full max-w-lg rounded-[2.2rem] border border-bone/10 bg-[#1a120f] p-8 text-center shadow-claw">
        <p className="text-sm uppercase tracking-[0.35em] text-gold">Google auth</p>
        <h1 className="mt-4 text-4xl font-black text-bone">Enter the arena</h1>
        <p className="mt-4 text-base leading-7 text-bone/70">
          Voting is restricted to signed-in users so each account can keep a single updatable score per claw.
        </p>
        <div className="mt-8 flex justify-center">
          <AuthButton />
        </div>
      </section>
    </main>
  );
}
