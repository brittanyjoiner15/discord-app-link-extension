// Closes the leftover blank tab after a Discord link hands off to the desktop
// app. Content scripts can't do this themselves: Chrome blocks window.close()
// on tabs the user opened (e.g. by clicking a link in Slack or email).
//
// Pending tab IDs live in storage.session (not a variable) because the service
// worker can be shut down while the "Open Discord?" dialog is waiting on you.

const KEY = "pendingTabs";

async function getPending() {
  const data = await chrome.storage.session.get(KEY);
  return data[KEY] || [];
}

async function setPending(ids) {
  await chrome.storage.session.set({ [KEY]: ids });
}

async function closeTab(tabId) {
  await setPending((await getPending()).filter((id) => id !== tabId));
  // The tab may already be gone if the user closed it by hand.
  chrome.tabs.remove(tabId).catch(() => {});
}

chrome.runtime.onMessage.addListener((msg, sender) => {
  const tabId = sender.tab?.id;
  if (tabId == null) return;

  if (msg === "redirected") {
    getPending().then((ids) => {
      if (!ids.includes(tabId)) setPending([...ids, tabId]);
    });
  } else if (msg === "hidden") {
    closeTab(tabId);
  }
});

// WINDOW_ID_NONE means focus left Chrome entirely — i.e. the Discord app
// opened. The "Open Discord?" dialog is Chrome UI, so it does NOT trigger
// this, which means we never close the tab before you can click "Open".
chrome.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId !== chrome.windows.WINDOW_ID_NONE) return;
  for (const tabId of await getPending()) closeTab(tabId);
});

// Forget tabs the user closed (or navigated) on their own.
chrome.tabs.onRemoved.addListener(async (tabId) => {
  const ids = await getPending();
  if (ids.includes(tabId)) setPending(ids.filter((id) => id !== tabId));
});
