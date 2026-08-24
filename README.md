# Discord → App

A tiny Chrome extension that opens Discord **web** links in the Discord
**desktop app** (`discord://…`) instead of loading them in the browser — then
closes the leftover tab once the app takes focus.

Handy if you always prefer the desktop app: clicking a channel, DM, server,
profile, invite, or event link jumps straight into Discord.

<p align="center">
  <img src="icons/icon-128.png" width="96" alt="Discord → App icon">
</p>

## Install (unpacked, from source)

1. Download / clone this repo.
2. Go to `chrome://extensions`.
3. Toggle **Developer mode** on (top-right).
4. Click **Load unpacked** and select this folder.
5. Click any Discord link — the first time, Chrome asks *"Open Discord?"*; check
   **Always allow**, then **Open**. After that it hands off silently.

> After editing any file here, hit the **reload** icon on the extension card for
> changes to take effect.

## What it redirects

Runs on `discord.com`, `www.`, `canary.`, and `ptb.` hosts and sends everything
to the app — channels, DMs, servers, `/users/<id>`, invites, events — as
`discord://-/<same path>` (query string and hash preserved).

### Deliberately kept in the browser

These paths are **not** redirected, because the app can't handle them and
redirecting would silently break things:

| Path | Why it stays in the browser |
|------|------------------------------|
| `/oauth2`, `/login`, `/register`, `/verify`, `/reset` | Auth + "Sign in with Discord" flows on other sites |
| `/developers` | Developer portal (bots/apps) — a web-only tool |
| `/api` | API endpoints |
| `/terms`, `/privacy`, `/nitro`, `/download`, `/blog`, `/jobs`, … | Marketing / legal pages |
| `/` | The landing page |

Edit the `KEEP_IN_BROWSER` list in [`redirect.js`](redirect.js) to change scope.

## How it works

Manifest V3 content script that runs at `document_start`. It reads the current
path, bails on any excluded prefix, otherwise sets `window.location` to the
`discord://` deep link. It closes the tab only on `visibilitychange` (i.e. after
the app takes focus) so the *"Open Discord?"* dialog is never interrupted.

No background worker, no network requests, no data collection, no extra
permissions — it only reads the URL of Discord pages you open.

## Notes & gotchas

- **`discord.gg/<code>` invite links** are on a different domain and aren't
  covered yet. Add `"https://discord.gg/*"` to the `matches` in
  [`manifest.json`](manifest.json) and a case in `redirect.js` to include them.
- The Discord desktop app must be installed and have run at least once — that's
  what registers the `discord://` handler with your OS.
- Need web Discord temporarily (e.g. a machine without the app)? Toggle the
  extension off at `chrome://extensions`.

## Files

- `manifest.json` — MV3 manifest (hosts + icons)
- `redirect.js` — the redirect logic
- `icons/` — extension icon (generic "open externally" glyph; not the Discord
  logo)

## License

MIT — see [`LICENSE`](LICENSE).
