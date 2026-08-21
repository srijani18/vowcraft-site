import { MockBadge } from './AppFrame'

/**
 * The confirmation modal, rebuilt from the real one.
 *
 * The point being illustrated is the field table: the reviewer sees the *exact*
 * payload that will be sent, produced by the same dry-run code path that will
 * send it, plus the consequence in plain words and any warning to acknowledge.
 */
export function ExecuteMock({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`panel-strong overflow-hidden rounded-2xl shadow-[var(--glow-card)] ${className ?? ''}`}
    >
      <div className="lit-edge flex items-start gap-2 border-b border-edge/20 px-3.5 py-2.5">
        <i className="bi bi-lightning-charge-fill mt-0.5 text-sm text-accent" />
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold">Confirm execution</p>
          <p className="mt-0.5 text-[9px] text-ink-muted">
            Creates a calendar event and emails an invitation to 2 people.
          </p>
        </div>
        <i className="bi bi-x-lg text-[9px] text-ink-faint" />
      </div>

      <div className="space-y-2.5 px-3.5 py-3">
        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-warn/40 px-2 py-1.5">
          <MockBadge tone="warn" icon="bi-shield-exclamation">
            MEDIUM risk
          </MockBadge>
          <MockBadge icon="bi-plug">google calendar</MockBadge>
          <MockBadge tone="success" icon="bi-graph-up">
            HIGH confidence
          </MockBadge>
        </div>

        <ul className="space-y-0.5 text-[8px] text-ink-muted">
          <li>
            <i className="bi bi-dot" /> Invites 2 other people.
          </li>
        </ul>

        <dl className="divide-y divide-edge/10 overflow-hidden rounded-lg border border-edge/20 bg-base/60">
          {[
            ['Title', 'Q3 budget review'],
            ['When', 'Fri 22 Aug, 10:00 – 10:45 (Asia/Kolkata)'],
            ['Duration', '45 min'],
            ['Attendees', 'priya@acme.test, jordan@acme.test'],
            ['Location', 'Meet'],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-[62px_1fr] gap-2 px-2 py-1.5">
              <dt className="text-[8px] font-medium text-ink-faint">{label}</dt>
              <dd className="text-[8px] text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex items-start gap-1.5 rounded-lg border border-warn/40 bg-warn/[0.07] px-2 py-1.5">
          <span className="mt-px grid size-2.5 place-items-center rounded-sm border border-warn text-warn">
            <i className="bi bi-check text-[6px]" />
          </span>
          <span className="text-[8px] text-warn">
            <span className="font-medium">I understand:</span> Only 5 min between this and “Sprint
            planning” (15 min preferred).
            <span className="ml-1 font-mono opacity-60">SCHED_BUFFER</span>
          </span>
        </div>

        <p className="text-[8px] text-ink-faint">
          <i className="bi bi-info-circle mr-1" />
          Every execution is recorded in the audit log with the exact payload sent.
        </p>
      </div>

      <div className="flex items-center justify-end gap-1.5 border-t border-edge/20 bg-base/40 px-3.5 py-2.5">
        <span className="px-2 py-1 text-[9px] text-ink-muted">Cancel</span>
        <span className="glow-accent rounded-md bg-accent-fill px-2 py-1 text-[9px] font-semibold text-accent-on">
          <i className="bi bi-send-fill mr-1" />
          Execute now
        </span>
      </div>
    </div>
  )
}
