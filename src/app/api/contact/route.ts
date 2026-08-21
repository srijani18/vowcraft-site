import { NextResponse } from 'next/server'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

/**
 * POST /api/contact
 *
 * Validates, then forwards to `CONTACT_FORWARD_URL` when one is configured. With
 * none set it accepts and logs the submission and *says so* in the response, so
 * the UI can tell the truth instead of showing a confirmation for an email that
 * was never sent.
 */

const schema = z.object({
  name: z.string().trim().min(2, 'Enter your name').max(120),
  email: z.string().trim().email('That does not look like an email address'),
  company: z.string().trim().max(160).optional(),
  topic: z.enum(['demo', 'pricing', 'security', 'support', 'other']),
  message: z.string().trim().min(20, 'A little more detail helps us route this').max(4000),
})

/** Crude per-process throttle. Real deployments should use a shared store. */
const recent = new Map<string, number>()
const WINDOW_MS = 30_000

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const last = recent.get(ip) ?? 0
  if (Date.now() - last < WINDOW_MS) {
    return NextResponse.json(
      { ok: false, error: { code: 'too_many_requests', message: 'Please wait a moment before sending again.' } },
      { status: 429 },
    )
  }

  let body: z.infer<typeof schema>
  try {
    body = schema.parse(await req.json())
  } catch (err) {
    const issues = err instanceof z.ZodError ? err.issues : []
    const first = issues[0]
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'invalid_request',
          message: first?.message ?? 'Please check the form and try again.',
          field: first?.path.join('.'),
        },
      },
      { status: 422 },
    )
  }

  recent.set(ip, Date.now())

  const forwardUrl = process.env.CONTACT_FORWARD_URL?.trim()
  if (!forwardUrl) {
    console.log(
      JSON.stringify({
        event: 'contact.received',
        topic: body.topic,
        // The message body is not logged: someone describing a security concern
        // should not have it end up in a log aggregator by default.
        hasMessage: body.message.length > 0,
        to: process.env.CONTACT_TO_EMAIL ?? null,
      }),
    )
    return NextResponse.json({
      ok: true,
      delivered: false,
      message: 'Received. No delivery endpoint is configured on this deployment, so nothing was emailed.',
    })
  }

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 10_000)
    const upstream = await fetch(forwardUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...body, to: process.env.CONTACT_TO_EMAIL }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timer))

    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, error: { code: 'delivery_failed', message: 'We could not deliver that. Please email us directly.' } },
        { status: 502 },
      )
    }
    return NextResponse.json({ ok: true, delivered: true, message: 'Thanks — we will be in touch.' })
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: 'delivery_failed', message: 'We could not deliver that. Please email us directly.' } },
      { status: 502 },
    )
  }
}
