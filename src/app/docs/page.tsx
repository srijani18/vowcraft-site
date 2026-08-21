import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal } from '@/components/site/Reveal'
import { Section } from '@/components/site/Section'
import { DOCS, DOC_GROUPS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Quickstart, core concepts, the guardrail catalogue, integrations, API reference, and self-hosting.',
}

export default function DocsIndexPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-edge/20">
        <span className="bloom -right-24 -top-28 h-64 w-[28rem]" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-14 sm:px-6 sm:pt-20">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-accent">Docs</p>
            <h1 className="display text-4xl sm:text-5xl">Everything, from one command up</h1>
            <p className="display-sub mt-5 max-w-2xl text-base text-ink-muted sm:text-lg">
              Start with the quickstart — it gets you a running instance with a seeded meeting in about a
              minute. The rest explains the parts you will want to change.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        {DOC_GROUPS.map((group, gi) => (
          <div key={group} className={gi > 0 ? 'mt-12' : undefined}>
            <Reveal>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">{group}</h2>
            </Reveal>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {DOCS.filter((doc) => doc.group === group).map((doc, i) => (
                <Reveal key={doc.slug} delay={i * 80}>
                  <Link
                    href={`/docs/${doc.slug}`}
                    className="panel panel-interactive block h-full rounded-2xl p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid size-9 place-items-center rounded-xl bg-accent-fill/15 text-accent">
                        <i className={`bi ${doc.icon}`} aria-hidden />
                      </span>
                      <span className="mono-num text-ink-faint">{doc.readMinutes} min</span>
                    </div>
                    <h3 className="mt-3 text-sm font-semibold">{doc.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{doc.summary}</p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                      Read
                      <i className="bi bi-arrow-right text-[10px]" aria-hidden />
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </Section>
    </>
  )
}
