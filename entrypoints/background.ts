import { CONTENT_SCRIPT_MATCHES } from '../utils/matches';

export default defineBackground(() => {
  browser.runtime.onMessage.addListener(async (message) => {
    const allTabs = await browser.tabs.query({});
    const contentScriptMatches = new MatchPattern(CONTENT_SCRIPT_MATCHES);
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

  browser.tabs.onActivated.addListener(async function(activeInfo) {
    try {
      const response = await browser.tabs.sendMessage(activeInfo.tabId, {
        msg: 'changeTab',
      });
      return { tab: activeInfo.tabId, response };
    } catch (error) {
      console.warn(`Failed to send message to tab ${activeInfo.tabId}:`, error);
    }
  });
});
