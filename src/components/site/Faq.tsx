'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { FAQ } from '@/lib/content'
import { Reveal } from './Reveal'

/**
 * Accordion built from buttons and `aria-expanded` rather than `<details>`, so the
 * open/close animation is controllable and only one panel is open at a time —
 * a wall of simultaneously-open answers defeats the point of collapsing them.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="mt-10 space-y-2">
      {FAQ.map((entry, i) => {
        const isOpen = open === i
        return (
          <Reveal key={entry.q} delay={i * 50}>
            <div className={clsx('panel overflow-hidden rounded-2xl', isOpen && 'border-accent-fill/35')}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-ink/[0.03]"
              >
                <span className="flex-1 text-sm font-medium">{entry.q}</span>
                <i
                  className={clsx(
                    'bi bi-plus-lg shrink-0 text-xs text-accent transition-transform duration-200',
                    isOpen && 'rotate-45',
                  )}
                  aria-hidden
                />
              </button>
              {isOpen && (
                <p
                  id={`faq-${i}`}
                  className="border-t border-edge/20 px-5 py-4 text-sm leading-relaxed text-ink-muted"
                >
                  {entry.a}
                </p>
              )}
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
