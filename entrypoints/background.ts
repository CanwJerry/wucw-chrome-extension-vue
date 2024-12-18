export default defineBackground(() => {
  browser.runtime.onMessage.addListener(async (message) => {
    const allTabs = await browser.tabs.query({ active: true, lastFocusedWindow: true });
    const contentScriptMatches = new MatchPattern("*://*/*");
    const contentScriptTabs = allTabs.filter(
      (tab) =>
        tab.id != null &&
        tab.url != null &&
        contentScriptMatches.includes(tab.url),
    );

    const responses = await Promise.all(
      contentScriptTabs.map(async (tab) => {
        const response = await browser.tabs.sendMessage(tab.id!, message);
        return { tab: tab.id, response };
      }),
    );

    return responses;
  });
});
