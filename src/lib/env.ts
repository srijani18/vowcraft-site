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

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name} is not set. Set it in the environment (see .env.example).`)
  }
  return value
}

export function appUrl(path = ''): string {
  const base = trimSlash(requireEnv('NEXT_PUBLIC_APP_URL'))
  if (!path) return base
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function siteUrl(path = ''): string {
  const base = trimSlash(requireEnv('NEXT_PUBLIC_SITE_URL'))
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
