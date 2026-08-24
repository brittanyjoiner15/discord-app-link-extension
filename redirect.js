// Fires at document_start on the Discord web client hosts. Redirects the page
// to the Discord desktop app via its custom protocol, then closes the leftover
// tab once the app takes focus.
(function () {
  // Paths that MUST stay in the browser — the app can't handle them, and
  // redirecting them silently breaks things (external "Sign in with Discord",
  // the developer portal, legal/marketing pages, etc.).
  const KEEP_IN_BROWSER = [
    "/oauth2",      // authorize flows — powers "Login with Discord" elsewhere
    "/login",
    "/register",
    "/verify",
    "/reset",
    "/developers",  // developer portal (bots/apps) — web-only tool
    "/api",
    "/terms",
    "/privacy",
    "/guidelines",
    "/licenses",
    "/company",
    "/branding",
    "/jobs",
    "/careers",
    "/blog",
    "/nitro",
    "/download",
    "/safety",
    "/acknowledgements",
  ];

  const path = location.pathname;

  // Bail on the root/marketing landing page and any excluded prefix.
  if (path === "/" || path === "") return;
  for (const prefix of KEEP_IN_BROWSER) {
    if (path === prefix || path.startsWith(prefix + "/")) return;
  }

  // discord://-/<same path> is the desktop app's deep-link scheme. Keep the
  // query string and hash so things like ?jump= still work.
  window.location.href = "discord://-" + path + location.search + location.hash;

  // Don't close on a timer — that would yank the tab (and the "Open Discord?"
  // dialog) before you can tick "Always allow". Wait until the tab loses
  // visibility, which only happens AFTER the app opens and takes focus.
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) window.close();
  });
})();
