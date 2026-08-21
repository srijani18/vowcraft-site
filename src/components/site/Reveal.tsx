'use client'

import clsx from 'clsx'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Scroll reveal via IntersectionObserver.
 *
 * The hidden state lives in CSS and the observer only ever *adds* the revealed
 * class, so if JavaScript never runs the content is still visible — a landing
 * page that hides its own copy behind an animation is a landing page nobody can
 * read. `prefers-reduced-motion` is honoured in CSS for the same reason.
 *
 * `once: true` by default: re-animating on every scroll-by is distracting on a
 * long page, and nobody needs to be told twice that a section exists.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  id,
  as: Tag = 'div',
}: {
  children: ReactNode
  /** Milliseconds, for staggering siblings. */
  delay?: number
  className?: string
  /** Set when the revealed block is also an in-page anchor target. */
  id?: string
  as?: 'div' | 'section' | 'li' | 'span'
}) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Bail out on browsers without the API rather than leaving content hidden.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      // Fire slightly before the element arrives, so the transition finishes
      // roughly as it reaches a comfortable reading position.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={clsx('reveal', visible && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
