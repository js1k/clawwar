import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { AuthButton } from "@/components/auth-button";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://clawwar.example.com"),
  title: {
    default: "Clawwar | Rank the Internet's Sharpest Claws",
    template: "%s | Clawwar"
  },
  description:
    "Clawwar is a claw index and ranking arena: compare tigers, eagles, bears, lobsters, fossil predators and more, then vote with a Google account.",
  applicationName: "Clawwar",
  keywords: ["clawwar", "animal claws", "talons", "ratings", "wildlife SEO"],
  openGraph: {
    title: "Clawwar",
    description: "A searchable claw archive with rankings, detail pages, and community voting.",
    url: "https://clawwar.example.com",
    siteName: "Clawwar",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Clawwar",
    description: "Compare the world's most iconic claws and cast your score."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="mx-auto min-h-screen max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
            <header className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Link className="text-3xl font-black uppercase tracking-[0.25em] text-bone" href="/">
                  Clawwar
                </Link>
                <p className="mt-1 text-sm text-bone/60">The ranking arena for nature&apos;s sharpest hardware.</p>
              </div>
              <AuthButton />
            </header>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
