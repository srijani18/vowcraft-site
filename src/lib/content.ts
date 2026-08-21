/**
 * Site content as data. Copy lives here rather than inline in JSX so a page is a
 * layout and nothing else — which is what makes it possible to change the
 * messaging without reading a component.
 *
 * Claims here are drawn from what the product actually does. Nothing below
 * describes a capability the application has not shipped; the roadmap section is
 * labelled as such.
 */

export interface Feature {
  slug: string
  icon: string
  title: string
  tagline: string
  body: string
  points: string[]
  shipped: boolean
}

export const PILLARS: readonly Feature[] = [
  {
    slug: 'grounded-extraction',
    icon: 'bi-diagram-3',
    title: 'Every action traced to a sentence',
    tagline: 'No invented tasks.',
    body:
      'An extracted action carries its owner, its deadline, its priority, a confidence score, and — ' +
      'critically — the timestamp and the exact quote it came from. You can judge whether it is real ' +
      'without replaying the meeting.',
    points: [
      'Verb-first descriptions with a named owner',
      'Deadlines taken from what was said, not guessed',
      'Confidence reported honestly, including LOW',
      'Anything ungrounded is left blank rather than invented',
    ],
    shipped: true,
  },
  {
    slug: 'human-approval',
    icon: 'bi-hand-index-thumb',
    title: 'The agent proposes. You decide.',
    tagline: 'Nothing executes on its own.',
    body:
      'Every action is classified by what it would actually do in the world — reversible and private, ' +
      'visible to colleagues, or reaching outside the company — and the ceremony scales to match. ' +
      'High-risk actions make you type the word.',
    points: [
      'Three risk tiers, computed from the live payload',
      'Approve, edit, reject, or defer — per item or in bulk',
      'A confirmation modal showing the exact payload to be sent',
      'Auto-execution is opt-in, off by default, and never available above low risk',
    ],
    shipped: true,
  },
  {
    slug: 'guardrails',
    icon: 'bi-shield-check',
    title: 'Seventeen guardrails that cannot be argued with',
    tagline: 'Enforced on the server, every time.',
    body:
      'No weekend meetings. Nothing outside working hours. No double-booking. No deadline in the past. ' +
      'No external email without explicit approval. The browser gets to explain the rules; only the ' +
      'server gets to enforce them.',
    points: [
      'Scheduling, validation, and policy rules in one enumerable set',
      'Re-evaluated at execution time from the database row',
      'Blocking rules name themselves and the fix',
      'Pure functions — testable without a database or a clock',
    ],
    shipped: true,
  },
  {
    slug: 'execution',
    icon: 'bi-lightning-charge-fill',
    title: 'Real side effects, exactly once',
    tagline: 'Calendar, Notion, Gmail, SendGrid, Slack.',
    body:
      'Approved actions become calendar invites, task pages, drafted or delivered email, and scheduled ' +
      'reminders. Bounded retries with full jitter, idempotency keyed on the payload, and a recorded ' +
      'result for every attempt — including the ones that failed.',
    points: [
      'Five adapters behind one interface',
      'Idempotency that survives a process restart, not just a debounce',
      'Non-idempotent sends are never retried after an uncertain failure',
      'The exact payload sent is stored, so an execution can be reconstructed',
    ],
    shipped: true,
  },
  {
    slug: 'audit',
    icon: 'bi-journal-text',
    title: 'An audit trail you can hand to a regulator',
    tagline: 'Append-only, by construction.',
    body:
      'Proposal, decision, and outcome, each with before-and-after snapshots and the rule ids involved. ' +
      'There is no update or delete path anywhere in the codebase, and the record outlives the account ' +
      'that produced it.',
    points: [
      'One audit row per state change, in the same transaction',
      'Blocked attempts are recorded, not silently dropped',
      'Filterable by event, item, and time',
      'Deleting a user does not erase what was done in the world',
    ],
    shipped: true,
  },
  {
    slug: 'byok',
    icon: 'bi-key-fill',
    title: 'Your keys, your quota, your data',
    tagline: '31 providers. 14 of them free.',
    body:
      'Bring your own keys for transcription, extraction, translation, and search — encrypted at rest ' +
      'with the ciphertext bound to your account. Or run the models locally and let nothing leave your ' +
      'machine at all.',
    points: [
      'Free tiers listed first, with their real allowances',
      'AES-256-GCM at rest; no read path for a stored secret',
      'One-click verification against each provider',
      'Local Whisper and Ollama for fully offline operation',
    ],
    shipped: true,
  },
]

