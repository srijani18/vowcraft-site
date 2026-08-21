import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from '@/components/site/ContactForm'
import { Reveal } from '@/components/site/Reveal'
import { Section } from '@/components/site/Section'
import { appUrl } from '@/lib/env'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Ask about pricing, request a security review, or get help with your own instance.',
}

const ROUTES = [
  {
    icon: 'bi-terminal',
    title: 'Just want to try it?',
    body: 'You do not need to talk to anyone. One command gets you a running instance with a seeded meeting.',
    href: '/docs/quickstart',
    label: 'Read the quickstart',
    internal: true,
  },
  {
    icon: 'bi-shield-lock',
    title: 'Security review',
    body: 'Encryption at rest, the audit model, and what leaves your infrastructure — all documented before you ask.',
    href: '/security',
    label: 'Read the security page',
    internal: true,
  },
  {
    icon: 'bi-box-arrow-up-right',
    title: 'Already using it?',
    body: 'Your dashboard has the audit log and the health endpoint, which answer most operational questions faster than we can.',
    href: appUrl('/dashboard'),
    label: 'Open the app',
    internal: false,
  },
] as const

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-edge/20">
        <span className="bloom -left-16 -top-24 h-64 w-[26rem]" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-14 text-center sm:px-6 sm:pt-20">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-accent">Contact</p>
            <h1 className="display text-4xl sm:text-5xl">Talk to someone who built it</h1>
            <p className="display-sub mx-auto mt-5 max-w-xl text-base text-ink-muted sm:text-lg">
              No qualification form and no discovery call. Tell us what you are trying to do and we will
              answer the actual question.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <ContactForm />
          </div>

          <div className="space-y-3">
            <Reveal>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                You might not need us
              </h2>
            </Reveal>
            {ROUTES.map((route, i) => (
              <Reveal key={route.title} delay={i * 80}>
                {route.internal ? (
                  <Link href={route.href} className="panel panel-interactive block rounded-2xl p-4">
                    <RouteBody {...route} />
                  </Link>
                ) : (
                  <a href={route.href} className="panel panel-interactive block rounded-2xl p-4">
                    <RouteBody {...route} />
                  </a>
                )}
              </Reveal>
            ))}

            <Reveal delay={260} id="support">
              <div className="panel rounded-2xl p-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <i className="bi bi-life-preserver text-accent" aria-hidden />
                  Support expectations
                </h3>
                <ul className="mt-2.5 space-y-1.5 text-xs text-ink-muted">
                  <li className="flex gap-2">
                    <i className="bi bi-dot shrink-0" aria-hidden />
                    Self-hosted: community support, no SLA
                  </li>
                  <li className="flex gap-2">
                    <i className="bi bi-dot shrink-0" aria-hidden />
                    Team: email support, one business day
                  </li>
                  <li className="flex gap-2">
                    <i className="bi bi-dot shrink-0" aria-hidden />
                    Compliance: named contact and a contractual SLA
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  )
}

function RouteBody({ icon, title, body, label }: { icon: string; title: string; body: string; label: string }) {
  return (
    <>
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-fill/15 text-accent">
          <i className={`bi ${icon}`} aria-hidden />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">{body}</p>
        </div>
      </div>
      <p className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
        {label}
        <i className="bi bi-arrow-right text-[10px]" aria-hidden />
      </p>
    </>
  )
}
