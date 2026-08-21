import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Reveal } from '@/components/site/Reveal'
import { DOCS, findDoc, type DocSection } from '@/lib/content'

export function generateStaticParams() {
  return DOCS.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = findDoc(slug)
  if (!doc) return { title: 'Not found' }
  return { title: doc.title, description: doc.summary }
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = findDoc(slug)
  if (!doc) notFound()

  const index = DOCS.findIndex((d) => d.slug === doc.slug)
  const previous = index > 0 ? DOCS[index - 1] : null
  const next = index < DOCS.length - 1 ? DOCS[index + 1] : null

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
        {/* sidebar: sticky on desktop, a plain list on mobile — a collapsed
            accordion above the content is more taps than it saves */}
        <nav className="mb-8 lg:sticky lg:top-24 lg:mb-0 lg:self-start" aria-label="Documentation">
          <Link
            href="/docs"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-accent"
          >
            <i className="bi bi-arrow-left text-[10px]" aria-hidden />
            All docs
          </Link>
          <ul className="space-y-0.5">
            {DOCS.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={`/docs/${entry.slug}`}
                  aria-current={entry.slug === doc.slug ? 'page' : undefined}
                  className={
                    entry.slug === doc.slug
                      ? 'flex items-center gap-2 rounded-lg bg-accent-fill/15 px-2.5 py-1.5 text-sm font-medium text-accent shadow-[inset_2px_0_0_0_rgb(var(--accent-fill))]'
                      : 'flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-ink-muted hover:bg-ink/5 hover:text-ink'
                  }
                >
                  <i className={`bi ${entry.icon} shrink-0 text-xs`} aria-hidden />
                  <span className="truncate">{entry.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <article className="min-w-0">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">{doc.group}</p>
            <h1 className="display mt-2 text-3xl sm:text-4xl">{doc.title}</h1>
            <p className="display-sub mt-4 text-base text-ink-muted">{doc.summary}</p>
            <p className="mono-num mt-3 text-ink-faint">
              <i className="bi bi-clock mr-1.5" aria-hidden />
              {doc.readMinutes} minute read
            </p>
          </Reveal>

          <div className="mt-10 space-y-10">
            {doc.sections.map((section, i) => (
              <Reveal key={section.heading} delay={Math.min(i * 60, 240)}>
                <SectionBlock section={section} />
              </Reveal>
            ))}
          </div>

          <nav className="mt-14 flex flex-wrap gap-3 border-t border-edge/20 pt-6" aria-label="Pagination">
            {previous && (
              <Link href={`/docs/${previous.slug}`} className="panel panel-interactive flex-1 rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-wider text-ink-faint">Previous</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-medium">
                  <i className="bi bi-arrow-left text-xs text-accent" aria-hidden />
                  {previous.title}
                </p>
              </Link>
            )}
            {next && (
              <Link href={`/docs/${next.slug}`} className="panel panel-interactive flex-1 rounded-xl p-4 text-right">
                <p className="text-[10px] uppercase tracking-wider text-ink-faint">Next</p>
                <p className="mt-1 flex items-center justify-end gap-1.5 text-sm font-medium">
                  {next.title}
                  <i className="bi bi-arrow-right text-xs text-accent" aria-hidden />
                </p>
              </Link>
            )}
          </nav>
        </article>
      </div>
    </div>
  )
}

function SectionBlock({ section }: { section: DocSection }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>

      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-3 text-sm leading-relaxed text-ink-muted">
          {paragraph}
        </p>
      ))}

      {section.list && (
        <ul className="mt-4 space-y-2">
          {section.list.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm text-ink-muted">
              <i className="bi bi-check2 mt-1 shrink-0 text-ok" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      )}

      {section.table && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-edge/25">
                {section.table.head.map((cell) => (
                  <th
                    key={cell}
                    className="py-2 pr-4 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-faint"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row) => (
                <tr key={row.join('|')} className="border-b border-edge/10">
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className={
                        i === 0
                          ? 'py-2 pr-4 font-mono text-[12px] text-ink'
                          : 'py-2 pr-4 text-ink-muted'
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.code && (
        <div className="mt-4 overflow-hidden rounded-xl border border-edge/25">
          <div className="flex items-center gap-2 border-b border-edge/20 bg-surface-strong/50 px-3 py-1.5">
            <span className="mono-num text-ink-faint">{section.code.language}</span>
          </div>
          <pre className="overflow-x-auto bg-base/70 p-4 font-mono text-[12px] leading-relaxed text-ink-muted">
            <code>{section.code.content}</code>
          </pre>
        </div>
      )}

      {section.callout && (
        <p
          className={
            section.callout.tone === 'warn'
              ? 'mt-4 flex gap-2.5 rounded-xl border border-warn/40 bg-warn/[0.08] px-4 py-3 text-sm leading-relaxed text-warn'
              : 'mt-4 flex gap-2.5 rounded-xl border border-accent/35 bg-accent-fill/[0.08] px-4 py-3 text-sm leading-relaxed text-ink-muted'
          }
        >
          <i
            className={`bi ${section.callout.tone === 'warn' ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill'} mt-0.5 shrink-0 ${section.callout.tone === 'warn' ? '' : 'text-accent'}`}
            aria-hidden
          />
          <span>{section.callout.text}</span>
        </p>
      )}
    </section>
  )
}
