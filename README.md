## Parts

Client and server needs to stay in sync to avoid auth state errors. SC can't set cookies/headers so we use middleware. Also, server can't know about auth state changes on client so we track this as well.

- `utils/supabase-browser`
  - Used inside client components
- `utils/supabase-server`
  - Used inside server components
- `app/middleware.ts`
  - Server components can't set cookies or headers yet (read-only, see [docs](https://beta.nextjs.org/docs/api-reference/cookies)). So they can't renew `access_token` that's needed for Supabase client.
  - Middleware runs before server components and can write both cookies and headers. Middleware refreshes user's session with `getSession()` call so `access_token` in Supabase client remains up-to-date.
  - Every server component route that uses Supabase client must be added to middleware's `matcher` array.
- `components/supabase-listener`
  - Client component that runs `onAuthStateChange()` every time there's auth state change (e.g login, logout user events).
  - Function checks server's `access_token` against the new instance obtained from browser client (`supabase-browser`). If server !== client, function runs `router.refresh()` to reload active route.
- `app/layout`
  - Fetches server-side session (`supabase-server`) and passes it into `supabase-listener`
