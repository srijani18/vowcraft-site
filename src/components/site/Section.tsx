import clsx from 'clsx'
import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

/** Shared page rhythm, so vertical spacing is a decision made once. */
export function Section({
  children,
  className,
  id,
  width = 'default',
}: {
  children: ReactNode
  className?: string
  id?: string
  width?: 'default' | 'narrow' | 'wide'
}) {
  return (
    <section
      id={id}
      className={clsx(
        'mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24',
        width === 'narrow' ? 'max-w-3xl' : width === 'wide' ? 'max-w-[1400px]' : 'max-w-7xl',
        className,
      )}
    >
      {children}
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  blurb,
  align = 'left',
}: {
  eyebrow?: string
  title: ReactNode
  blurb?: ReactNode
  align?: 'left' | 'center'
}) {
  return (
    <Reveal className={clsx('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-edge/25 bg-surface-strong/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="display text-3xl sm:text-4xl lg:text-[2.75rem]">{title}</h2>
      {blurb && <p className="display-sub mt-4 text-base text-ink-muted sm:text-lg">{blurb}</p>}
    </Reveal>
  )
}
