import { getServerSession } from "next-auth";
import { ArenaGrid } from "@/components/arena-grid";
import { JsonLd } from "@/components/json-ld";
import { claws } from "@/data/claws";
import { authOptions } from "@/lib/auth";
import { getRatingSnapshot } from "@/lib/ratings";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const ratings = await getRatingSnapshot(session?.user?.id);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Clawwar",
          description: "A searchable archive of animal and fossil claws with community rankings.",
          url: "https://clawwar.example.com"
        }}
      />
      <main className="space-y-14">
        <section className="overflow-hidden rounded-[2.5rem] border border-bone/10 bg-battle-grid bg-[size:48px_48px] px-6 py-10 shadow-claw sm:px-10">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-gold">Claw index / rank / vote</p>
            <h1 className="text-5xl font-black uppercase leading-none text-bone sm:text-7xl">
              Put every legendary claw into one arena.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-bone/75 sm:text-lg">
              Clawwar packages the internet&apos;s most iconic claws into SEO-ready pages, each with combat-style
              summaries, source links, and a live rating system. Sign in with Google and score from 1 to 10.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-bone/10 bg-ink/60 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-bone/40">Indexed claws</p>
              <p className="mt-2 text-4xl font-black text-gold">{claws.length}</p>
            </div>
            <div className="rounded-3xl border border-bone/10 bg-ink/60 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-bone/40">Classes</p>
              <p className="mt-2 text-4xl font-black text-gold">5</p>
            </div>
            <div className="rounded-3xl border border-bone/10 bg-ink/60 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-bone/40">Voting</p>
              <p className="mt-2 text-4xl font-black text-gold">Google</p>
            </div>
          </div>
        </section>
        <section className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-gold">Arena roster</p>
              <h2 className="text-3xl font-black text-bone sm:text-4xl">Current claw archive</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-bone/60">
              This starter dataset is curated and structured to expand later with scraping, moderation, or CMS imports.
            </p>
          </div>
          <ArenaGrid claws={claws} ratings={ratings} />
        </section>
      </main>
    </>
  );
}
