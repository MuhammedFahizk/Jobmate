// ─────────────────────────────────────────────────────────────────────────────
// middleware.ts
//
// ⚠️ Disabled as a hard gate — see AUTH_FLOW.md "Known gotcha" section.
// The refreshToken cookie is scoped to Path=/api/v1/auth, so the browser
// never attaches it to a request for /dashboard (or any frontend page).
// That means this middleware can NEVER see the cookie, even for a fully
// logged-in user right after login — it would incorrectly redirect every
// single visit to /login?redirect=... This was confirmed happening.
//
// Real protection now lives client-side in components/ProtectedRoute.tsx,
// which reads the in-memory Zustand store (populated by login or by the
// silent /auth/refresh call) instead of trying to read a cookie the
// browser won't send here.
//
// This file is left in place, matcher empty, so it's a no-op — remove it
// entirely, or re-enable it, only after the backend widens the cookie to
// Path=/ (see AUTH_FLOW.md for that option).
// ─────────────────────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};