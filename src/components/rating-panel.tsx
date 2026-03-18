"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

type RatingPanelProps = {
  slug: string;
  initialAverage: number;
  initialCount: number;
  initialUserScore: number | null;
};

export function RatingPanel({
  slug,
  initialAverage,
  initialCount,
  initialUserScore
}: RatingPanelProps) {
  const { data: session } = useSession();
  const [average, setAverage] = useState(initialAverage);
  const [count, setCount] = useState(initialCount);
  const [userScore, setUserScore] = useState<number | null>(initialUserScore);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitScore = async (score: number) => {
    if (!session?.user) {
      signIn("google");
      return;
    }

    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ slug, score })
      });

      if (!response.ok) {
        throw new Error("Rating failed");
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
      setError(submissionError instanceof Error ? submissionError.message : "Rating failed");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="rounded-3xl border border-bone/10 bg-ink/70 p-5 shadow-claw backdrop-blur">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-bone/50">Arena rating</p>
          <p className="text-3xl font-black text-bone">{average || "0.0"}</p>
        </div>
        <p className="text-sm text-bone/65">{count} votes</p>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {Array.from({ length: 10 }, (_, index) => {
          const score = index + 1;
          const selected = userScore === score;

          return (
            <button
              key={score}
              className={`rounded-2xl border px-3 py-2 text-sm font-semibold transition ${
                selected
                  ? "border-gold bg-gold text-ink"
                  : "border-bone/10 bg-bone/5 text-bone hover:border-rust hover:text-gold"
              }`}
              disabled={pending}
              onClick={() => submitScore(score)}
              type="button"
            >
              {score}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-bone/60">
        {session?.user ? "Signed-in users can update their score at any time." : "Sign in with Google to vote."}
      </p>
      {error ? <p className="mt-2 text-sm text-rust">{error}</p> : null}
    </div>
  );
}
