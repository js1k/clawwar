import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, hasAuthConfig } from "@/lib/auth";
import { clawsBySlug } from "@/data/claws";
import { db } from "@/lib/db";
import { getRatingSnapshot } from "@/lib/ratings";

export async function POST(request: Request) {
  if (!hasAuthConfig()) {
    return NextResponse.json({ message: "Auth/database configuration is incomplete" }, { status: 503 });
  }

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { slug?: string; score?: unknown };
  const slug = body.slug?.trim();
  const rawScore = body.score;

  if (!slug || !clawsBySlug[slug]) {
    return NextResponse.json({ message: "Invalid claw slug" }, { status: 400 });
  }

  if (typeof rawScore !== "number" || !Number.isInteger(rawScore) || rawScore < 1 || rawScore > 10) {
    return NextResponse.json({ message: "Score must be an integer from 1 to 10" }, { status: 400 });
  }

  const score = rawScore;

  try {
    await db.clawRating.upsert({
      where: {
        clawSlug_userId: {
          clawSlug: slug,
          userId: session.user.id
        }
      },
      update: {
        score
      },
      create: {
        clawSlug: slug,
        score,
        userId: session.user.id
      }
    });

    const snapshot = await getRatingSnapshot(session.user.id);
    return NextResponse.json(snapshot[slug]);
  } catch {
    return NextResponse.json({ message: "Database is unavailable" }, { status: 503 });
  }
}
