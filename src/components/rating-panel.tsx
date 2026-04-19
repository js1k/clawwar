'use client';

import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';

type RatingPanelProps = {
    slug: string;
    initialAverage: number;
    initialCount: number;
    initialUserScore: number | null;
};

export function RatingPanel({ slug, initialAverage, initialCount, initialUserScore }: RatingPanelProps) {
    const { data: session } = useSession();
    const [average, setAverage] = useState(initialAverage);
    const [count, setCount] = useState(initialCount);
    const [userScore, setUserScore] = useState<number | null>(initialUserScore);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitScore = async (score: number) => {
        if (!session?.user) {
            signIn('google');
            return;
        }

        setPending(true);
        setError(null);

        try {
            const response = await fetch('/api/ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ slug, score })
            });

            if (!response.ok) {
                throw new Error('Rating failed');
            }

            const next = (await response.json()) as {
                average: number;
                count: number;
                userScore: number | null;
            };

            setAverage(next.average);
            setCount(next.count);
            setUserScore(next.userScore);
        } catch (submissionError) {
            setError(submissionError instanceof Error ? submissionError.message : 'Rating failed');
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="rounded-3xl border border-white/10 bg-[#140f17]/95 p-5 shadow-[0_16px_45px_rgba(3,2,8,0.35)] backdrop-blur">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/45">Community rating</p>
                    <p className="text-3xl font-black text-[#f4eeff]">{average || '0.0'}</p>
                </div>
                <p className="text-sm text-white/62">{count} votes</p>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2">
                {Array.from({ length: 10 }, (_, index) => {
                    const score = index + 1;
                    const selected = userScore === score;

                    return (
                        <button
                            key={score}
                            className={`rounded-2xl border px-3 py-2 text-sm font-semibold transition ${
                                selected ? 'border-[#ffe07a] bg-[#ffe07a] text-[#2a2208]' : 'border-white/10 bg-white/5 text-white/88 hover:border-[#89d8ff] hover:text-[#89d8ff]'
                            }`}
                            disabled={pending}
                            onClick={() => submitScore(score)}
                            type="button">
                            {score}
                        </button>
                    );
                })}
            </div>
            <p className="mt-4 text-sm text-white/60">{session?.user ? 'Signed-in users can update their score at any time.' : 'Sign in with Google to vote.'}</p>
            {error ? <p className="mt-2 text-sm text-[#ff8f84]">{error}</p> : null}
        </div>
    );
}
