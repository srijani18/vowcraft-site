import type { Metadata } from 'next'
import Link from 'next/link'
import { CTA } from '@/components/site/CTA'
import { Reveal } from '@/components/site/Reveal'
import { Section, SectionHeading } from '@/components/site/Section'
import { ActionItemsMock } from '@/components/mockups/ActionItemsMock'
import { ExecuteMock } from '@/components/mockups/ExecuteMock'
import { PILLARS, ROADMAP } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Grounded extraction, three risk tiers, seventeen server-side guardrails, five integrations, and an ' +
    'append-only audit trail. What ships today and what is next.',
}

const RISK_TIERS = [
  {
    tier: 'Low',
    tone: 'ok',
    icon: 'bi-shield-check',
    examples: ['A drafted email nobody has sent', 'A private note', 'A hold on your own calendar'],
    gate: 'Can auto-execute — but only if you opt in, and only at high confidence.',
  },
  {
    tier: 'Medium',
    tone: 'warn',
    icon: 'bi-shield-exclamation',
    examples: ['A meeting with colleagues', 'A task assigned to someone else', 'An internal message'],
    gate: 'Always needs your explicit approval. Not configurable away.',
  },
  {
    tier: 'High',
    tone: 'danger',
    icon: 'bi-shield-fill-exclamation',
    examples: ['Email leaving the company', 'Anything mentioning money over your limit', 'A destructive verb'],
    gate: 'Approval plus a typed confirmation. Never auto-executed at any confidence.',
  },
] as const

const GUARDRAILS = [
  { group: 'Scheduling', icon: 'bi-clock', rules: ['SCHED_PAST', 'SCHED_WEEKEND', 'SCHED_HOURS', 'SCHED_MAX_DURATION', 'SCHED_CONFLICT', 'SCHED_DND', 'SCHED_BUFFER'] },
  { group: 'Validation', icon: 'bi-check2-square', rules: ['VAL_REQUIRED_FIELDS', 'VAL_DEADLINE_PAST', 'VAL_EMAIL_FORMAT', 'VAL_OWNER_KNOWN', 'VAL_BUDGET_APPROVAL'] },
  { group: 'Policy', icon: 'bi-file-earmark-ruled', rules: ['POL_SUPERSEDED', 'POL_EXTERNAL_EMAIL', 'POL_NO_FINANCIAL_AUTOEXEC', 'POL_EXPORT_CONSENT', 'POL_CONTRADICTS_DECISION'] },
] as const

