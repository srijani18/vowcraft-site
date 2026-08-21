'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { Reveal } from './Reveal'
import { PLANS } from '@/lib/content'
import { signupUrl } from '@/lib/env'

/**
 * Pricing with a monthly/annual toggle.
 *
 * The saving is stated as a real figure per plan rather than a vague "save 20%",
 * and the toggle labels the discount rather than hiding it behind a click — a
 * pricing page that makes you do arithmetic is a pricing page people leave.
 */
export function PricingTable() {
  const [annual, setAnnual] = useState(true)

  return (
    <>
      <Reveal className="flex justify-center">
        <div
          className="inline-flex items-center gap-1 rounded-xl border border-edge/25 bg-surface-strong/50 p-1"
          role="group"
          aria-label="Billing period"
        >
          {(
            [
              { value: false, label: 'Monthly' },
              { value: true, label: 'Annual' },
            ] as const
          ).map((option) => (
            <button
              key={option.label}
              onClick={() => setAnnual(option.value)}
              aria-pressed={annual === option.value}
              className={clsx(
                'rounded-lg px-4 py-1.5 text-sm font-medium transition-all',
                annual === option.value
                  ? 'glow-accent bg-accent-fill text-accent-on'
                  : 'text-ink-muted hover:text-ink',
              )}
            >
              {option.label}
              {option.value && (
                <span className={clsx('ml-1.5 text-[10px]', annual ? 'text-accent-on/80' : 'text-ok')}>
                  −21%
                </span>
              )}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {PLANS.map((plan, i) => {
          const price = annual ? plan.annual : plan.monthly
          return (
            <Reveal key={plan.id} delay={i * 90}>
              <article
                className={clsx(
                  'panel relative flex h-full flex-col rounded-2xl p-6',
                  plan.highlight && 'lit-edge border-accent-fill/45',
                )}
              >
                {plan.highlight && (
                  <span className="glow-accent absolute -top-3 left-6 rounded-full bg-accent-fill px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-on">
                    Most teams
                  </span>
                )}

                <h3 className="text-lg font-semibold tracking-tight">{plan.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-muted">{plan.tagline}</p>

                <p className="mt-5 flex items-baseline gap-1.5">
                  {price === null ? (
                    <span className="text-3xl font-semibold tracking-tight">{plan.priceNote}</span>
                  ) : price === 0 ? (
                    <span className="text-4xl font-semibold tracking-tight">Free</span>
                  ) : (
                    <>
                      <span className="text-4xl font-semibold tracking-tight tabular-nums">${price}</span>
                      <span className="text-xs text-ink-faint">/ user / month</span>
                    </>
                  )}
                </p>
                {price !== null && price > 0 && annual && (
                  <p className="mt-1 text-[11px] text-ok">Billed annually — ${price * 12} per user</p>
                )}

                <a
                  href={plan.id === 'compliance' ? '/contact' : plan.id === 'self-hosted' ? '/docs/quickstart' : signupUrl()}
                  className={clsx(
                    'mt-5 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all',
                    plan.highlight
                      ? 'glow-accent bg-accent-fill text-accent-on hover:brightness-110'
                      : 'border border-edge/30 bg-surface-strong/70 text-ink hover:border-accent-fill/40',
                  )}
                >
                  {plan.cta}
                  <i className="bi bi-arrow-right text-xs" aria-hidden />
                </a>

                <ul className="mt-6 space-y-2 border-t border-edge/20 pt-5">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex gap-2.5 text-xs text-ink-muted">
                      <i className="bi bi-check2 mt-0.5 shrink-0 text-ok" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>

                <ul className="mt-4 space-y-1.5 border-t border-edge/20 pt-4">
                  {plan.limits.map((limit) => (
                    <li key={limit} className="flex gap-2.5 text-[11px] text-ink-faint">
                      <i className="bi bi-info-circle mt-0.5 shrink-0" aria-hidden />
                      {limit}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          )
        })}
      </div>
    </>
  )
}
