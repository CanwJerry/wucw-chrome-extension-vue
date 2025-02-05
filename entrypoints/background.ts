import { CONTENT_SCRIPT_MATCHES } from '../utils/matches';

export default defineBackground(() => {
  browser.runtime.onMessage.addListener(async (message) => {
    const allTabs = await browser.tabs.query({});
    const contentScriptMatches = new MatchPattern(CONTENT_SCRIPT_MATCHES);
    const contentScriptTabs = allTabs.filter(
      (tab) => tab?.id != null && tab?.url != null && contentScriptMatches.includes(tab?.url)
    );

    const responses = await Promise.all(
      contentScriptTabs.map(async (tab) => {
        if(tab.active) {
          try {
            const response = await browser.tabs.sendMessage(tab.id!, message);
            return { tab: tab.id, response };
          } catch (error) {
            console.warn(`Failed to send message to tab ${tab.id}:`, error);
            return { tab: tab.id, response: null };
          }
        } else {
          return { tab: null, response: null };
        }
      }),
    );
    
    return responses;
  });

  browser.tabs.onActivated.addListener(async function(activeInfo) {
    try {
      const tab = await browser.tabs.get(activeInfo.tabId);

      // 检查标签页 URL 是否匹配内容脚本的匹配模式
      const contentScriptMatches = new MatchPattern(CONTENT_SCRIPT_MATCHES);
      if (!tab.url || !contentScriptMatches.includes(tab.url)) {
        return;
      }
      
      const response = await browser.tabs.sendMessage(activeInfo.tabId, {
        msg: 'changeTab',
        tabId: activeInfo.tabId
      });
      
      return { tab: activeInfo.tabId, response };
    } catch (error) {
      console.warn(`Failed to send message to tab ${activeInfo.tabId}:`, error);
    }
  });
});
