"use client";

import { useMemo, useState } from "react";
import { ClawCard } from "@/components/claw-card";
import { ClawEntry } from "@/data/claws";

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
  const [query, setQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");

  const classes = useMemo(
    () => ["All", ...new Set(claws.map((claw) => claw.className))],
    [claws]
  );

  const filtered = useMemo(() => {
    const lowered = query.trim().toLowerCase();

    return claws.filter((claw) => {
      const matchesClass = selectedClass === "All" || claw.className === selectedClass;
      const matchesQuery =
        lowered.length === 0 ||
        claw.name.toLowerCase().includes(lowered) ||
        claw.species.toLowerCase().includes(lowered) ||
        claw.tags.some((tag) => tag.toLowerCase().includes(lowered));

      return matchesClass && matchesQuery;
    });
  }, [claws, query, selectedClass]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 rounded-[2rem] border border-bone/10 bg-[#1a120f] p-5 shadow-claw lg:grid-cols-[1fr_auto]">
        <input
          className="rounded-2xl border border-bone/10 bg-ink/60 px-4 py-3 text-sm text-bone outline-none transition placeholder:text-bone/30 focus:border-gold"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search tiger, talon, crustacean, fossil..."
          type="search"
          value={query}
        />
        <div className="flex flex-wrap gap-2">
          {classes.map((className) => (
            <button
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedClass === className
                  ? "bg-gold text-ink"
                  : "border border-bone/10 bg-bone/5 text-bone/70 hover:border-gold hover:text-gold"
              }`}
              key={className}
              onClick={() => setSelectedClass(className)}
              type="button"
            >
              {className}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {filtered.map((claw) => (
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
