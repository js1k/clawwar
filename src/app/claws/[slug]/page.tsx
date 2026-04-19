import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ClawIcon } from '@/components/claw-icon';
import { JsonLd } from '@/components/json-ld';
import { RatingPanel } from '@/components/rating-panel';
import { claws, clawsBySlug } from '@/data/claws';
import { getOptionalServerSession } from '@/lib/auth';
import { getRatingSnapshot } from '@/lib/ratings';

type ClawPageProps = {
    params: {
        slug: string;
    };
};

export function generateStaticParams() {
    return claws.map(claw => ({ slug: claw.slug }));
}

export async function generateMetadata({ params }: ClawPageProps): Promise<Metadata> {
    const claw = clawsBySlug[params.slug];

    if (!claw) {
        return {};
    }

    return {
        title: claw.name,
        description: claw.overview,
        openGraph: {
            title: claw.name,
            description: claw.overview
        }
    };
}

export default async function ClawDetailPage({ params }: ClawPageProps) {
    const claw = clawsBySlug[params.slug];

    if (!claw) {
        notFound();
    }

    const session = await getOptionalServerSession();
    const ratings = await getRatingSnapshot(session?.user?.id);
    const rating = ratings[claw.slug] ?? { average: 0, count: 0, userScore: null };

    return (
        <>
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'SoftwareApplication',
                    name: claw.name,
                    description: claw.overview,
                    applicationCategory: claw.category,
                    url: claw.homepage,
                    mainEntityOfPage: `https://clawwar.net/claws/${claw.slug}`
                }}
            />
            <main className="space-y-8">
                <Link
                    className="inline-flex text-sm font-semibold text-[#89d8ff] hover:text-[#f4eeff]"
                    href="/">
                    Back to directory
                </Link>
                <section className="grid gap-6 lg:grid-cols-[1.45fr_0.8fr]">
                    <div className="rounded-[2rem] border border-white/10 bg-[#140f17]/95 p-8 shadow-[0_18px_55px_rgba(5,3,10,0.38)]">
                        <div className="flex flex-wrap items-start gap-5">
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-3">
                                <ClawIcon
                                    name={claw.name}
                                    size={72}
                                    src={claw.icon}
                                />
                            </div>
                            <div className="max-w-3xl space-y-3">
                                <div className="flex flex-wrap gap-2">
                                    <p className="inline-flex rounded-full border border-white/12 bg-[#1a1421] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#89d8ff]">{claw.category}</p>
                                    <p
                                        className={`inline-flex rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${
                                            claw.tier === 'verified' ? 'border-[#6af2b0]/45 bg-[#113123]/60 text-[#6af2b0]' : 'border-[#ffc46b]/35 bg-[#3a2a12]/50 text-[#ffc46b]'
                                        }`}>
                                        {claw.tier}
                                    </p>
                                </div>
                                <h1 className="text-4xl font-black text-[#f4eeff] sm:text-5xl">{claw.name}</h1>
                                <p className="text-lg text-[#ffb3a8]">{claw.title}</p>
                                <p className="text-base leading-7 text-white/78">{claw.overview}</p>
                            </div>
                        </div>
                        <dl className="mt-7 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-[#120f18] p-4">
                                <dt className="text-xs uppercase tracking-[0.24em] text-white/45">Homepage</dt>
                                <dd className="mt-2 text-sm font-semibold text-[#f4eeff]">
                                    <a
                                        className="text-[#6af2b0] underline-offset-4 hover:underline"
                                        href={claw.homepage}
                                        rel="noreferrer"
                                        target="_blank">
                                        {claw.homepage}
                                    </a>
                                </dd>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-[#120f18] p-4">
                                <dt className="text-xs uppercase tracking-[0.24em] text-white/45">X Signal Count</dt>
                                <dd className="mt-2 text-xl font-black text-[#ffe07a]">{claw.signalCount}</dd>
                            </div>
                        </dl>
                        <div className="mt-7">
                            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Capabilities</p>
                            <div className="mt-3 space-y-2">
                                {claw.capabilities.map(capability => (
                                    <p
                                        className="text-sm leading-6 text-white/76"
                                        key={capability}>
                                        - {capability}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="mt-7 grid gap-5 sm:grid-cols-2">
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-white/45">References</p>
                                <div className="mt-3 flex flex-col gap-2">
                                    {claw.references.map(reference => (
                                        <a
                                            className="text-sm text-[#89d8ff] underline-offset-4 hover:underline"
                                            href={reference.href}
                                            key={reference.href}
                                            rel="noreferrer"
                                            target="_blank">
                                            {reference.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-white/45">X Signals</p>
                                <div className="mt-3 flex flex-col gap-2">
                                    {claw.xSignals.map(signal => (
                                        <a
                                            className="text-sm text-[#89d8ff] underline-offset-4 hover:underline"
                                            href={signal.href}
                                            key={signal.href}
                                            rel="noreferrer"
                                            target="_blank">
                                            {signal.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-7 flex flex-wrap gap-2">
                            {claw.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/70">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <RatingPanel
                            initialAverage={rating.average}
                            initialCount={rating.count}
                            initialUserScore={rating.userScore}
                            slug={claw.slug}
                        />
                        <div className="rounded-[1.8rem] border border-white/10 bg-[#140f17]/95 p-6">
                            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Status Legend</p>
                            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/74">
                                <li>
                                    <span className="font-semibold text-[#6af2b0]">verified</span>: has official site or docs reference.
                                </li>
                                <li>
                                    <span className="font-semibold text-[#ffc46b]">candidate</span>: discovered from X signal tracking and pending verification.
                                </li>
                                <li>Signal score reflects mention volume from crawl and manual curation priority.</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
