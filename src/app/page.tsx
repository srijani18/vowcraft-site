import Link from 'next/link'
import { CTA } from '@/components/site/CTA'
import { Reveal } from '@/components/site/Reveal'
import { Section, SectionHeading } from '@/components/site/Section'
import { ActionItemsMock } from '@/components/mockups/ActionItemsMock'
import { AuditMock } from '@/components/mockups/AuditMock'
import { ExecuteMock } from '@/components/mockups/ExecuteMock'
import { OverviewMock } from '@/components/mockups/OverviewMock'
import { HOW_IT_WORKS, INTEGRATIONS, PILLARS } from '@/lib/content'
import { signupUrl } from '@/lib/env'

export default function HomePage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────── hero */}
      <section className="relative overflow-hidden">
        <span className="bloom -left-24 -top-32 h-80 w-[32rem]" aria-hidden />
        <span className="bloom bloom-warm -right-32 top-20 h-72 w-[28rem]" aria-hidden />
        <div className="hairgrid absolute inset-0" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-edge/25 bg-surface-strong/60 px-3 py-1.5 text-[11px] font-medium text-ink-muted">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-1.5 animate-ping rounded-full bg-accent-fill opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent-fill" />
              </span>
              Human-in-the-loop by design — nothing executes on its own
            </p>

            <h1 className="display text-[2.6rem] sm:text-6xl lg:text-[4.5rem]">
              The meeting ended.
              <br />
              <span className="text-gradient">The work already started.</span>
            </h1>

            <p className="display-sub mx-auto mt-6 max-w-2xl text-base text-ink-muted sm:text-lg">
              Vowcraft listens, works out what your team actually committed to, and turns it into
              calendar invites, tasks and drafts — each one traced back to the sentence that produced
              it, and none of it sent until you say so.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href={signupUrl()}
                className="glow-accent inline-flex items-center gap-2 rounded-xl bg-accent-fill px-5 py-3 text-sm font-semibold text-accent-on transition-all hover:brightness-110"
              >
                Get started free
                <i className="bi bi-arrow-right text-xs" aria-hidden />
              </a>
              <Link
                href="/features"
                className="inline-flex items-center gap-2 rounded-xl border border-edge/30 bg-surface-strong/70 px-5 py-3 text-sm font-medium transition-colors hover:border-accent-fill/40 hover:bg-surface-strong"
              >
                <i className="bi bi-play-circle" aria-hidden />
                See how it works
              </Link>
            </div>

            <p className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-ink-faint">
              <span>
                <i className="bi bi-check2 mr-1.5 text-ok" aria-hidden />
                No credit card
              </span>
              <span>
                <i className="bi bi-check2 mr-1.5 text-ok" aria-hidden />
                50+ languages
              </span>
              <span>
                <i className="bi bi-check2 mr-1.5 text-ok" aria-hidden />
                Runs fully offline if you want
              </span>
            </p>
          </Reveal>

          {/* Product shot, rebuilt from the app's own components rather than
              screenshotted — so it is correct in both themes and cannot go stale. */}
          <Reveal delay={140} className="relative mx-auto mt-14 max-w-5xl">
            <ActionItemsMock />
            <div className="pointer-events-none absolute -bottom-6 -right-4 hidden w-64 lg:block xl:-right-16 xl:w-72">
              <ExecuteMock />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────── integrations */}
      <section className="border-y border-edge/20 py-10">
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
          Works with what your team already uses
        </p>
        <div className="marquee-mask overflow-hidden">
          <div className="marquee gap-3">
            {[...INTEGRATIONS, ...INTEGRATIONS].map((item, i) => (
              <span
                key={`${item.name}-${i}`}
                className="flex shrink-0 items-center gap-2 rounded-xl border border-edge/20 bg-surface-strong/40 px-4 py-2 text-sm text-ink-muted"
              >
                <i className={`bi ${item.icon} text-accent`} aria-hidden />
                {item.name}
                {/* A marquee that lists a not-yet-available integration alongside working
                    ones is a claim, so it says which is which. */}
                {'soon' in item && item.soon && (
                  <span className="rounded border border-edge/30 px-1 text-[9px] uppercase tracking-wider text-ink-faint">
                    soon
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────── the problem framing */}
      <Section width="narrow">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">The gap</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">
            Transcription was never the hard part.
          </h2>
          <div className="display-sub mt-5 space-y-4 text-base text-ink-muted sm:text-lg">
            <p>
              Plenty of tools will give you a wall of text. What nobody does is close the loop: someone
              still reads the transcript, works out who owes what, and then types it into four different
              systems by hand.
            </p>
            <p>
              And the reason nobody closes it is that the last step is genuinely dangerous. An agent
              that can send email on your behalf can send{' '}
              <em className="text-ink">the wrong email</em> on your behalf. So the interesting problem
              is not extraction — it is building something you would actually trust with a send button.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { icon: 'bi-quote', title: 'Grounded', body: 'Every action cites its timestamp and quote.' },
            { icon: 'bi-hand-index-thumb', title: 'Gated', body: 'Risk decides how much confirmation it takes.' },
            { icon: 'bi-journal-text', title: 'Recorded', body: 'Append-only, including the blocked attempts.' },
          ].map((item) => (
            <div key={item.title} className="panel rounded-2xl p-4">
              <i className={`bi ${item.icon} text-lg text-accent`} aria-hidden />
              <p className="mt-2 text-sm font-semibold">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">{item.body}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ───────────────────────────────────────────────────────── how it works */}
      <Section id="how" className="relative">
        <SectionHeading
          eyebrow="How it works"
          title="Five steps, and you only appear in one of them"
          blurb="Everything before the review is automatic. Everything after it is recorded."
        />

        <ol className="mt-12 grid gap-4 lg:grid-cols-5">
          {HOW_IT_WORKS.map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 80}>
              <div className="panel h-full rounded-2xl p-5">
                <div className="flex items-center gap-2.5">
                  <span className="mono-num grid size-7 place-items-center rounded-lg border border-edge/25 text-ink-faint">
                    {i + 1}
                  </span>
                  <i className={`bi ${step.icon} text-lg text-accent`} aria-hidden />
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={200} className="mt-10 text-center">
          <p className="inline-flex flex-wrap items-center justify-center gap-2 rounded-xl border border-ok/40 bg-ok/[0.08] px-4 py-2.5 text-xs text-ok">
            <i className="bi bi-shield-check" aria-hidden />
            Step four is not optional. There is no configuration that lets a medium- or high-risk action
            skip it.
          </p>
        </Reveal>
      </Section>

      {/* ───────────────────────────────────────────────────────── the bento */}
      <Section width="wide" className="relative">
        <SectionHeading
          eyebrow="Why it is trustworthy"
          title="Six decisions that make the send button safe"
          blurb="Each of these is a constraint we chose to live with, not a feature we bolted on."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.slug} delay={(i % 3) * 90}>
              <article className="panel panel-interactive h-full rounded-2xl p-6">
                <span className="glow-accent grid size-10 place-items-center rounded-xl bg-accent-fill text-accent-on">
                  <i className={`bi ${pillar.icon}`} aria-hidden />
                </span>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-accent">
                  {pillar.tagline}
                </p>
                <h3 className="mt-1.5 text-lg font-semibold leading-snug tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{pillar.body}</p>
                <ul className="mt-4 space-y-1.5 border-t border-edge/20 pt-4">
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

      {/* ─────────────────────────────────────────────────── audit + overview */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
              The unglamorous screen
            </p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              The audit log is the whole argument
            </h2>
            <div className="display-sub mt-5 space-y-4 text-base text-ink-muted">
              <p>
                Anyone can demo an agent doing something impressive. The question a compliance team
                actually asks is what happens when it does something wrong — and whether you can prove
                what it did.
              </p>
              <p>
                So every proposal, every decision, and every outcome lands here with before-and-after
                snapshots, the rule ids involved, and the exact payload that was sent. Blocked attempts
                are recorded too, because an attempt that was stopped is the most interesting kind.
              </p>
            </div>
            <ul className="mt-6 space-y-2">
              {[
                'No update or delete path exists anywhere in the codebase',
                'State changes and audit rows commit in the same transaction',
                'The record outlives the account that produced it',
              ].map((point) => (
                <li key={point} className="flex gap-2.5 text-sm text-ink-muted">
                  <i className="bi bi-lock-fill mt-0.5 shrink-0 text-accent" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/docs/guardrails"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              Read about the guardrails
              <i className="bi bi-arrow-right text-xs" aria-hidden />
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <AuditMock />
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="lg:order-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
              One number that matters
            </p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              Open it and know whether to care
            </h2>
            <div className="display-sub mt-5 space-y-4 text-base text-ink-muted">
              <p>
                The dashboard leads with how many decisions are waiting on you, because that is the only
                figure that changes what you do next. Totals look impressive and tell you nothing.
              </p>
              <p>
                Below it: whether work is actually moving from extracted to executed, and what the
                guardrails have been blocking. A rule that fires constantly is usually mis-tuned rather
                than heroic — so you can see it and fix it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:order-1">
            <OverviewMock />
          </Reveal>
        </div>
      </Section>

      <CTA />
    </>
  )
}