export const ROADMAP: readonly Feature[] = [
  {
    slug: 'live-capture',
    icon: 'bi-camera-video',
    title: 'Live Teams and Meet capture',
    tagline: 'Coming next',
    body: 'Streaming transcription with voice activity detection, so the action items land as the call ends.',
    points: ['Streaming ASR over WebSocket', 'Voice activity detection', 'No manual start or stop'],
    shipped: false,
  },
  {
    slug: 'semantic-search',
    icon: 'bi-search',
    title: 'Semantic search across every transcript',
    tagline: 'Coming next',
    body: '"What did they say about the budget?" finds the moment even when nobody used the word.',
    points: ['pgvector over segment embeddings', 'Jump straight to the audio', 'Free embedding providers'],
    shipped: false,
  },
  {
    slug: 'workflows',
    icon: 'bi-diagram-2',
    title: 'Multi-step workflows',
    tagline: 'Coming next',
    body: '"Onboard a new hire" fans out into ordered sub-tasks that halt on the first real failure.',
    points: ['Dependency graph', 'Sequential or parallel', 'Progress per sub-task'],
    shipped: false,
  },
]

export const HOW_IT_WORKS = [
  {
    icon: 'bi-mic-fill',
    title: 'Record or upload',
    body: 'Drop in a recording, or let it sit in the background of a call. Video has its audio extracted automatically.',
  },
  {
    icon: 'bi-soundwave',
    title: 'Transcribe and separate',
    body: 'Auto-detected language across 50+ tongues, word-level timings, and speakers labelled and named.',
  },
  {
    icon: 'bi-diagram-3',
    title: 'Extract what was committed to',
    body: 'Owners, deadlines, priorities — each one anchored to the moment in the recording that produced it.',
  },
  {
    icon: 'bi-shield-check',
    title: 'Review inside the guardrails',
    body: 'Approve, fix, or reject. Rules you set decide what is even offered as executable.',
  },
  {
    icon: 'bi-lightning-charge-fill',
    title: 'Execute, once, on the record',
    body: 'Invites go out, tasks appear, drafts are written — and every attempt is recorded permanently.',
  },
] as const

export const INTEGRATIONS = [
  { name: 'Google Calendar', icon: 'bi-calendar-event' },
  { name: 'Notion', icon: 'bi-journal-richtext' },
  { name: 'Gmail', icon: 'bi-envelope' },
  { name: 'SendGrid', icon: 'bi-send' },
  { name: 'Slack', icon: 'bi-slack' },
  { name: 'Whisper', icon: 'bi-soundwave' },
  { name: 'Groq', icon: 'bi-cpu' },
  { name: 'Gemini', icon: 'bi-stars' },
  { name: 'Claude', icon: 'bi-chat-square-text' },
  { name: 'Deepgram', icon: 'bi-broadcast' },
  { name: 'AssemblyAI', icon: 'bi-file-earmark-music' },
  { name: 'DeepL', icon: 'bi-translate' },
  { name: 'Ollama', icon: 'bi-hdd-rack' },
  { name: 'pgvector', icon: 'bi-search' },
] as const

// ─────────────────────────────────────────────────────────────── pricing ──

export interface Plan {
  id: string
  name: string
  tagline: string
  monthly: number | null
  annual: number | null
  /** Rendered instead of a price when there isn't one. */
  priceNote?: string
  cta: string
  highlight?: boolean
  includes: string[]
  limits: string[]
}

