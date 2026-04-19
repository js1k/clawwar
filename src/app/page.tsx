import { ArenaGrid } from '@/components/arena-grid';
import { JsonLd } from '@/components/json-ld';
import { claws } from '@/data/claws';
import xCandidates from '@/data/x-claw-candidates.json';
import { getOptionalServerSession } from '@/lib/auth';
import { getRatingSnapshot } from '@/lib/ratings';

type XClawCandidate = {
    slug: string;
    name: string;
    mentions: number;
    xPosts?: string[];
};

type XClawPayload = {
    generatedAt: string | null;
    query: string | null;
    totalTweets: number;
    candidates: XClawCandidate[];
};

export default async function HomePage() {
    const xPayload = xCandidates as XClawPayload;
    const session = await getOptionalServerSession();
    const ratings = await getRatingSnapshot(session?.user?.id);
    const verifiedCount = claws.filter(item => item.tier === 'verified').length;
    const candidateCount = claws.filter(item => item.tier === 'candidate').length;
    const xCandidateCount = Array.isArray(xPayload.candidates) ? xPayload.candidates.length : 0;
    const xSyncedLabel = xPayload.generatedAt ? new Date(xPayload.generatedAt).toLocaleDateString('en-US') : 'Not synced';
    const xFeed = Array.isArray(xPayload.candidates) ? xPayload.candidates.slice(0, 12) : [];

    return (
        <>
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'CollectionPage',
                    name: 'Clawwar',
                    description: 'OpenClaw ecosystem directory with verified entries and X candidate tracking.',
                    url: 'https://clawwar.net'
                }}
            />
            <main className="space-y-14">
                <section className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#0f0b16] px-6 py-10 shadow-[0_30px_70px_rgba(3,2,8,0.45)] sm:px-10">
                    <div className="pointer-events-none absolute -left-16 top-0 h-60 w-60 rounded-full bg-[#2f4eff]/30 blur-3xl" />
                    <div className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-[#6af2b0]/25 blur-3xl" />
                    <div className="relative max-w-4xl space-y-6">
                        <p className="text-sm uppercase tracking-[0.36em] text-[#8cd5ff]">X crawl / verification / ranking</p>
                        <h1 className="text-5xl font-black uppercase leading-none text-[#f4eeff] sm:text-7xl">We now track dozens of claw projects, not just OpenClaw.</h1>
                        <p className="max-w-3xl text-base leading-7 text-white/78 sm:text-lg">
                            This directory combines verified claw projects with X-discovered candidates. Every entry includes icon, overview, capability summary, source links, and community score.
                        </p>
                    </div>
                    <div className="relative mt-10 grid gap-4 sm:grid-cols-4">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <p className="text-xs uppercase tracking-[0.26em] text-white/45">Total</p>
                            <p className="mt-2 text-4xl font-black text-[#ffe07a]">{claws.length}</p>
                        </div>
                        <div className="rounded-2xl border border-[#6af2b0]/30 bg-[#0f241b]/55 p-5">
                            <p className="text-xs uppercase tracking-[0.26em] text-[#6af2b0]/80">Verified</p>
                            <p className="mt-2 text-4xl font-black text-[#6af2b0]">{verifiedCount}</p>
                        </div>
                        <div className="rounded-2xl border border-[#ffc46b]/30 bg-[#3c2a12]/45 p-5">
                            <p className="text-xs uppercase tracking-[0.26em] text-[#ffc46b]/80">Candidates</p>
                            <p className="mt-2 text-4xl font-black text-[#ffc46b]">{candidateCount}</p>
                        </div>
                        <div className="rounded-2xl border border-[#8cd5ff]/35 bg-[#142433]/50 p-5">
                            <p className="text-xs uppercase tracking-[0.26em] text-[#8cd5ff]/80">X Feed</p>
                            <p className="mt-2 text-4xl font-black text-[#8cd5ff]">{xCandidateCount}</p>
                            <p className="mt-1 text-xs text-white/60">Synced: {xSyncedLabel}</p>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.32em] text-[#8cd5ff]">Directory</p>
                            <h2 className="text-3xl font-black text-[#f4eeff] sm:text-4xl">OpenClaw-related project map</h2>
                        </div>
                        <p className="max-w-xl text-sm leading-6 text-white/65">
                            Filter by category and keyword to inspect verified entries versus X candidates. Candidate entries are kept visible so new claw names can be reviewed quickly.
                        </p>
                    </div>
                    <ArenaGrid
                        claws={claws}
                        ratings={ratings}
                    />
                </section>

                {xFeed.length > 0 ? (
                    <section className="space-y-6">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.32em] text-[#8cd5ff]">Raw X feed</p>
                                <h2 className="text-3xl font-black text-[#f4eeff] sm:text-4xl">Latest discovered names</h2>
                            </div>
                            <p className="max-w-xl text-sm leading-6 text-white/65">
                                These are raw candidates from the X crawler. Promote high-signal names into verified entries after checking docs, repo, or product pages.
                            </p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {xFeed.map(candidate => (
                                <article
                                    className="rounded-2xl border border-white/10 bg-[#140f17]/90 p-5"
                                    key={candidate.slug}>
                                    <p className="text-lg font-black text-[#f4eeff]">{candidate.name}</p>
                                    <p className="mt-1 text-sm text-white/70">{candidate.mentions} mentions</p>
                                    <a
                                        className="mt-3 inline-flex text-sm text-[#89d8ff] underline-offset-4 hover:underline"
                                        href={candidate.xPosts?.[0] ?? `https://x.com/search?q=${candidate.slug}&f=live`}
                                        rel="noreferrer"
                                        target="_blank">
                                        Open sample X post
                                    </a>
                                </article>
                            ))}
                        </div>
                    </section>
                ) : null}
            </main>
        </>
    );
}
