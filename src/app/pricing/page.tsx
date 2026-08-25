import type { Metadata } from 'next'
import { CTA } from '@/components/site/CTA'
import { Faq } from '@/components/site/Faq'
import { PricingTable } from '@/components/site/PricingTable'
import { Reveal } from '@/components/site/Reveal'
import { Section, SectionHeading } from '@/components/site/Section'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Self-host it for free with local models, or let us host it. Every plan includes the full guardrail ' +
    'engine and the complete audit trail.',
}

const COMPARISON = [
  ['Action-item extraction with source quotes', true, true, true],
  ['All sixteen guardrails', true, true, true],
  ['Append-only audit trail', true, true, true],
  ['Bring your own provider keys', true, true, true],
  ['Local models — nothing leaves your machine', true, false, true],
  ['Managed transcription, no keys needed', false, true, true],
  ['Shared team roster and org domains', false, true, true],
  ['SSO and SCIM provisioning', false, false, true],
  ['Custom guardrails and approval chains', false, false, true],
  ['Audit export and retention policy', false, false, true],
  ['Regional data residency', false, false, true],
  ['Named contact and an SLA', false, false, true],
] as const

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-edge/20">
        <span className="bloom -left-20 -top-28 h-72 w-[30rem]" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-14 text-center sm:px-6 sm:pt-20">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-accent">Pricing</p>
            <h1 className="display text-4xl sm:text-5xl lg:text-[3.5rem]">
              Free if you run it yourself
            </h1>
            <p className="display-sub mx-auto mt-5 max-w-2xl text-base text-ink-muted sm:text-lg">
              The whole product is self-hostable with local models, so the free tier is not a crippled
              version — it is the same thing, running on your hardware. Pay us when you would rather not
              operate it.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <PricingTable />

        <Reveal delay={300} className="mt-10">
          <p className="panel mx-auto max-w-2xl rounded-2xl p-5 text-center text-sm leading-relaxed text-ink-muted">
            <i className="bi bi-shield-check mr-2 text-ok" aria-hidden />
            Every plan starts in mock mode. You can walk the entire approval and execution path — including
            the guardrails and the audit log — before connecting a single account or entering a card.
          </p>
        </Reveal>
      </Section>

      <Section className="border-y border-edge/20">
        <SectionHeading eyebrow="Compare" title="What differs between plans" align="center" />

        <Reveal delay={100} className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-edge/25">
                <th className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  Capability
                </th>
                {['Self-hosted', 'Team', 'Compliance'].map((plan) => (
                  <th
                    key={plan}
                    className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-ink-faint"
                  >
                    {plan}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(([label, ...cells]) => (
                <tr key={label as string} className="border-b border-edge/10">
                  <td className="py-2.5 pr-4 text-ink-muted">{label}</td>
                  {(cells as readonly boolean[]).map((included, i) => (
                    <td key={i} className="px-3 py-2.5 text-center">
                      {included ? (
                        <i className="bi bi-check-lg text-ok" aria-label="Included" />
                      ) : (
                        <i className="bi bi-dash text-ink-faint" aria-label="Not included" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Section>

      <Section width="narrow">
        <SectionHeading eyebrow="Questions" title="The ones people actually ask" align="center" />
        <Faq />
      </Section>

      <CTA />
    </>
  )
}
