# Discord → App

Tiny Chrome extension. Redirects Discord **web** links to the Discord **desktop
app** (`discord://…`) instead of loading them in the browser, then closes the
leftover tab once the app takes focus.

## Install (unpacked)

1. Go to `chrome://extensions`
2. Toggle **Developer mode** on (top-right)
3. Click **Load unpacked** and select this folder
   (`discord-app-link-extension/`)
4. Click a Discord link — the first time, Chrome asks "Open Discord?"; check
   **Always allow**, then **Open**. After that it hands off silently.

After editing any file here, hit the **reload** icon on the extension card for
changes to take effect.

No icon is included (Chrome shows a default puzzle-piece — harmless).

## What it redirects

Runs on `discord.com`, `www.`, `canary.`, and `ptb.` hosts. Sends everything to
the app — channels, DMs, servers, `/users/<id>`, invites, events — as
`discord://-/<same path>`.

### Deliberately kept in the browser

These paths are **not** redirected, because the app can't handle them and
redirecting silently breaks things:

- `/oauth2`, `/login`, `/register`, `/verify`, `/reset` — auth + "Sign in with
  Discord" flows on other websites
- `/developers` — the developer portal (bots/apps), a web-only tool
- `/api`
- Marketing/legal pages: `/terms`, `/privacy`, `/guidelines`, `/nitro`,
  `/download`, `/blog`, `/jobs`, etc.
- The root landing page `/`

To change the scope, edit `KEEP_IN_BROWSER` in `redirect.js`.

## Notes / gotchas

- **`discord.gg/<code>` invite links** live on a different domain and aren't
  covered. Add `"https://discord.gg/*"` to `manifest.json` matches and a case
  in `redirect.js` if you want those too.
- If a redirect ever lands you somewhere wrong in the app, the deep-link is
  built in one place in `redirect.js` (`discord://-" + path + …`).
- The Discord desktop app must be installed and have run once — that's what
  registers the `discord://` handler with your OS.