export default function FeaturesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-edge/20">
        <span className="bloom -right-24 -top-28 h-72 w-[30rem]" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-14 text-center sm:px-6 sm:pt-20">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-accent">Features</p>
            <h1 className="display text-4xl sm:text-5xl lg:text-[3.5rem]">
              Built to be trusted with a send button
            </h1>
            <p className="display-sub mx-auto mt-5 max-w-2xl text-base text-ink-muted sm:text-lg">
              The extraction is the easy half. Everything below exists because the hard half is making
              an agent that can act on your behalf safe enough that you let it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* pillars */}
      <Section>
        <div className="grid gap-4 lg:grid-cols-2">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.slug} delay={(i % 2) * 90}>
              <article id={pillar.slug} className="panel h-full rounded-2xl p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="glow-accent grid size-11 shrink-0 place-items-center rounded-xl bg-accent-fill text-accent-on">
                    <i className={`bi ${pillar.icon} text-lg`} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                      {pillar.tagline}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold leading-snug tracking-tight sm:text-xl">
                      {pillar.title}
                    </h2>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{pillar.body}</p>
                <ul className="mt-4 grid gap-1.5 border-t border-edge/20 pt-4 sm:grid-cols-2">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex gap-2 text-xs text-ink-muted">
                      <i className="bi bi-check2 mt-0.5 shrink-0 text-ok" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* risk tiers */}
      <Section className="border-y border-edge/20" id="risk">
        <SectionHeading
          eyebrow="Risk tiers"
          title="The ceremony scales with the consequence"
          blurb="Classification is computed from the live payload on the server, every time. Add one external recipient to a draft and the same action changes tier in that instant."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {RISK_TIERS.map((tier, i) => (
            <Reveal key={tier.tier} delay={i * 90}>
              <div
                className={`panel h-full rounded-2xl p-6 ${
                  tier.tone === 'danger' ? 'border-danger/40' : tier.tone === 'warn' ? 'border-warn/40' : 'border-ok/40'
                }`}
              >
                <i
                  className={`bi ${tier.icon} text-2xl ${
                    tier.tone === 'danger' ? 'text-danger' : tier.tone === 'warn' ? 'text-warn' : 'text-ok'
                  }`}
                  aria-hidden
                />
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{tier.tier} risk</h3>
                <ul className="mt-3 space-y-1.5">
                  {tier.examples.map((example) => (
                    <li key={example} className="flex gap-2 text-xs text-ink-muted">
                      <i className="bi bi-dot shrink-0" aria-hidden />
                      {example}
                    </li>
                  ))}
                </ul>
                <p
                  className={`mt-4 border-t pt-3 text-xs font-medium ${
                    tier.tone === 'danger'
                      ? 'border-danger/20 text-danger'
                      : tier.tone === 'warn'
                        ? 'border-warn/20 text-warn'
                        : 'border-ok/20 text-ok'
                  }`}
                >
                  {tier.gate}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280} className="mt-10 grid items-center gap-8 lg:grid-cols-[1fr_20rem]">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              Nothing is sent that you have not seen
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              The confirmation shows the exact payload — produced by the same code path that will send it,
              not a client-side approximation. Warnings must be acknowledged individually, and the rule
              that raised each one names itself.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              A guardrail can also raise a tier and never lower one, so no combination of signals can
              accidentally downgrade something dangerous.
            </p>
          </div>
          <ExecuteMock />
        </Reveal>
      </Section>

      {/* guardrails */}
      <Section id="guardrails">
        <SectionHeading
          eyebrow="Guardrails"
          title="Seventeen rules you can enumerate"
          blurb="Pure functions, evaluated server-side from the database row. The browser gets to explain them; only the server gets to enforce them."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {GUARDRAILS.map((group, i) => (
            <Reveal key={group.group} delay={i * 90}>
              <div className="panel h-full rounded-2xl p-5">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <i className={`bi ${group.icon} text-accent`} aria-hidden />
                  {group.group}
                  <span className="mono-num ml-auto text-ink-faint">{group.rules.length}</span>
                </p>
                <ul className="mt-3 space-y-1">
                  {group.rules.map((rule) => (
                    <li
                      key={rule}
                      className="rounded-md border border-edge/20 bg-base/50 px-2 py-1 font-mono text-[11px] text-ink-muted"
                    >
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280} className="mt-8">
          <p className="panel rounded-2xl p-5 text-sm leading-relaxed text-ink-muted">
            <i className="bi bi-code-square mr-2 text-accent" aria-hidden />
            Adding your own is one file and one registry line — nothing in the UI, the API, or the
            executor changes. Each rule receives the current time as an argument rather than reading the
            clock, so &ldquo;no meetings on a Sunday&rdquo; is a unit test rather than a hope.{' '}
            <Link href="/docs/guardrails" className="font-medium text-accent hover:underline">
              See the example
            </Link>
            .
          </p>
        </Reveal>
      </Section>

      {/* the board */}
      <Section className="border-y border-edge/20">
        <SectionHeading
          eyebrow="The review surface"
          title="Three groups, so there is only ever one decision"
          blurb="Ready to execute, needs clarification, or informational. Nine composable filters, all reflected in the URL so a filtered view is shareable."
          align="center"
        />
        <Reveal delay={120} className="mx-auto mt-12 max-w-5xl">
          <ActionItemsMock />
        </Reveal>
      </Section>

      {/* roadmap */}
      <Section id="roadmap">
        <SectionHeading
          eyebrow="Roadmap"
          title="Specified, not yet shipped"
          blurb="Listed because hiding unfinished work makes a product look smaller than it is. Each one already has its schema in place."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {ROADMAP.map((item, i) => (
            <Reveal key={item.slug} delay={i * 90}>
              <div className="panel h-full rounded-2xl border-dashed p-5 opacity-90">
                <div className="flex items-start justify-between gap-2">
                  <span className="grid size-9 place-items-center rounded-xl bg-ink-faint/15 text-ink-faint">
                    <i className={`bi ${item.icon}`} aria-hidden />
                  </span>
                  <span className="rounded border border-edge/25 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-ink-faint">
                    soon
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug">{item.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{item.body}</p>
                <ul className="mt-3 space-y-1 border-t border-edge/20 pt-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2 text-[11px] text-ink-faint">
                      <i className="bi bi-circle mt-0.5 shrink-0 text-[7px]" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  )
}
