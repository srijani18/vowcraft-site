import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { THEME_INIT_SCRIPT } from '@/components/ui/ThemeToggle'
import { siteUrl } from '@/lib/env'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: 'Vowcraft — conversations become executed outcomes',
    template: '%s — Vowcraft',
  },
  description:
    'Vowcraft transcribes your meetings, extracts what was actually committed to, and executes it in ' +
    'Calendar, Notion, Gmail and Slack — but only after you approve, and always on the record.',
  openGraph: {
    type: 'website',
    siteName: 'Vowcraft',
    title: 'Vowcraft — conversations become executed outcomes',
    description:
      'Grounded action-item extraction, sixteen server-side guardrails, and an append-only audit trail. ' +
      'The agent proposes; you decide.',
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#EEF4F5' },
    { media: '(prefers-color-scheme: dark)', color: '#0E2126' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Applies the stored theme before first paint — inline and synchronous, so
            there is no flash of the wrong theme. Shares its storage key with the
            application, so a preference set here carries across. */}
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent-fill focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-on"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
