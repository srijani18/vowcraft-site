'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { appUrl } from '@/lib/env'

/**
 * Sticky header that condenses on scroll.
 *
 * The condense is subtle on purpose — a header that changes height mid-scroll
 * shifts the content under it, so this changes only its background, border, and
 * padding, never the layout height.
 */

const LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/docs', label: 'Docs' },
  { href: '/security', label: 'Security' },
  { href: '/contact', label: 'Contact' },
] as const

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-edge/20 bg-base/85 py-2.5 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent py-4',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Vowcraft home">
          <span className="glow-accent grid size-8 place-items-center rounded-xl bg-accent-fill text-accent-on">
            <i className="bi bi-soundwave text-base" aria-hidden />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">Vowcraft</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Main">
          {LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={clsx(
                  'rounded-lg px-3 py-1.5 text-sm transition-colors',
                  active ? 'text-accent' : 'text-ink-muted hover:bg-ink/5 hover:text-ink',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle compact />

          {/* Authentication lives in the application, not here. These are plain
              cross-origin links built from NEXT_PUBLIC_APP_URL, so this site never
              handles a credential. */}
          <a
            href={appUrl('/login')}
            className="hidden rounded-xl border border-edge/30 bg-surface-strong/70 px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-accent-fill/40 hover:bg-surface-strong sm:inline-flex"
          >
            Log in
          </a>

          <a
            href={appUrl('/signup')}
            className="glow-accent inline-flex items-center gap-1.5 rounded-xl bg-accent-fill px-3.5 py-2 text-sm font-semibold text-accent-on transition-all hover:brightness-110"
          >
            Sign up
            <i className="bi bi-arrow-right text-xs" aria-hidden />
          </a>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="grid size-9 place-items-center rounded-xl border border-edge/30 bg-surface-strong/70 text-ink lg:hidden"
          >
            <i className={clsx('bi', menuOpen ? 'bi-x-lg' : 'bi-list', 'text-lg')} aria-hidden />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-edge/20 bg-base/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6" aria-label="Mobile">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-2.5 text-sm text-ink-muted hover:bg-ink/5 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={appUrl('/login')}
              className="mt-1 rounded-xl border border-edge/30 px-3 py-2.5 text-center text-sm font-medium sm:hidden"
            >
              Log in
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
