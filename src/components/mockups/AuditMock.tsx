import clsx from 'clsx'

/**
 * The audit log, rebuilt from the real viewer. Chosen for the landing page because
 * it is the least glamorous screen in the product and the one that decides whether
 * a compliance team will let anyone use it.
 */

const ENTRIES = [
  { icon: 'bi-check-circle-fill', tone: 'text-ok', label: 'Executed', event: 'action_item.executed', item: 'Schedule the Q3 budget review with Priya and Jordan', time: '09:12:03' },
  { icon: 'bi-send', tone: 'text-accent', label: 'Execution requested', event: 'action_item.execution_requested', item: 'Schedule the Q3 budget review with Priya and Jordan', time: '09:12:02' },
  { icon: 'bi-check-lg', tone: 'text-ok', label: 'Approved', event: 'action_item.approved', item: 'Schedule the Q3 budget review with Priya and Jordan', time: '09:11:48' },
  { icon: 'bi-slash-circle-fill', tone: 'text-danger', label: 'Guardrail blocked', event: 'action_item.guardrail_blocked', item: 'Run the vendor sync on Saturday morning', time: '09:10:21' },
  { icon: 'bi-pencil', tone: 'text-ink-faint', label: 'Edited', event: 'action_item.edited', item: 'Set up the vendor renewal meeting', time: '09:08:55' },
] as const

export function AuditMock({ className }: { className?: string }) {
  return (
    <div aria-hidden className={clsx('panel overflow-hidden rounded-2xl', className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-edge/20 px-3 py-2.5">
        <div>
          <p className="text-[12px] font-semibold">Audit log</p>
          <p className="text-[8px] text-ink-muted">
            Append-only — no part of this application can modify or delete a row.
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-edge/25 bg-surface-strong/60 px-1.5 py-0.5 text-[8px] text-ink-muted">
          <i className="bi bi-lock-fill text-[8px]" />
          1,284 events · immutable
        </span>
      </div>

      <ol className="divide-y divide-edge/10">
        {ENTRIES.map((entry) => (
          <li key={entry.time} className="flex items-start gap-2 px-3 py-2">
            <i className={clsx('bi', entry.icon, 'mt-0.5 text-[10px]', entry.tone)} />
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-baseline gap-1.5">
                <span className="text-[10px] font-medium">{entry.label}</span>
                <span className="font-mono text-[8px] text-ink-faint">{entry.event}</span>
              </p>
              <p className="truncate text-[8px] text-ink-muted">{entry.item}</p>
            </div>
            <span className="shrink-0 font-mono text-[8px] text-ink-faint">{entry.time}</span>
            <i className="bi bi-chevron-down mt-0.5 shrink-0 text-[7px] text-ink-faint" />
          </li>
        ))}
      </ol>

      <div className="border-t border-edge/20 bg-base/50 px-3 py-2">
        <p className="mb-1 text-[7px] font-semibold uppercase tracking-wider text-ink-faint">Context</p>
        <pre className="overflow-hidden rounded-md border border-edge/20 bg-base p-1.5 font-mono text-[7px] leading-relaxed text-ink-muted">{`{
  "provider": "google_calendar",
  "externalId": "evt_8f21c0",
  "riskTier": "MEDIUM",
  "rules": ["SCHED_BUFFER:WARN"],
  "durationMs": 288
}`}</pre>
      </div>
    </div>
  )
}