export const PLANS: readonly Plan[] = [
  {
    id: 'self-hosted',
    name: 'Self-hosted',
    tagline: 'Run it yourself. Nothing leaves your machine.',
    monthly: 0,
    annual: 0,
    cta: 'Read the docs',
    includes: [
      'Every feature, no seat limit',
      'Local Whisper and Ollama — fully offline',
      'Bring your own provider keys',
      'Docker Compose, one command',
      'Full audit trail',
    ],
    limits: ['You operate the database and the models', 'Community support'],
  },
  {
    id: 'team',
    name: 'Team',
    tagline: 'Hosted, with the guardrails already configured.',
    monthly: 19,
    annual: 15,
    cta: 'Start free',
    highlight: true,
    includes: [
      'Everything in Self-hosted, hosted for you',
      'Managed transcription — no keys needed to start',
      'Shared team roster and org domains',
      'Approval history across the whole team',
      'Live Teams and Meet capture as it ships',
      'Email support, one business day',
    ],
    limits: ['Per user, per month', '40 hours of audio per user per month'],
  },
  {
    id: 'compliance',
    name: 'Compliance',
    tagline: 'For teams that have to prove what happened.',
    monthly: null,
    annual: null,
    priceNote: "Let's talk",
    cta: 'Contact us',
    includes: [
      'Everything in Team',
      'Immutable audit export and retention policy',
      'SSO and SCIM provisioning',
      'Custom guardrails and approval chains',
      'Regional data residency',
      'Named contact and an SLA',
    ],
    limits: ['Annual agreement', 'Security review welcomed'],
  },
]

export const FAQ = [
  {
    q: 'Can it act without asking me?',
    a:
      'Not unless you turn that on, and then only for actions classified low risk with high confidence — ' +
      'drafts, private notes, a hold on your own calendar. The setting is off by default. Medium and ' +
      'high risk always require an explicit decision, and that cannot be disabled.',
  },
  {
    q: 'What stops it scheduling a meeting at 3am on a Sunday?',
    a:
      'A rule engine that runs on the server on every execution attempt, using the working hours, ' +
      'weekend policy, meeting limits, and buffers you set. The browser is treated as untrusted: a ' +
      'request cannot claim to have passed a guardrail.',
  },
  {
    q: 'Do I have to give you API keys?',
    a:
      'No. Self-hosted runs Whisper and an open model locally, so nothing leaves your machine. If you ' +
      'do add keys they are encrypted at rest with the ciphertext bound to your account, there is no ' +
      'endpoint that returns one, and 14 of the 31 supported providers have a free tier.',
  },
  {
    q: 'What happens if an integration fails halfway?',
    a:
      'Transient failures retry three times with exponential backoff and full jitter. Anything that ' +
      'cannot succeed later is not retried at all. A send that may already have landed is recorded as ' +
      'uncertain rather than repeated — a missing email is recoverable, a duplicate to a customer is not.',
  },
  {
    q: 'Can I trust the audit log?',
    a:
      'It is append-only in the code and in the database permissions: no part of the application can ' +
      'update or delete a row. State changes and their audit entries commit in the same transaction, so ' +
      'an executed action cannot exist without its record.',
  },
  {
    q: 'Which languages does it handle?',
    a:
      'Language is auto-detected across 50+ languages, with word-level timings and speaker separation ' +
      'in each. A translation layer can then read the transcript back in another language.',
  },
] as const

// ───────────────────────────────────────────────────────────────── docs ──

export interface DocSection {
  heading: string
  paragraphs?: string[]
  list?: string[]
  code?: { language: string; content: string }
  callout?: { tone: 'note' | 'warn'; text: string }
  table?: { head: string[]; rows: string[][] }
}

export interface Doc {
  slug: string
  title: string
  summary: string
  icon: string
  group: string
  readMinutes: number
  sections: DocSection[]
}

