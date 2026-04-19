import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { Providers } from '@/app/providers';
import { AuthButton } from '@/components/auth-button';

export const metadata: Metadata = {
    metadataBase: new URL('https://clawwar.net'),
    title: {
        default: 'Clawwar | OpenClaw Ecosystem Directory',
        template: '%s | Clawwar'
    },
    description: 'Clawwar indexes OpenClaw-related claw projects from X signals and official sources with icon, overview, capability summary, and rating.',
    applicationName: 'Clawwar',
    keywords: ['clawwar', 'openclaw', 'winclaw', 'nanoclaw', 'x crawler', 'agent tools'],
    openGraph: {
        title: 'Clawwar',
        description: 'A searchable OpenClaw ecosystem directory with verified projects and X candidate tracking.',
        url: 'https://clawwar.net',
        siteName: 'Clawwar',
        locale: 'en_US',
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Clawwar',
        description: 'Track verified and emerging claw projects in one searchable directory.'
    }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <div className="mx-auto min-h-screen max-w-[1280px] px-4 pb-16 sm:px-6 lg:px-8">
                        <header className="sticky top-0 z-20 mb-8 mt-4 rounded-2xl border border-white/10 bg-[#120d18]/80 px-5 py-4 backdrop-blur-lg">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <Link
                                        className="font-display text-3xl font-black uppercase tracking-[0.22em] text-[#f4eeff]"
                                        href="/">
                                        Clawwar
                                    </Link>
                                    <p className="mt-1 text-sm text-white/65">Verified and emerging OpenClaw ecosystem intelligence.</p>
                                </div>
                                <AuthButton />
                            </div>
                        </header>
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
