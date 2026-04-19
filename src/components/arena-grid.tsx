'use client';

import { useMemo, useState } from 'react';
import { ClawCard } from '@/components/claw-card';
import { ClawEntry } from '@/data/claws';

type ArenaGridProps = {
    claws: ClawEntry[];
    ratings: Record<
        string,
        {
            average: number;
            count: number;
        }
    >;
};

export function ArenaGrid({ claws, ratings }: ArenaGridProps) {
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTier, setSelectedTier] = useState<'all' | 'verified' | 'candidate'>('all');

    const categories = useMemo(() => ['All', ...new Set(claws.map(claw => claw.category))], [claws]);

    const filtered = useMemo(() => {
        const lowered = query.trim().toLowerCase();

        return claws
            .filter(claw => {
                const matchesCategory = selectedCategory === 'All' || claw.category === selectedCategory;
                const matchesTier = selectedTier === 'all' || claw.tier === selectedTier;
                const matchesQuery =
                    lowered.length === 0 ||
                    claw.name.toLowerCase().includes(lowered) ||
                    claw.title.toLowerCase().includes(lowered) ||
                    claw.overview.toLowerCase().includes(lowered) ||
                    claw.tags.some(tag => tag.toLowerCase().includes(lowered));

                return matchesCategory && matchesTier && matchesQuery;
            })
            .sort((a, b) => {
                if (a.tier !== b.tier) {
                    return a.tier === 'verified' ? -1 : 1;
                }

                return b.signalCount - a.signalCount;
            });
    }, [claws, query, selectedCategory, selectedTier]);

    return (
        <div className="space-y-6">
            <div className="grid gap-4 rounded-[1.8rem] border border-white/10 bg-[#140f17]/90 p-5 shadow-[0_16px_45px_rgba(3,2,8,0.35)] lg:grid-cols-[1fr_auto]">
                <input
                    className="rounded-2xl border border-white/12 bg-[#0f0b16] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#6af2b0]"
                    onChange={event => setQuery(event.target.value)}
                    placeholder="Search openclaw, winclaw, security, edge, desktop..."
                    type="search"
                    value={query}
                />
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            selectedTier === 'all' ? 'bg-[#8cd5ff] text-[#0b1726]' : 'border border-white/12 bg-white/5 text-white/75 hover:border-[#8cd5ff] hover:text-[#8cd5ff]'
                        }`}
                        onClick={() => setSelectedTier('all')}
                        type="button">
                        All
                    </button>
                    <button
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            selectedTier === 'verified' ? 'bg-[#6af2b0] text-[#0d1f1a]' : 'border border-white/12 bg-white/5 text-white/75 hover:border-[#6af2b0] hover:text-[#6af2b0]'
                        }`}
                        onClick={() => setSelectedTier('verified')}
                        type="button">
                        Verified
                    </button>
                    <button
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            selectedTier === 'candidate' ? 'bg-[#ffc46b] text-[#2a1b06]' : 'border border-white/12 bg-white/5 text-white/75 hover:border-[#ffc46b] hover:text-[#ffc46b]'
                        }`}
                        onClick={() => setSelectedTier('candidate')}
                        type="button">
                        Candidate
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                    <button
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            selectedCategory === category ? 'bg-[#ffe07a] text-[#2a2208]' : 'border border-white/12 bg-white/5 text-white/72 hover:border-[#ffe07a] hover:text-[#ffe07a]'
                        }`}
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        type="button">
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {filtered.map(claw => (
                    <ClawCard
                        average={ratings[claw.slug]?.average ?? 0}
                        claw={claw}
                        count={ratings[claw.slug]?.count ?? 0}
                        key={claw.slug}
                    />
                ))}
            </div>
        </div>
    );
}
