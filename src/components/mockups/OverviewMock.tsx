import clsx from 'clsx'
import { AppFrame, MockModeBanner } from './AppFrame'

/** The landing dashboard, rebuilt from the real overview component. */

interface MockStat {
  label: string
  value: string
  icon: string
  tone: string
  emphasis?: boolean
}

const STATS: MockStat[] = [
  { label: 'Awaiting your decision', value: '11', icon: 'bi-hourglass-split', tone: 'text-accent', emphasis: true },
  { label: 'Approved, ready to run', value: '3', icon: 'bi-lightning-charge-fill', tone: 'text-ok' },
  { label: 'Executed', value: '1', icon: 'bi-check-circle-fill', tone: 'text-ok' },
  { label: 'Failed', value: '0', icon: 'bi-x-octagon-fill', tone: 'text-ink-faint' },
]

const FUNNEL = [
  { label: 'Extracted', count: 15, width: 100, pct: null },
  { label: 'Decided', count: 4, width: 27, pct: 26.7 },
  { label: 'Approved', count: 3, width: 20, pct: 75 },
  { label: 'Executed', count: 1, width: 8, pct: 33.3 },
] as const

export function OverviewMock({ className }: { className?: string }) {
  return (
    <AppFrame label="voice2brd.app/dashboard" className={className}>
      <MockModeBanner />
      <div className="p-3 sm:p-4">
        <p className="text-[13px] font-semibold tracking-tight">Welcome back, Srijani</p>
        <p className="mb-3 text-[9px] text-ink-muted">11 items need your attention.</p>

        <div className="mb-3 grid grid-cols-2 gap-1.5 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className={clsx('panel rounded-xl p-2', stat.emphasis && 'lit-edge')}
            >
              <div className="flex items-start justify-between gap-1">
                <p className="text-[8px] font-medium text-ink-muted">{stat.label}</p>
                <i className={clsx('bi', stat.icon, 'text-[9px]', stat.tone)} />
              </div>
              <p className={clsx('mt-1 tabular-nums', stat.emphasis ? 'text-xl font-semibold' : 'text-lg font-semibold')}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-1.5 lg:grid-cols-3">
          <div className="panel rounded-xl p-2.5 lg:col-span-2">
            <p className="mb-2 text-[8px] font-semibold uppercase tracking-wider text-ink-muted">
              <i className="bi bi-funnel mr-1 text-accent" />
              Workflow
            </p>
            <ol className="space-y-1.5">
              {FUNNEL.map((stage, i) => (
                <li key={stage.label}>
                  <div className="mb-0.5 flex items-baseline justify-between text-[8px]">
                    <span className="font-medium">{stage.label}</span>
                    <span className="flex gap-1.5">
                      <span className="font-mono text-ink-muted">{stage.count}</span>
                      {stage.pct !== null && (
                        <span
                          className={clsx(
                            'font-mono',
                            stage.pct >= 66 ? 'text-ok' : stage.pct >= 33 ? 'text-warn' : 'text-danger',
                          )}
                        >
                          {stage.pct}%
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-ink/[0.07]">
                    <div
                      className={clsx('h-full rounded-full', i === FUNNEL.length - 1 ? 'bg-ok' : 'bg-accent-fill')}
                      style={{ width: `${stage.width}%` }}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="panel rounded-xl p-2.5">
            <p className="mb-1 text-[8px] font-semibold uppercase tracking-wider text-ink-muted">
              <i className="bi bi-shield-exclamation mr-1 text-accent" />
              Guardrails
            </p>
            <p className="flex items-baseline gap-1">
              <span className="text-xl font-semibold tabular-nums">7</span>
              <span className="text-[8px] text-ink-muted">executions blocked</span>
            </p>
            <ul className="mt-1.5 space-y-1">
              {[
                ['BLOCK', 'SCHED_WEEKEND', 3],
                ['BLOCK', 'POL_EXTERNAL_EMAIL', 2],
                ['WARN', 'SCHED_BUFFER', 2],
              ].map(([sev, rule, n]) => (
                <li key={rule as string} className="flex items-center gap-1 text-[8px]">
                  <span
                    className={clsx(
                      'rounded-full border px-1 py-px text-[7px]',
                      sev === 'BLOCK'
                        ? 'border-danger/45 bg-danger/12 text-danger'
                        : 'border-warn/45 bg-warn/12 text-warn',
                    )}
                  >
                    {sev}
                  </span>
                  <span className="flex-1 truncate font-mono text-ink-muted">{rule}</span>
                  <span className="font-mono text-ink-faint">{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AppFrame>
  )
}
