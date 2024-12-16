export default defineBackground(() => {
  // browser.runtime.onInstalled.addListener(async ({ reason }) => {
  //   if (reason === 'install') {
  //     await storage.setItem<string>("local:installDate", 'aaaaaaa');
  //     const a = await storage.getItem<string>('local:installDate');
  //   }
  // });
  console.log(window);
  // if (window.Shopify) {
  //   chrome.scripting.executeScript({
  //     target: {
  //       tabId: tab.id,
  //     },
  //     files: ['content-script.js'],
  //     // func: function
  //     world: 'MAIN'
  //   },)
  // } else {
  //   chrome.notifications.create(
  //     {
  //       type: "basic",
  //       title: "Notifications",
  //       message: "This is not shopify page",
  //       iconUrl: "../icons/candy.png"
  //     }
  //   );
  // }
});
