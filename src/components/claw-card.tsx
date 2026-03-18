import Image from "next/image";
import Link from "next/link";
import { ClawEntry } from "@/data/claws";

type ClawCardProps = {
  claw: ClawEntry;
  average: number;
  count: number;
};

export function ClawCard({ claw, average, count }: ClawCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-bone/10 bg-[#1a120f] shadow-claw transition hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <Image
          alt={claw.imageAlt}
          className="object-cover transition duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          src={claw.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a120f] via-transparent to-transparent" />
        <div className="absolute left-5 top-5 rounded-full border border-bone/10 bg-ink/80 px-3 py-1 text-xs uppercase tracking-[0.25em] text-gold">
          {claw.className}
        </div>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-bone">{claw.name}</h2>
            <p className="text-sm text-rust">{claw.title}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.25em] text-bone/40">Score</p>
            <p className="text-2xl font-black text-gold">{average || "0.0"}</p>
            <p className="text-xs text-bone/50">{count} votes</p>
          </div>
        </div>
        <p className="text-sm leading-6 text-bone/75">{claw.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {claw.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-bone/10 bg-bone/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-bone/70"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          className="inline-flex rounded-full border border-gold px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold hover:text-ink"
          href={`/claws/${claw.slug}`}
        >
          Inspect & rate
        </Link>
      </div>
    </article>
  );
}
