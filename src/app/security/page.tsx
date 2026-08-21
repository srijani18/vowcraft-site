import type { Metadata } from 'next'
import Link from 'next/link'
import { CTA } from '@/components/site/CTA'
import { Reveal } from '@/components/site/Reveal'
import { Section, SectionHeading } from '@/components/site/Section'

export const metadata: Metadata = {
  title: 'Security',
  description:
    'Encryption at rest, the trust model, what leaves your infrastructure, and how the audit trail is ' +
    'made tamper-resistant.',
}

const PRINCIPLES = [
  {
    icon: 'bi-hand-index-thumb',
    title: 'The browser is untrusted',
    body:
      'Risk classification and every guardrail are re-evaluated on the server at execution time, from the ' +
      'database row plus the normalised payload. A request cannot claim to have passed a check, and any ' +
      'risk or approval field it sends is ignored.',
  },
  {
    icon: 'bi-lock-fill',
    title: 'Secrets are bound to their owner',
    body:
      'OAuth tokens and API keys are AES-256-GCM ciphertext whose additional authenticated data binds them ' +
      'to a specific account and service. A row copied elsewhere fails to decrypt rather than quietly ' +
      'working, and an undecryptable row reports as invalid rather than as configured.',
  },
  {
    icon: 'bi-eye-slash-fill',
    title: 'No read path for a stored secret',
    body:
      'There is no endpoint that returns a key, no reveal affordance, and no round-trip edit. Responses ' +
      'carry a masked hint — first five characters and last four — and the logger redacts by key name as ' +
      'a second line of defence.',
  },
  {
    icon: 'bi-shield-check',
    title: 'Fail closed, everywhere',
    body:
      'Mock mode is the default, so an unconfigured instance cannot reach a third party. Approval requests ' +
      'expire into deferred rather than approved. A deployment with no auth provider refuses to start ' +
      'rather than serving one account to everyone.',
  },
  {
    icon: 'bi-journal-lock',
    title: 'The audit trail cannot be rewritten',
    body:
      'Append-only in the code and in the database grants: no update or delete path exists. State changes ' +
      'and their audit rows commit in one transaction, so an executed action cannot exist without its ' +
      'record — and the record outlives the account that produced it.',
  },
  {
    icon: 'bi-hdd-fill',
    title: 'Your data can stay on your hardware',
    body:
      'Local Whisper handles transcription and Ollama handles extraction, both in a container you run. In ' +
      'that configuration no transcript, no audio, and no action item leaves your machine at any point.',
  },
] as const

const DATA_FLOW = [
  ['Audio and transcripts', 'Your database', 'Never sent to us. In local mode, never leaves your host.'],
  ['Provider API keys', 'Your database, encrypted', 'AES-256-GCM, bound to the account. No read endpoint.'],
  ['OAuth tokens', 'Your database, encrypted', 'Refreshed server-side. Never sent to a browser.'],
  ['Passwords', 'Your database, hashed', 'scrypt with a per-account salt and a versioned cost factor.'],
  ['Execution payloads', 'The provider you chose', 'Only after you approve. Recorded verbatim in the audit log.'],
] as const

export default function SecurityPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-edge/20">
        <span className="bloom bloom-warm -right-20 -top-28 h-72 w-[30rem]" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-14 text-center sm:px-6 sm:pt-20">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-accent">Security</p>
            <h1 className="display text-4xl sm:text-5xl">
              An agent with a send button deserves scrutiny
            </h1>
            <p className="display-sub mx-auto mt-5 max-w-2xl text-base text-ink-muted sm:text-lg">
              So here is the trust model, written down before you ask for it — including the parts that are
              not finished.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Principles" title="Six things that are true of the code" />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {PRINCIPLES.map((principle, i) => (
            <Reveal key={principle.title} delay={(i % 2) * 80}>
              <div className="panel h-full rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-fill/15 text-accent">
                    <i className={`bi ${principle.icon}`} aria-hidden />
                  </span>
                  <h3 className="mt-1 text-sm font-semibold leading-snug">{principle.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{principle.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-y border-edge/20">
        <SectionHeading
          eyebrow="Data flow"
          title="Where everything actually goes"
          blurb="There is no telemetry pipeline and no vendor-side copy of your transcripts. In the self-hosted configuration we have no access to anything."
        />

        <Reveal delay={100} className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-edge/25">
                {['Data', 'Where it lives', 'Notes'].map((head) => (
                  <th
                    key={head}
                    className="py-3 pr-4 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-faint"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DATA_FLOW.map(([data, where, notes]) => (
                <tr key={data} className="border-b border-edge/10">
                  <td className="py-3 pr-4 font-medium text-ink">{data}</td>
                  <td className="py-3 pr-4 text-ink-muted">{where}</td>
                  <td className="py-3 pr-4 text-xs text-ink-muted">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Section>

      <Section width="narrow">
        <Reveal>
          <h2 className="display text-2xl sm:text-3xl">What is not done yet</h2>
          <p className="display-sub mt-4 text-base text-ink-muted">
            A security page that lists only strengths is a marketing page. These are the gaps as of today.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              'Password reset by email is not built. An administrator can clear the password on an account so a new one can be set.',
              'SSO and SCIM are on the Compliance plan and not yet generally available.',
              'Session revocation is not instantaneous: sessions are signed cookies with a 14-day life, and rotating a password invalidates all of them immediately, but there is no per-device revocation list.',
              'Rate limiting on the credential-verification endpoint is per process, not shared across instances.',
              'The audit log has no cryptographic chaining yet — it is append-only by code path and database grant, not by hash linkage.',
            ].map((gap) => (
              <li key={gap} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
                <i className="bi bi-dash-circle mt-1 shrink-0 text-warn" aria-hidden />
                {gap}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140} id="disclosure" className="mt-12">
          <div className="panel lit-edge rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <i className="bi bi-bug-fill text-accent" aria-hidden />
              Responsible disclosure
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              If you find a vulnerability, tell us before you tell anyone else and we will work the fix with
              you. We will confirm receipt within two business days, keep you updated, and credit you unless
              you would rather we did not.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Please do not test against another organisation&apos;s instance. Self-hosting takes one
              command, so there is always a target you own.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-edge/30 bg-surface-strong/70 px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent-fill/40"
            >
              <i className="bi bi-envelope" aria-hidden />
              Report something
            </Link>
          </div>
        </Reveal>
      </Section>

      <CTA />
    </>
  )
}
