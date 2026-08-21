import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative grid min-h-[70dvh] place-items-center px-4">
      <span className="bloom left-1/2 top-1/4 h-56 w-96 -translate-x-1/2" aria-hidden />
      <div className="relative text-center">
        <p className="mono-num text-accent">404</p>
        <h1 className="display mt-3 text-3xl sm:text-4xl">Nothing here</h1>
        <p className="display-sub mx-auto mt-4 max-w-md text-sm text-ink-muted">
          That page does not exist. The docs are the most likely thing you were looking for.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="glow-accent inline-flex items-center gap-2 rounded-xl bg-accent-fill px-4 py-2.5 text-sm font-semibold text-accent-on"
          >
            <i className="bi bi-house" aria-hidden />
            Home
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-xl border border-edge/30 bg-surface-strong/70 px-4 py-2.5 text-sm font-medium"
          >
            <i className="bi bi-book" aria-hidden />
            Documentation
          </Link>
        </div>
      </div>
    </div>
  )
}
