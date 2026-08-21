/**
 * Environment access for the marketing site.
 *
 * `NEXT_PUBLIC_APP_URL` is the single value that moves the whole site between
 * local, staging, and production: every "Open the app", "Log in", and "Sign up"
 * destination is derived from it rather than hardcoded per link.
 */

function trimSlash(value: string): string {
  return value.replace(/\/+$/, '')
}

export function appUrl(path = ''): string {
  // Static `process.env.NEXT_PUBLIC_*` access, required so Next.js can inline
  // the value into the client bundle — a dynamic lookup would read `undefined`
  // in the browser even when the variable is set.
  const value = process.env.NEXT_PUBLIC_APP_URL
  if (!value) {
    throw new Error('NEXT_PUBLIC_APP_URL is not set. Set it in the environment (see .env.example).')
  }
  const base = trimSlash(value)
  if (!path) return base
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function siteUrl(path = ''): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL
  if (!value) {
    throw new Error('NEXT_PUBLIC_SITE_URL is not set. Set it in the environment (see .env.example).')
  }
  const base = trimSlash(value)
  return path ? `${base}${path.startsWith('/') ? path : `/${path}`}` : base
}

/**
 * Login and sign-up destinations. Authentication happens entirely in the
 * application — this site only ever links to it, so no credential passes through
 * here and there is nothing to forward or store.
 */
export function loginUrl(): string {
  return appUrl('/login')
}

export function signupUrl(): string {
  return appUrl('/signup')
}
