import clsx from 'clsx'
import { AppFrame, MockBadge, MockModeBanner } from './AppFrame'

/**
 * The action items board, rebuilt at mockup scale from the real card layout:
 * priority stripe, type/status/confidence/risk badges, owner, deadline, source
 * timestamp, missing-field chips, guardrail violations, and the action row.
 *
 * The data mirrors the application's seed, so the picture on the landing page is
 * literally what a new instance shows on first run.
 */

interface MockItem {
  type: string
  typeIcon: string
  status: string
  statusTone: 'neutral' | 'accent' | 'success' | 'warn' | 'danger' | 'muted'
  confidence: 'HIGH' | 'MEDIUM' | 'LOW'
  risk: 'Low risk' | 'Medium risk' | 'High risk'
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  description: string
  owner: string
  deadline: string
  timestamp: string
  missing?: string[]
  violation?: { rule: string; message: string; severity: 'BLOCK' | 'WARN' }
  executable?: boolean
}

const READY: MockItem[] = [
  {
    type: 'Calendar',
    typeIcon: 'bi-calendar-event',
    status: 'Approved',
    statusTone: 'accent',
    confidence: 'HIGH',
    risk: 'Medium risk',
    priority: 'HIGH',
    description: 'Schedule the Q3 budget review with Priya and Jordan',
    owner: 'Marcus',
    deadline: 'Fri 10:00',
    timestamp: '1:01',
    executable: true,
  },
  {
    type: 'Email',
    typeIcon: 'bi-envelope',
    status: 'Proposed',
    statusTone: 'neutral',
    confidence: 'HIGH',
    risk: 'Low risk',
    priority: 'LOW',
    description: 'Draft the meeting summary for the finance channel',
    owner: 'You',
    deadline: 'Tomorrow',
    timestamp: '11:30',
  },
]

const NEEDS: MockItem[] = [
  {
    type: 'Calendar',
    typeIcon: 'bi-calendar-event',
    status: 'Proposed',
    statusTone: 'neutral',
    confidence: 'MEDIUM',
    risk: 'Medium risk',
    priority: 'MEDIUM',
    description: 'Set up the vendor renewal meeting',
    owner: 'Marcus',
    deadline: 'In 6d',
    timestamp: '7:32',
    missing: ['startsAt', 'attendees'],
  },
  {
    type: 'Email',
    typeIcon: 'bi-envelope',
    status: 'Proposed',
    statusTone: 'neutral',
    confidence: 'LOW',
    risk: 'High risk',
    priority: 'HIGH',
    description: 'Email the vendor to tell them the renewal is delayed',
    owner: 'Priya',
    deadline: 'In 2d',
    timestamp: '12:34',
    violation: {
      rule: 'POL_EXTERNAL_EMAIL',
      message: 'Sending to external recipients requires explicit approval.',
      severity: 'BLOCK',
    },
  },
]

const PRIORITY_STRIPE = { HIGH: 'bg-danger', MEDIUM: 'bg-warn', LOW: 'bg-ink-faint' } as const
const CONF_TONE = { HIGH: 'success', MEDIUM: 'warn', LOW: 'danger' } as const
const RISK_TONE = { 'Low risk': 'success', 'Medium risk': 'warn', 'High risk': 'danger' } as const

