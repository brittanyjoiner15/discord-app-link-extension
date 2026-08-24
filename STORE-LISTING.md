# Chrome Web Store submission copy

Ready-to-paste copy for the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
Fill each field in the dashboard with the matching section below.

> **Before you start:** publishing requires a one-time **$5 developer
> registration fee**, and review usually takes a few days.

---

## ⚠️ Read first — the extension name

Google (and Discord's trademark) frown on names that imply official
affiliation. **"Discord → App"** is fine as a repo name but risky as a store
name. Safer store name options:

- `Open Links in Discord App` ✅ recommended
- `Discord App Redirect (unofficial)`
- `Jump to Discord App`

Whichever you pick, add the "not affiliated" line (in the description below) and
keep using the generic pop-out icon — **do not** use Discord's logo or wordmark
in the icon or screenshots.

---

## Name
*(max 75 chars — keep it short)*

```
Open Links in Discord App
```

## Summary / short description
*(max 132 chars — shown in search results)*

```
Opens Discord web links in the Discord desktop app instead of the browser, then closes the leftover tab.
```

## Category

```
Productivity
```
*(alternative: "Tools")*

## Language

```
English (United States)
```

## Detailed description
*(paste into the "Description" box)*

```
Prefer the Discord desktop app over the web client? This extension sends Discord links straight to the app.

When you open a Discord web link — a channel, DM, server, user profile, invite, or event — it hands off to the Discord desktop app via Discord's discord:// deep link, then closes the now-empty browser tab once the app takes focus.

WHAT IT REDIRECTS
• Channels, DMs, and servers
• User profiles (discord.com/users/…)
• Invites and scheduled events

WHAT IT LEAVES IN THE BROWSER (on purpose)
• Login, registration, and "Sign in with Discord" (OAuth) flows
• The Discord Developer Portal
• Terms, privacy, and other marketing/legal pages

HOW IT WORKS
It's a lightweight Manifest V3 content script. It only reads the URL of the Discord page you open and redirects it. There is no background process, it makes no network requests, and it collects no data of any kind.

REQUIREMENTS
The Discord desktop app must be installed and have run at least once (that's what registers the discord:// handler with your operating system). On the first redirect your browser will ask "Open Discord?" — choose "Always allow" to skip the prompt from then on.

Need the web client temporarily? Just toggle the extension off from chrome://extensions.

This is an independent, open-source tool and is NOT affiliated with, endorsed by, or sponsored by Discord Inc. "Discord" is a trademark of Discord Inc.
```

## Single purpose description
*(dashboard → "Privacy practices" tab)*

```
The extension has a single purpose: to redirect Discord web URLs to the Discord desktop application via the discord:// protocol.
```

## Permission justifications
*(dashboard → "Privacy practices" tab)*

**Host permission — `discord.com` (and `www.`, `canary.`, `ptb.` subdomains):**

```
The extension runs a content script only on Discord's web hosts so it can read the current page's path and redirect it to the equivalent discord:// deep link. Access is limited to these hosts because those are the only URLs it acts on.
```

**Remote code:** None. All code is contained in the package.

## Data usage disclosures
*(check the boxes accordingly — all "No")*

- Does NOT collect or use personally identifiable information.
- Does NOT collect health, financial, authentication, personal
  communications, location, web history, or user activity data.
- Does NOT sell or transfer any user data (there is none).

Suggested certification statement:

```
This extension does not collect, store, or transmit any user data. It reads the URL of Discord pages you open solely to redirect them to the desktop app.
```

---

## Assets you'll need to upload

| Asset | Size | Notes |
|-------|------|-------|
| Store icon | 128×128 PNG | `icons/icon-128.png` (already in repo) |
| Screenshot(s) | 1280×800 or 640×400 PNG/JPG | At least 1 required. See idea below. |
| Small promo tile *(optional)* | 440×280 PNG/JPG | Only if you want featured placement |
| Marquee promo tile *(optional)* | 1400×560 PNG/JPG | Optional |

**Screenshot idea:** a browser window showing a Discord link + the "Open
Discord?" prompt with "Always allow" checked, or a simple before/after graphic
("click link in browser → opens in app"). Keep the Discord logo out of it.

---

## Homepage / support URL

```
https://github.com/brittanyjoiner15/discord-app-link-extension
```

## Suggested store tags/keywords
*(reflected via the description; CWS has no separate keyword field)*

discord, desktop app, deep link, redirect, productivity, open in app
