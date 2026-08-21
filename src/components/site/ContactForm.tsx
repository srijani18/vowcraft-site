'use client'

import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

/**
 * Contact form with inline, per-field errors.
 *
 * Notably it does **not** claim delivery it cannot prove: the API reports whether a
 * forwarding endpoint was configured, and the success message reflects that. A form
 * that says "we'll be in touch" when nothing was sent is worse than one that admits
 * it is a demo deployment.
 */

const TOPICS = [
  { value: 'demo', label: 'See a walkthrough' },
  { value: 'pricing', label: 'Pricing and plans' },
  { value: 'security', label: 'Security review' },
  { value: 'support', label: 'Help with my instance' },
  { value: 'other', label: 'Something else' },
] as const

export function ContactForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    company: '',
    topic: 'demo',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [result, setResult] = useState<{ delivered: boolean; message: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const set = (key: keyof typeof values, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }))

  function validate(): Record<string, string> {
    const found: Record<string, string> = {}
    if (values.name.trim().length < 2) found.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      found.email = 'That does not look like an email address.'
    }
    const length = values.message.trim().length
    if (length < 20) {
      found.message = `A little more detail helps us route this — ${20 - length} more characters.`
    }
    return found
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setFormError(null)

    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) {
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus()
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      })
      const json = (await response.json()) as {
        ok?: boolean
        delivered?: boolean
        message?: string
        error?: { message: string; field?: string }
      }

      if (!response.ok || !json.ok) {
        if (json.error?.field) {
          setErrors({ [json.error.field]: json.error.message })
        } else {
          setFormError(json.error?.message ?? 'Something went wrong. Please try again.')
        }
        return
      }

      setResult({ delivered: Boolean(json.delivered), message: json.message ?? 'Received.' })
    } catch {
      setFormError('Could not reach the server. Check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (result) {
    return (
      <div className="panel lit-edge rounded-2xl p-8 text-center">
        <i
          className={clsx('text-3xl', result.delivered ? 'bi bi-check-circle-fill text-ok' : 'bi bi-inbox-fill text-accent')}
          aria-hidden
        />
        <h2 className="mt-4 text-lg font-semibold">
          {result.delivered ? 'Message sent' : 'Message received'}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{result.message}</p>
        <button
          onClick={() => {
            setResult(null)
            setValues({ name: '', email: '', company: '', topic: 'demo', message: '' })
          }}
          className="mt-5 text-sm font-medium text-accent hover:underline"
        >
          Send another
        </button>
      </div>
    )
  }

  const inputClass = (field: string) =>
    clsx(
      'w-full rounded-xl border bg-base px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint',
      'focus-visible:outline-none focus-visible:ring-2',
      errors[field]
        ? 'border-danger/60 focus-visible:border-danger focus-visible:ring-danger/30'
        : 'border-edge/30 focus-visible:border-accent-fill focus-visible:ring-accent-fill/40',
    )

  return (
    <form onSubmit={onSubmit} noValidate className="panel lit-edge space-y-4 rounded-2xl p-6 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="contact-name" label="Your name" error={errors.name} required>
          <input
            id="contact-name"
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            autoComplete="name"
            placeholder="Priya Raman"
            aria-invalid={errors.name ? true : undefined}
            className={inputClass('name')}
          />
        </Field>

        <Field id="contact-email" label="Work email" error={errors.email} required>
          <input
            id="contact-email"
            type="email"
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            autoComplete="email"
            inputMode="email"
            placeholder="you@company.com"
            aria-invalid={errors.email ? true : undefined}
            className={inputClass('email')}
          />
        </Field>

        <Field id="contact-company" label="Company" hint="Optional">
          <input
            id="contact-company"
            value={values.company}
            onChange={(e) => set('company', e.target.value)}
            autoComplete="organization"
            placeholder="Acme"
            className={inputClass('company')}
          />
        </Field>

        <Field id="contact-topic" label="What is this about?">
          <Select
            id="contact-topic"
            value={values.topic}
            onChange={(value) => set('topic', value)}
            options={TOPICS}
            className={inputClass('topic')}
          />
        </Field>
      </div>

      <Field
        id="contact-message"
        label="Message"
        error={errors.message}
        hint={`${values.message.trim().length} characters — 20 minimum`}
        required
      >
        <textarea
          id="contact-message"
          rows={5}
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder="What are you hoping to do, and what is getting in the way?"
          aria-invalid={errors.message ? true : undefined}
          className={inputClass('message')}
        />
      </Field>

      {formError && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-danger/40 bg-danger/10 px-3 py-2.5 text-xs text-danger"
        >
          <i className="bi bi-exclamation-triangle-fill mt-0.5 shrink-0" aria-hidden />
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="glow-accent flex w-full items-center justify-center gap-2 rounded-xl bg-accent-fill px-4 py-2.5 text-sm font-semibold text-accent-on transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <>
            <i className="bi bi-arrow-repeat animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            Send message
            <i className="bi bi-arrow-right text-xs" aria-hidden />
          </>
        )}
      </button>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline gap-1.5 text-xs font-medium text-ink-muted">
        {label}
        {required && (
          <span className="text-danger" aria-label="required">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs text-danger">
          <i className="bi bi-exclamation-circle-fill mt-0.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-[11px] text-ink-faint">{hint}</p>
      )}
    </div>
  )
}

/**
 * A custom listbox rather than a native `<select>`. Browsers render the native
 * control's popup with their own chrome regardless of CSS, so it never matches
 * the rest of the form — this one is built from the same panel/border tokens as
 * every other field.
 */
function Select<T extends string>({
  id,
  value,
  onChange,
  options,
  className,
}: {
  id: string
  value: T
  onChange: (value: T) => void
  options: ReadonlyArray<{ value: T; label: string }>
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, options.findIndex((o) => o.value === value)))
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const selected = options.find((o) => o.value === value) ?? options[0]!

  useEffect(() => {
    if (!open) return
    listRef.current?.focus()

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open])

  function openList() {
    setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)))
    setOpen(true)
  }

  function commit(index: number) {
    const option = options[index]
    if (!option) return
    onChange(option.value)
    setOpen(false)
    buttonRef.current?.focus()
  }

  function onListKeyDown(event: React.KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, options.length - 1))
        break
      case 'ArrowUp':
        event.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
        break
      case 'Home':
        event.preventDefault()
        setActiveIndex(0)
        break
      case 'End':
        event.preventDefault()
        setActiveIndex(options.length - 1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        commit(activeIndex)
        break
      case 'Escape':
      case 'Tab':
        setOpen(false)
        buttonRef.current?.focus()
        break
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            openList()
          } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            setActiveIndex(options.length - 1)
            setOpen(true)
          }
        }}
        className={clsx(className, 'flex items-center justify-between gap-2 text-left')}
      >
        <span className="truncate">{selected.label}</span>
        <i
          className={clsx('bi bi-chevron-down shrink-0 text-[11px] text-ink-faint transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={`${id}-listbox`}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`${id}-option-${activeIndex}`}
          onKeyDown={onListKeyDown}
          className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-edge/30 bg-surface-strong py-1 shadow-lg outline-none"
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={option.value === value}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => commit(index)}
              className={clsx(
                'flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm',
                index === activeIndex ? 'bg-accent-fill/15 text-accent' : 'text-ink',
              )}
            >
              {option.label}
              {option.value === value && <i className="bi bi-check2 text-xs" aria-hidden />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
