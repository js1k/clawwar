import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { JsonLd } from "@/components/json-ld";
import { RatingPanel } from "@/components/rating-panel";
import { claws, clawsBySlug } from "@/data/claws";
import { authOptions } from "@/lib/auth";
import { getRatingSnapshot } from "@/lib/ratings";

type ClawPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return claws.map((claw) => ({ slug: claw.slug }));
}

export async function generateMetadata({ params }: ClawPageProps): Promise<Metadata> {
  const claw = clawsBySlug[params.slug];

  if (!claw) {
    return {};
  }

  return {
    title: claw.name,
    description: claw.summary,
    openGraph: {
      title: claw.name,
      description: claw.summary,
      images: [claw.image]
    }
  };
}

export default async function ClawDetailPage({ params }: ClawPageProps) {
  const claw = clawsBySlug[params.slug];

  if (!claw) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const ratings = await getRatingSnapshot(session?.user?.id);
  const rating = ratings[claw.slug] ?? { average: 0, count: 0, userScore: null };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: claw.name,
          description: claw.summary,
          image: claw.image,
          author: {
            "@type": "Organization",
            name: "Clawwar"
          },
          mainEntityOfPage: `https://clawwar.example.com/claws/${claw.slug}`
        }}
      />
      <main className="space-y-8">
        <Link className="inline-flex text-sm font-semibold text-gold hover:text-bone" href="/">
          Back to arena
        </Link>
        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="overflow-hidden rounded-[2.2rem] border border-bone/10 bg-[#1a120f] shadow-claw">
            <div className="relative h-[320px]">
              <Image alt={claw.imageAlt} className="object-cover" fill priority sizes="100vw" src={claw.image} />
            </div>
            <div className="space-y-6 p-8">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.35em] text-gold">{claw.className}</p>
                <h1 className="text-4xl font-black text-bone sm:text-5xl">{claw.name}</h1>
                <p className="text-lg text-rust">{claw.title}</p>
                <p className="max-w-3xl text-base leading-7 text-bone/75">{claw.summary}</p>
              </div>
              <dl className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-bone/10 bg-ink/50 p-4">
                  <dt className="text-xs uppercase tracking-[0.25em] text-bone/40">Species</dt>
                  <dd className="mt-2 text-lg font-semibold text-bone">{claw.species}</dd>
                </div>
                <div className="rounded-3xl border border-bone/10 bg-ink/50 p-4">
                  <dt className="text-xs uppercase tracking-[0.25em] text-bone/40">Habitat</dt>
                  <dd className="mt-2 text-lg font-semibold text-bone">{claw.habitat}</dd>
                </div>
                <div className="rounded-3xl border border-bone/10 bg-ink/50 p-4">
                  <dt className="text-xs uppercase tracking-[0.25em] text-bone/40">Battle axis</dt>
                  <dd className="mt-2 text-lg font-semibold text-bone">{claw.scoreWeight}</dd>
                </div>
                <div className="rounded-3xl border border-bone/10 bg-ink/50 p-4">
                  <dt className="text-xs uppercase tracking-[0.25em] text-bone/40">Combat read</dt>
                  <dd className="mt-2 text-lg font-semibold text-bone">{claw.style}</dd>
                </div>
              </dl>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-bone/40">Strengths</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {claw.strengths.map((strength) => (
                    <span
                      key={strength}
                      className="rounded-full border border-bone/10 bg-bone/5 px-3 py-1 text-sm text-bone/80"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-bone/40">Sources</p>
                <div className="mt-3 flex flex-col gap-2">
                  {claw.references.map((reference) => (
                    <a
                      className="text-sm text-gold underline-offset-4 hover:underline"
                      href={reference.href}
                      key={reference.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {reference.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <RatingPanel
              initialAverage={rating.average}
              initialCount={rating.count}
              initialUserScore={rating.userScore}
              slug={claw.slug}
            />
            <div className="rounded-[2rem] border border-bone/10 bg-[#1a120f] p-6 shadow-claw">
              <p className="text-xs uppercase tracking-[0.3em] text-bone/40">Why this page ranks</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-bone/70">
                <li>Focused keyword target around the exact claw and species.</li>
                <li>Static generation for clean crawlable detail URLs.</li>
                <li>Structured data for collection page and article detail page.</li>
                <li>Original summary copy instead of thin list pages.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
