import Link from 'next/link';
import { ClawIcon } from '@/components/claw-icon';
import { ClawEntry } from '@/data/claws';

type ClawCardProps = {
    claw: ClawEntry;
    average: number;
    count: number;
};

export function ClawCard({ claw, average, count }: ClawCardProps) {
    return (
        <article className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#140f17]/90 p-6 shadow-[0_16px_50px_rgba(5,3,10,0.35)] transition duration-300 hover:-translate-y-1 hover:border-[#6af2b0]/50">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(106,242,176,0.15),transparent_42%)]" />
            <div className="relative space-y-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
                            <ClawIcon
                                name={claw.name}
                                size={52}
                                src={claw.icon}
                            />
                        </div>
                        <div>
                            <div className="flex flex-wrap gap-2">
                                <p className="inline-flex rounded-full border border-white/10 bg-[#1a1421] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8cd5ff]">
                                    {claw.category}
                                </p>
                                <p
                                    className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                                        claw.tier === 'verified' ? 'border-[#6af2b0]/45 bg-[#113123]/60 text-[#6af2b0]' : 'border-[#ffc46b]/35 bg-[#3a2a12]/50 text-[#ffc46b]'
                                    }`}>
                                    {claw.tier}
                                </p>
                            </div>
                            <h2 className="mt-3 text-2xl font-black text-[#f4eeff]">{claw.name}</h2>
                            <p className="text-sm text-[#ffb3a8]">{claw.title}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/45">Score</p>
                        <p className="text-2xl font-black text-[#ffe07a]">{average || '0.0'}</p>
                        <p className="text-xs text-white/60">{count} votes</p>
                        <p className="mt-1 text-[11px] text-[#8cd5ff]/80">X {claw.signalCount}</p>
                    </div>
                </div>
                <p className="text-sm leading-6 text-white/78">{claw.overview}</p>
                <div className="space-y-2">
                    {claw.capabilities.slice(0, 3).map(capability => (
                        <p
                            className="text-sm text-white/65"
                            key={capability}>
                            - {capability}
                        </p>
                    ))}
                </div>
                <div className="flex flex-wrap gap-2">
                    {claw.tags.map(tag => (
                        <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/72">
                            {tag}
                        </span>
                    ))}
                </div>
                <Link
                    className="inline-flex rounded-full border border-[#6af2b0]/70 px-4 py-2 text-sm font-semibold text-[#6af2b0] transition hover:bg-[#6af2b0] hover:text-[#0d1f1a]"
                    href={`/claws/${claw.slug}`}>
                    View detail
                </Link>
            </div>
        </article>
    );
}
