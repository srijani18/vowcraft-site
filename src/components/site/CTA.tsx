import { Reveal } from './Reveal'
import { appUrl, signupUrl } from '@/lib/env'

/**
 * Closing call to action. The second button is deliberately the docs rather than a
 * demo request: the whole product runs locally in one command, so the strongest
 * next step is "try it", not "talk to us".
 */
export function CTA() {
  return (
    <section className="relative overflow-hidden border-y border-edge/20">
      <span className="bloom -top-40 left-1/2 h-72 w-[36rem] -translate-x-1/2" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24">
        <Reveal>
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl">
            Stop rewriting your own meeting notes
          </h2>
          <p className="display-sub mx-auto mt-5 max-w-xl text-base text-ink-muted sm:text-lg">
            One command brings up the whole thing with a seeded meeting to review. No API keys, no
            credit card, and nothing reaching the outside world until you approve it.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={signupUrl()}
              className="glow-accent inline-flex items-center gap-2 rounded-xl bg-accent-fill px-5 py-3 text-sm font-semibold text-accent-on transition-all hover:brightness-110"
            >
              Create your account
              <i className="bi bi-arrow-right text-xs" aria-hidden />
            </a>
            <a
              href="/docs/quickstart"
              className="inline-flex items-center gap-2 rounded-xl border border-edge/30 bg-surface-strong/70 px-5 py-3 text-sm font-medium transition-colors hover:border-accent-fill/40 hover:bg-surface-strong"
            >
              <i className="bi bi-terminal" aria-hidden />
              Run it locally
            </a>
          </div>

          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-ink-faint">
            <span>
              <i className="bi bi-shield-check mr-1.5 text-ok" aria-hidden />
              Mock mode by default
            </span>
            <span>
              <i className="bi bi-hdd mr-1.5" aria-hidden />
              Self-hostable, fully offline
            </span>
            <span>
              <i className="bi bi-box-arrow-up-right mr-1.5" aria-hidden />
              <a href={appUrl('/dashboard')} className="hover:text-accent hover:underline">
                Already have an account?
              </a>
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
