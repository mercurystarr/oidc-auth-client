# oidc-auth-client

Minimal React SPA implementing OAuth2/OIDC Authorization Code + PKCE
against [oidc-auth-server](https://github.com/mercurystarr/oidc-auth-server),
a hand-built Spring Boot auth server. Built to learn the client side of
the protocol.

`demo-client` is a public client (no client secret), so the SPA performs
PKCE generation, the `/authorize` redirect, and the token exchange itself
via `oidc-client-ts` / `react-oidc-context`, rather than going through a
backend-for-frontend.

## Features

- Login via Authorization Code + PKCE, redirecting to the server's
  Spring Security form login
- Return-to-origin redirect: landing on a protected route while logged
  out and then logging in sends you back to that route, not just home
- Automatic silent token renew using the refresh token grant
- Logout (clears local session state; see note below)
- `/profile` as an example protected route, showing decoded ID token
  claims
- A Bearer-token fetch wrapper (`useApiClient`), unused for now since
  there's no protected resource server in this project yet

**Logout note:** this server doesn't implement RP-Initiated Logout
(no `end_session_endpoint`), so "Log out" only clears local OIDC state.
The server's own login session cookie is untouched, so a subsequent
"Log in" will silently reuse it rather than showing the login form again.

## Prerequisites

- Node `^20.19.0` or `>=22.12.0`
- [oidc-auth-server](https://github.com/mercurystarr/oidc-auth-server)
  running locally on port `9000`

## Setup

```bash
npm install
npm run dev
```

The dev server is pinned to port `9700` (`demo-client`'s registered
redirect URI is `http://localhost:9700/callback`).

Log in with the server's in-memory demo user: `test-user` / `password`.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — typecheck (`tsc -b`) and build for production
- `npm run lint` — run oxlint
- `npm run preview` — preview the production build locally