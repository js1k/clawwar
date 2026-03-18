import { db } from "@/lib/db";
import { claws } from "@/data/claws";

export async function getRatingSnapshot(userId?: string) {
  const map = Object.fromEntries(
    claws.map((claw) => [
      claw.slug,
      {
        count: 0,
        average: 0,
        userScore: null as number | null
      }
    ])
  );

  try {
    const ratings = await db.clawRating.findMany({
      select: {
        clawSlug: true,
        score: true,
        userId: true
      }
    });

    for (const rating of ratings) {
      const entry = map[rating.clawSlug];

      if (!entry) {
        continue;
      }

      entry.average += rating.score;
      entry.count += 1;

      if (userId && rating.userId === userId) {
        entry.userScore = rating.score;
      }
    }

    for (const entry of Object.values(map)) {
      if (entry.count > 0) {
        entry.average = Number((entry.average / entry.count).toFixed(1));
      }
    }
  } catch {
    return map;
  }

  return map;
}
