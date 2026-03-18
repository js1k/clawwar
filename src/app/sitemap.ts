import type { MetadataRoute } from "next";
import { claws } from "@/data/claws";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://clawwar.example.com",
      changeFrequency: "weekly",
      priority: 1
    },
    ...claws.map((claw) => ({
      url: `https://clawwar.example.com/claws/${claw.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8
    }))
  ];
}
