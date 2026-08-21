import Link from 'next/link'
import { appUrl } from '@/lib/env'

const COLUMNS = [
  {
    heading: 'Product',
    links: [
      { href: '/features', label: 'Features' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/security', label: 'Security' },
      { href: '/features#latest', label: "What's new" },
    ],
  },
  {
    heading: 'Documentation',
    links: [
      { href: '/docs/quickstart', label: 'Quickstart' },
      { href: '/docs/concepts', label: 'Core concepts' },
      { href: '/docs/guardrails', label: 'Guardrails' },
      { href: '/docs/api', label: 'API reference' },
      { href: '/docs/self-hosting', label: 'Self-hosting' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/contact', label: 'Contact' },
      { href: '/contact#support', label: 'Support' },
      { href: '/security#disclosure', label: 'Responsible disclosure' },
    ],
  },
] as const

export function Footer() {
  return (
    <footer className="mt-24 border-t border-edge/20">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="glow-accent grid size-8 place-items-center rounded-xl bg-accent-fill text-accent-on">
                <i className="bi bi-soundwave text-base" aria-hidden />
              </span>
              <span className="text-[15px] font-semibold tracking-tight">Vowcraft</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
              Conversations become approved, executed outcomes — with a record of every decision
              along the way.
            </p>
            <a
              href={appUrl('/dashboard')}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              Open the app
              <i className="bi bi-box-arrow-up-right text-[10px]" aria-hidden />
            </a>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                {column.heading}
              </h2>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-edge/20 pt-6 text-xs text-ink-faint">
          <p>© {new Date().getFullYear()} Vowcraft</p>
          <p className="flex items-center gap-1.5">
            <i className="bi bi-shield-check text-ok" aria-hidden />
            Mock mode by default — nothing executes until you approve it
          </p>
          <p className="ml-auto flex items-center gap-1.5">
            <i className="bi bi-hdd text-ink-faint" aria-hidden />
            Self-hostable, fully offline
          </p>
        </div>
      </div>
    </footer>
  )
}
