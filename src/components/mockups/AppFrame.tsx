import clsx from 'clsx'
import type { ReactNode } from 'react'

/**
 * A chrome-less window frame for the product mockups.
 *
 * These mockups are rebuilt from the application's own components and share its
 * palette tokens verbatim — they are not screenshots. That matters for two
 * reasons: they stay correct in both light and dark themes without a second asset,
 * and they cannot silently drift out of date the way an exported PNG does.
 *
 * `aria-hidden` throughout: this is decoration illustrating prose that already
 * says the same thing, so a screen reader should skip it rather than read a
 * flattened, meaningless version of a UI.
 */
export function AppFrame({
  children,
  label,
  className,
  sidebar = true,
}: {
  children: ReactNode
  /** Shown in the fake address bar. */
  label: string
  className?: string
  sidebar?: boolean
}) {
  return (
    <div
      aria-hidden
      className={clsx(
        'panel overflow-hidden rounded-2xl text-left',
        'shadow-[var(--glow-card)]',
        className,
      )}
    >
      {/* window bar */}
      <div className="flex items-center gap-2 border-b border-edge/20 bg-surface-strong/50 px-3 py-2">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-danger/60" />
          <span className="size-2.5 rounded-full bg-warn/60" />
          <span className="size-2.5 rounded-full bg-ok/60" />
        </span>
        <span className="mx-auto flex items-center gap-1.5 rounded-md border border-edge/20 bg-base/60 px-2.5 py-0.5">
          <i className="bi bi-lock-fill text-[8px] text-ok" />
          <span className="font-mono text-[10px] text-ink-faint">{label}</span>
        </span>
      </div>

      <div className="flex">
        {sidebar && <MockSidebar />}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  )
}

const NAV = [
  { group: 'Overview', items: [{ icon: 'bi-speedometer2', label: 'Dashboard' }] },
  {
    group: 'Capture',
    items: [
      { icon: 'bi-cloud-arrow-up', label: 'Upload' },
      { icon: 'bi-file-earmark-text', label: 'Transcripts' },
    ],
  },
  {
    group: 'Understand',
    items: [
      { icon: 'bi-list-check', label: 'Action items', active: true },
      { icon: 'bi-lightbulb', label: 'Decisions' },
    ],
  },
  {
    group: 'Execute',
    items: [
      { icon: 'bi-plug', label: 'Integrations' },
      { icon: 'bi-journal-text', label: 'Audit log' },
    ],
  },
] as const

function MockSidebar() {
  return (
    <div className="hidden w-40 shrink-0 border-r border-edge/20 py-3 sm:block">
      <div className="mb-3 flex items-center gap-2 px-3">
        <span className="glow-accent grid size-6 place-items-center rounded-lg bg-accent-fill text-accent-on">
          <i className="bi bi-soundwave text-[10px]" />
        </span>
        <span className="text-[11px] font-semibold">Voice2BRD</span>
      </div>

      {NAV.map((section) => (
        <div key={section.group} className="mb-2 px-2">
          <p className="px-1.5 py-1 text-[8px] font-semibold uppercase tracking-wider text-ink-faint">
            {section.group}
          </p>
          {section.items.map((item) => (
            <div
              key={item.label}
              className={clsx(
                'flex items-center gap-2 rounded-lg px-1.5 py-1.5 text-[10px]',
                'active' in item && item.active
                  ? 'bg-accent-fill/15 font-medium text-accent shadow-[inset_2px_0_0_0_rgb(var(--accent-fill))]'
                  : 'text-ink-muted',
              )}
            >
              <i className={clsx('bi', item.icon, 'text-[10px]')} />
              <span className="truncate">{item.label}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/** The mode banner the real app shows above every page. */
export function MockModeBanner({ mode = 'mock' }: { mode?: 'mock' | 'live' }) {
  return (
    <div
      className={clsx(
        'border-b border-edge/20 px-3 py-1 text-center text-[9px]',
        mode === 'mock' ? 'bg-ok/10 text-ok' : 'bg-warn/12 text-warn',
      )}
    >
      <i className={clsx('bi mr-1', mode === 'mock' ? 'bi-shield-check' : 'bi-broadcast')} />
      {mode === 'mock'
        ? 'Mock mode — executions are simulated and nothing leaves this machine.'
        : 'Live mode — executions reach real third-party accounts.'}
    </div>
  )
}

export function MockBadge({
  children,
  tone = 'neutral',
  icon,
}: {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'success' | 'warn' | 'danger' | 'muted'
  icon?: string
}) {
  const TONE = {
    neutral: 'border-edge/25 bg-surface-strong/60 text-ink-muted',
    accent: 'border-accent/40 bg-accent-fill/12 text-accent',
    success: 'border-ok/45 bg-ok/12 text-ok',
    warn: 'border-warn/45 bg-warn/12 text-warn',
    danger: 'border-danger/45 bg-danger/12 text-danger',
    muted: 'border-edge/15 bg-ink-faint/10 text-ink-faint',
  } as const
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[8px] font-medium leading-4',
        TONE[tone],
      )}
    >
      {icon && <i className={clsx('bi', icon, 'text-[8px]')} />}
      {children}
    </span>
  )
}