export function ActionItemsMock({ className }: { className?: string }) {
  return (
    <AppFrame label="vowcraft.app/dashboard/action-items" className={className} activeLabel="Action items">
      <MockModeBanner />

      <div className="p-3 sm:p-4">
        {/* header */}
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-[13px] font-semibold tracking-tight">Action items</p>
            <p className="text-[9px] text-ink-muted">
              15 extracted from your meetings. Approve what is right, fix what is not.
            </p>
          </div>
          <div className="flex gap-1">
            <MockBadge tone="success" icon="bi-lightning-charge-fill">
              8 ready
            </MockBadge>
            <MockBadge tone="warn" icon="bi-question-circle">
              4 to clarify
            </MockBadge>
          </div>
        </div>

        {/* filter rail */}
        <div className="panel lit-edge mb-3 rounded-xl px-2.5 py-2">
          <div className="flex items-center gap-1.5">
            <div className="relative flex-1">
              <i className="bi bi-search absolute left-2 top-1/2 -translate-y-1/2 text-[8px] text-ink-faint" />
              <div className="rounded-lg border border-edge/25 bg-base py-1 pl-6 pr-8 text-[9px] text-ink-faint">
                Search descriptions and quotes…
              </div>
              <span className="kbd absolute right-1.5 top-1/2 -translate-y-1/2 text-[7px]">⌘K</span>
            </div>
            {['Owner', 'Deadline'].map((f) => (
              <div
                key={f}
                className="rounded-lg border border-edge/25 bg-base px-2 py-1 text-[9px] text-ink-faint"
              >
                {f}: any
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex items-center gap-1 border-t border-edge/20 pt-1.5">
            <span className="text-[7px] font-semibold uppercase tracking-wider text-ink-faint">Group</span>
            {['Ready', 'Needs clarification', 'Informational'].map((g, i) => (
              <span
                key={g}
                className={clsx(
                  'rounded-full border px-1.5 py-0.5 text-[8px]',
                  i === 0
                    ? 'border-accent-fill bg-accent-fill/20 text-accent'
                    : 'border-edge/25 text-ink-muted',
                )}
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        <Lane
          icon="bi-lightning-charge-fill"
          tone="text-ok"
          title="Ready to Execute"
          count={8}
          blurb="Complete, owned, and passing every guardrail."
          items={READY}
        />
        <Lane
          icon="bi-question-circle-fill"
          tone="text-warn"
          title="Needs Clarification"
          count={4}
          blurb="Missing a detail, low confidence, or blocked by a rule."
          items={NEEDS}
        />
      </div>
    </AppFrame>
  )
}

function Lane({
  icon,
  tone,
  title,
  count,
  blurb,
  items,
}: {
  icon: string
  tone: string
  title: string
  count: number
  blurb: string
  items: MockItem[]
}) {
  return (
    <div className="mb-3">
      <div className="mb-1.5 flex items-baseline gap-2">
        <p className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wider text-ink-muted">
          <i className={clsx('bi', icon, tone)} />
          {title}
          <span className="rounded-full border border-edge/25 px-1 font-mono text-[8px] text-ink-faint">
            {count}
          </span>
        </p>
        <p className="hidden text-[8px] text-ink-faint sm:block">{blurb}</p>
      </div>

      <div className="grid gap-1.5">
        {items.map((item) => (
          <Card key={item.description} item={item} />
        ))}
      </div>
    </div>
  )
}

function Card({ item }: { item: MockItem }) {
  return (
    <div className="panel relative overflow-hidden rounded-xl pl-1">
      <span className={clsx('absolute inset-y-0 left-0 w-0.5', PRIORITY_STRIPE[item.priority])} />

      <div className="p-2.5">
        <div className="mb-1 flex flex-wrap items-center gap-1">
          <MockBadge icon={item.typeIcon}>{item.type}</MockBadge>
          <MockBadge tone={item.statusTone}>{item.status}</MockBadge>
          <MockBadge tone={CONF_TONE[item.confidence]} icon="bi-graph-up">
            {item.confidence}
          </MockBadge>
          <MockBadge tone={RISK_TONE[item.risk]} icon="bi-shield-exclamation">
            {item.risk}
          </MockBadge>
        </div>

        <p className="text-[11px] font-semibold leading-snug">{item.description}</p>

        <div className="mt-1 flex flex-wrap items-center gap-x-2.5 text-[8px] text-ink-muted">
          <span>
            <i className="bi bi-person mr-0.5" />
            {item.owner}
          </span>
          <span>
            <i className="bi bi-calendar3 mr-0.5" />
            {item.deadline}
          </span>
          <span className="font-mono">
            <i className="bi bi-stopwatch mr-0.5" />
            {item.timestamp}
          </span>
        </div>

        {item.missing && (
          <p className="mt-1.5 flex flex-wrap items-center gap-1">
            <span className="text-[8px] text-ink-faint">needs</span>
            {item.missing.map((field) => (
              <span
                key={field}
                className="rounded border border-warn/40 bg-warn/10 px-1 font-mono text-[8px] text-warn"
              >
                {field}
              </span>
            ))}
          </p>
        )}

        {item.violation && (
          <div
            className={clsx(
              'mt-1.5 flex items-start gap-1.5 rounded-md border px-1.5 py-1 text-[8px]',
              item.violation.severity === 'BLOCK'
                ? 'border-danger/30 bg-danger/[0.07] text-danger'
                : 'border-warn/30 bg-warn/[0.07] text-warn',
            )}
          >
            <i className="bi bi-slash-circle mt-px" />
            <span>
              {item.violation.message}
              <span className="ml-1 font-mono opacity-60">{item.violation.rule}</span>
            </span>
          </div>
        )}

        <div className="mt-2 flex items-center gap-1 border-t border-edge/20 pt-1.5">
          {item.status !== 'Approved' && (
            <span className="rounded-md border border-ok/50 bg-ok/15 px-1.5 py-0.5 text-[8px] font-medium text-ok">
              <i className="bi bi-check-lg mr-0.5" />
              Approve
            </span>
          )}
          <span className="rounded-md border border-edge/30 bg-surface-strong/70 px-1.5 py-0.5 text-[8px] font-medium">
            <i className="bi bi-pencil mr-0.5" />
            Edit
          </span>
          <span className="rounded-md border border-danger/40 bg-danger/15 px-1.5 py-0.5 text-[8px] font-medium text-danger">
            <i className="bi bi-x-lg mr-0.5" />
            Reject
          </span>
          {item.executable && (
            <span className="glow-accent ml-auto rounded-md bg-accent-fill px-1.5 py-0.5 text-[8px] font-semibold text-accent-on">
              <i className="bi bi-lightning-charge-fill mr-0.5" />
              Execute
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