export const DOCS: readonly Doc[] = [
  {
    slug: 'quickstart',
    title: 'Quickstart',
    summary: 'A working instance with seeded data in one command, no API keys.',
    icon: 'bi-rocket-takeoff',
    group: 'Getting started',
    readMinutes: 3,
    sections: [
      {
        heading: 'Run it',
        paragraphs: [
          'Docker is the only prerequisite. The stack brings up PostgreSQL, applies the schema, seeds a demo meeting, and serves the dashboard.',
        ],
        code: {
          language: 'bash',
          content: 'git clone <your-fork> voice2brd\ncd voice2brd\ndocker compose up --build\n\n# → http://localhost:3000/dashboard',
        },
      },
      {
        heading: 'What you get',
        paragraphs: [
          'The seed creates two meetings whose action items exercise every path through the product, so there is something real to review immediately.',
        ],
        table: {
          head: ['Group', 'Count', 'What it demonstrates'],
          rows: [
            ['Ready to Execute', '4', 'One per action type: calendar, task, email, reminder'],
            ['Needs Clarification', '2', 'Missing required fields; a low-confidence external email'],
            ['Informational', '3', 'Two notes with nothing to execute, one rejected item'],
            ['Edge cases', '6', 'Superseded action, dependency chain, weekend guardrail, one executed'],
          ],
        },
      },
      {
        heading: 'Nothing reaches the outside world',
        callout: {
          tone: 'note',
          text: 'INTEGRATIONS_MODE defaults to mock. Every action type executes end to end and returns a labelled simulated result, so you can walk the entire approval path before connecting a single account.',
        },
      },
      {
        heading: 'Verify it behaves as specified',
        paragraphs: [
          'The smoke suite exercises the acceptance criteria from the specs against a running instance — grouping, guardrails, idempotency, the credential vault, and the audit trail.',
        ],
        code: { language: 'bash', content: 'sh scripts/smoke.sh' },
      },
    ],
  },
  {
    slug: 'concepts',
    title: 'Core concepts',
    summary: 'Status, readiness, risk, and how the three differ.',
    icon: 'bi-lightbulb',
    group: 'Getting started',
    readMinutes: 5,
    sections: [
      {
        heading: 'Three words that are easy to confuse',
        table: {
          head: ['Term', 'Answers', 'Stored?'],
          rows: [
            ['status', 'What did the human decide?', 'Yes — a state machine'],
            ['readiness', 'Could this execute right now?', 'No — derived every read'],
            ['risk tier', 'How much ceremony does executing require?', 'No — computed from the live payload'],
          ],
        },
      },
      {
        heading: 'Why readiness is never stored',
        paragraphs: [
          'Readiness is a function of the current payload. An item missing its start time is not ready; add one and it becomes ready in the same instant. Storing it would let the label drift from the thing it describes, and a reviewer would act on the label.',
        ],
      },
      {
        heading: 'Why risk is recomputed',
        paragraphs: [
          'An email to two colleagues is medium risk. Add one external recipient and the same action becomes high risk — it now leaves the company. That has to take effect the moment the recipient is added, not whenever the row was last written.',
        ],
        callout: {
          tone: 'warn',
          text: 'Rules may raise a risk tier and never lower one. No ordering of signals can accidentally downgrade a dangerous action.',
        },
      },
      {
        heading: 'The status state machine',
        list: [
          'PROPOSED → APPROVED, REJECTED, or DEFERRED',
          'APPROVED → EXECUTING (server only) or back to PROPOSED',
          'EXECUTING → EXECUTED or FAILED',
          'FAILED → EXECUTING on retry',
          'EXECUTED is terminal: the side effect exists, so undoing means a compensating action',
        ],
      },
    ],
  },
  {
    slug: 'guardrails',
    title: 'Guardrails',
    summary: 'The seventeen rules, what each blocks, and how to add one.',
    icon: 'bi-shield-check',
    group: 'Safety',
    readMinutes: 6,
    sections: [
      {
        heading: 'Scheduling',
        table: {
          head: ['Rule', 'Severity', 'Blocks'],
          rows: [
            ['SCHED_PAST', 'BLOCK', 'A start time already in the past'],
            ['SCHED_WEEKEND', 'BLOCK', 'Saturday and Sunday, unless you allow them'],
            ['SCHED_HOURS', 'BLOCK', 'Anything outside your working hours, in your zone'],
            ['SCHED_MAX_DURATION', 'BLOCK', 'Meetings longer than your maximum'],
            ['SCHED_CONFLICT', 'BLOCK', 'Overlap with an existing busy event'],
            ['SCHED_DND', 'BLOCK', 'Lunch, focus time, and out-of-office blocks'],
            ['SCHED_BUFFER', 'WARN', 'Less than your preferred gap between meetings'],
          ],
        },
      },
      {
        heading: 'Validation',
        table: {
          head: ['Rule', 'Severity', 'Blocks'],
          rows: [
            ['VAL_REQUIRED_FIELDS', 'BLOCK', 'A required payload field that is missing'],
            ['VAL_DEADLINE_PAST', 'BLOCK', 'A due date in the past'],
            ['VAL_EMAIL_FORMAT', 'BLOCK', 'A malformed recipient address'],
            ['VAL_OWNER_KNOWN', 'WARN', 'An owner who is not on your roster'],
            ['VAL_BUDGET_APPROVAL', 'BLOCK', 'Money above your limit without sign-off'],
          ],
        },
      },
      {
        heading: 'Policy',
        table: {
          head: ['Rule', 'Severity', 'Blocks'],
          rows: [
            ['POL_SUPERSEDED', 'BLOCK', 'An action the conversation later replaced'],
            ['POL_EXTERNAL_EMAIL', 'BLOCK', 'External recipients without explicit approval'],
            ['POL_NO_FINANCIAL_AUTOEXEC', 'BLOCK', 'Financial actions without a human decision'],
            ['POL_EXPORT_CONSENT', 'BLOCK', 'A data export without recorded consent'],
            ['POL_CONTRADICTS_DECISION', 'WARN', 'An action contradicting a recorded decision'],
          ],
        },
      },
      {
        heading: 'Adding your own',
        paragraphs: [
          'A rule is a pure function from context to an optional violation. It receives the current time rather than reading the clock, and it performs no I/O — which is what makes "no meetings on a Sunday" a unit test rather than a hope.',
        ],
        code: {
          language: 'typescript',
          content: `export const SCHED_NO_FRIDAY_PM: Rule = {
  id: 'SCHED_NO_FRIDAY_PM',
  appliesTo: ['CALENDAR'],
  severity: 'BLOCK',
  evaluate(ctx) {
    const window = scheduledWindow(ctx)
    if (!window) return null
    const { weekday, hour } = zonedParts(window.start, ctx.settings.timeZone)
    if (weekday !== 5 || hour < 14) return null
    return {
      ruleId: 'SCHED_NO_FRIDAY_PM',
      severity: 'BLOCK',
      field: 'startsAt',
      message: 'No meetings after 2pm on a Friday.',
      remedy: 'Move it earlier, or to next week.',
    }
  },
}`,
        },
      },
      {
        heading: 'Then register it',
        paragraphs: ['One line. Nothing in the UI, the API, or the executor changes.'],
        code: {
          language: 'typescript',
          content: `export const SCHEDULING_RULES = [
  SCHED_PAST,
  // …
  SCHED_NO_FRIDAY_PM,
]`,
        },
      },
    ],
  },
  {
    slug: 'integrations',
    title: 'Integrations',
    summary: 'The five adapters, OAuth, retries, and writing your own.',
    icon: 'bi-plug',
    group: 'Safety',
    readMinutes: 6,
    sections: [
      {
        heading: 'What ships',
        table: {
          head: ['Provider', 'Handles', 'Auth', 'Notes'],
          rows: [
            ['Google Calendar', 'CALENDAR', 'OAuth + PKCE', 'Client-supplied event id makes retries safe'],
            ['Notion', 'TASK', 'OAuth', 'Creates a page in your task database'],
            ['Gmail', 'EMAIL', 'OAuth + PKCE', 'Sends as you; can save a draft'],
            ['SendGrid', 'EMAIL', 'API key', 'Sends as the org; cannot save drafts'],
            ['Slack', 'REMINDER', 'OAuth', 'chat.scheduleMessage'],
          ],
        },
      },
      {
        heading: 'Two email providers, on purpose',
        paragraphs: [
          'Gmail sends as the user and can save a draft, which makes it the reversible option and therefore the default. SendGrid sends as the organisation from a verified domain, needs no per-user consent, and works unattended.',
        ],
        callout: {
          tone: 'warn',
          text: 'SendGrid cannot save a draft, and a draft is classified low risk precisely because nothing is sent. Its validator therefore refuses a draft payload outright rather than delivering it — routing an action to SendGrid can never quietly turn a low-risk approval into a real outbound email.',
        },
      },
      {
        heading: 'Retry policy',
        paragraphs: [
          'Retry only what can succeed later: 429 and 5xx, connection resets, timeouts. A malformed calendar event is malformed on the third try too, so 400, 403, 404, 409, and 422 fail immediately with the provider’s own message.',
          'Backoff is exponential with full jitter, so a provider outage does not produce a synchronised thundering herd when many items are executed at once.',
        ],
      },
      {
        heading: 'Adding a provider',
        paragraphs: [
          'Implement five methods and add one registry line. No change to the UI, the services, or the domain layer.',
        ],
        code: {
          language: 'typescript',
          content: `export const asana: IntegrationProvider<TaskPayload, AsanaTask> = {
  id: 'asana',
  displayName: 'Asana',
  capability: 'TASK',
  auth: 'oauth',
  scopes: ['tasks:write'],
  idempotent: false,
  isConfigured: () => Boolean(process.env.ASANA_CLIENT_ID),
  schema: payloadSchema,
  validate: (p) => payloadSchema.parse(p),
  preview: (p) => ({ /* consequence + field table */ }),
  authorizeUrl: (state, redirectUri, challenge) => '…',
  exchangeCode: async (code, redirectUri, verifier) => ({ /* TokenSet */ }),
  refresh: async (refreshToken) => ({ /* TokenSet */ }),
  execute: async (payload, ctx) => ({ /* ProviderResult */ }),
}`,
        },
      },
    ],
  },
  {
    slug: 'api',
    title: 'API reference',
    summary: 'Every endpoint, its shape, and the error envelope.',
    icon: 'bi-code-slash',
    group: 'Reference',
    readMinutes: 7,
    sections: [
      {
        heading: 'Action items',
        table: {
          head: ['Method', 'Path', 'Purpose'],
          rows: [
            ['GET', '/api/action-items', 'List with nine composable filters, counts, and facets'],
            ['GET', '/api/action-items/:id', 'One item with its computed fields'],
            ['PATCH', '/api/action-items/:id', 'Status transitions and edits'],
            ['POST', '/api/action-items/:id/execute', 'Dry-run preview or real execution'],
            ['POST', '/api/action-items/bulk', 'Approve, reject, or defer up to 100'],
          ],
        },
      },
      {
        heading: 'Settings, profile, and the vault',
        table: {
          head: ['Method', 'Path', 'Purpose'],
          rows: [
            ['GET / PATCH', '/api/settings', 'The guardrail envelope'],
            ['GET / PATCH / DELETE', '/api/profile', 'Identity and account deletion'],
            ['POST', '/api/profile/password', 'Rotate a password; the current one is required'],
            ['GET', '/api/credentials', 'Provider catalogue with masked hints only'],
            ['PUT / DELETE', '/api/credentials/:service', 'Store or remove a key'],
            ['POST', '/api/credentials/:service/verify', 'Live check against the provider'],
            ['GET', '/api/audit-log', 'The append-only trail; no write verb exists'],
            ['GET', '/api/overview', 'Aggregates for the landing dashboard'],
            ['GET', '/api/health', 'Liveness, mode, and provider registry'],
          ],
        },
      },
      {
        heading: 'Executing an action',
        paragraphs: [
          'A dry run returns the preview, the risk assessment, and any warnings without changing anything. It never opens an execution attempt and never consumes the idempotency key.',
        ],
        code: {
          language: 'bash',
          content: `# preview first
curl -X POST localhost:3000/api/action-items/$ID/execute \\
  -H 'content-type: application/json' \\
  -d '{"dryRun": true}'

# then for real
curl -X POST localhost:3000/api/action-items/$ID/execute \\
  -H 'content-type: application/json' -d '{}'`,
        },
      },
      {
        heading: 'One error envelope, stable codes',
        paragraphs: [
          'Every failure has the same shape and a code you can branch on. The code is part of the contract; the message is for a human.',
        ],
        code: {
          language: 'json',
          content: `{
  "error": {
    "code": "guardrail_blocked",
    "message": "Falls on Saturday. Weekend meetings are disabled for this workspace.",
    "details": [{ "ruleId": "SCHED_WEEKEND", "severity": "BLOCK" }]
  }
}`,
        },
      },
      {
        heading: 'Codes worth handling',
        table: {
          head: ['Code', 'Status', 'Meaning'],
          rows: [
            ['not_approved', '409', 'Approve the item before executing'],
            ['approval_required', '409', 'Its risk tier needs an explicit decision'],
            ['guardrail_blocked', '422', 'A blocking rule refused it; `details` names which'],
            ['invalid_payload', '422', 'The provider rejected the shape; field paths included'],
            ['blocked_by_dependency', '409', 'Its blocker has not executed yet'],
            ['already_executed', '409', 'Executed already, with different details'],
            ['reauth_required', '409', 'The integration needs reconnecting'],
            ['illegal_transition', '422', 'That status change is not in the state machine'],
          ],
        },
      },
    ],
  },
  {
    slug: 'self-hosting',
    title: 'Self-hosting',
    summary: 'Deployment topology, environment, and going live safely.',
    icon: 'bi-hdd-network',
    group: 'Reference',
    readMinutes: 5,
    sections: [
      {
        heading: 'Topology',
        paragraphs: [
          'The Node tier never loads an ML model. All inference sits behind an HTTP contract, which is what makes "run Whisper on your own hardware, keep the dashboard in the cloud" a deployment choice rather than a rewrite.',
        ],
        table: {
          head: ['Component', 'Runtime', 'Typical host'],
          rows: [
            ['web', 'Next.js 15', 'Vercel or any container host'],
            ['db', 'PostgreSQL 16', 'Managed Postgres'],
            ['asr', 'Python, WhisperX + pyannote', 'Render, or your own GPU box'],
          ],
        },
      },
      {
        heading: 'The variables that matter',
        table: {
          head: ['Variable', 'Default', 'Why'],
          rows: [
            ['DATABASE_URL', '—', 'Required. The app will not start without it.'],
            ['APP_ENCRYPTION_KEY', '—', '32 random bytes, base64. Without it, secrets cannot be stored.'],
            ['INTEGRATIONS_MODE', 'mock', 'Set to live only deliberately.'],
            ['CREDENTIALS_ENV_LOCKED', 'false', 'Set true to make the environment authoritative over user keys.'],
          ],
        },
        code: { language: 'bash', content: 'openssl rand -base64 32   # APP_ENCRYPTION_KEY' },
      },
      {
        heading: 'Before you switch to live',
        list: [
          'Set APP_ENCRYPTION_KEY and confirm /api/health reports encryptionConfigured: true',
          'Configure your working hours, org domains, and budget limit — these are the guardrails',
          'Connect one integration and execute one low-risk action end to end',
          'Confirm the audit log shows the execution with the exact payload sent',
          'Leave autoExecuteLowRisk off until you trust the extraction on your own recordings',
        ],
        callout: {
          tone: 'warn',
          text: 'Mock mode is the default so an unconfigured instance is never one click away from emailing a stranger. Switching to live is a deliberate act, and it should be the last thing you do, not the first.',
        },
      },
    ],
  },
]

export const DOC_GROUPS = ['Getting started', 'Safety', 'Reference'] as const

export function findDoc(slug: string): Doc | undefined {
  return DOCS.find((d) => d.slug === slug)
}
