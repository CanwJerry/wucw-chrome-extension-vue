import { CONTENT_SCRIPT_MATCHES } from "../utils/matches";
import { createApp } from "vue";
import ChromeToastTips from "../components/ChromeToastTips.vue";

export default defineContentScript({
  matches: [CONTENT_SCRIPT_MATCHES],
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: "inline",
      anchor: "body",
      onMount: (container) => {
        const app = createApp(ChromeToastTips);
        app.mount(container);
        return app;
      },
      onRemove: (app) => {
        if (app) {
          app.unmount();
        }
      },
    });

    ui.mount();

    browser.runtime.onMessage.addListener(async (req) => {
      try {
        if (browser.runtime.id === undefined) {
          // Extension context is invalid
          return;
        }

        if (req.msg === "currentPage") {
          req.env === "pro" && pro("currentPage");
          req.env === "dev" && dev("currentPage");
        } else if (req.msg === "QRCode") {
          req.env === "pro" && pro("QRCode");
          req.env === "dev" && dev("QRCode");
        } else if (req.msg === "getPdId") {
          req.env === "pro" && pro("getPdId");
          req.env === "dev" && dev("getPdId");
        } else if (req.msg === "changeTab") {
          tips("", "");
        }
      } catch (error) {
        console.error("Extension context error:", error);
        // Optionally notify the user that they need to refresh the page
        tips("Extension error. Please refresh the page.", "");
      }
    });

    function pro(data: string) {
      let proUrl;
      
      if (window.location.href.indexOf("/?_ab=0&_fd=0&_sc=1") > -1) {
        proUrl = window.location.href.replace("/?_ab=0&_fd=0&_sc=1", "");
      } else {
        proUrl = window.location.href;
      }

      switch (data) {
        case "currentPage":
          copyFunc("生产环境链接复制成功", proUrl);
          break;
        case "QRCode":
          copyFunc("QRCode", proUrl, true);
          break;
        case "getPdId":
          getProductInfo();
          break;
      }
    }

    function dev(data: string) {
      if (window.document.getElementById("preview-bar-iframe")) {
        const isIFrame = (
          input: HTMLElement | null
        ): input is HTMLIFrameElement =>
          input !== null && input.tagName === "IFRAME";
        const iframeBox = window.document.getElementById("preview-bar-iframe");
        let iframeDoc;
        if (isIFrame(iframeBox) && iframeBox.contentWindow) {
          iframeDoc = iframeBox && iframeBox.contentWindow.document;
        }
        const url = (
          iframeDoc?.getElementById("share_theme_url") as HTMLInputElement
        ).value;
        const pathName = window.location.pathname;
        const search = window.location.search;
        const devUrl = `${url}${pathName}${search}` || "";

        switch (data) {
          case "currentPage":
            copyFunc("开发环境链接复制成功", devUrl, false);
            break;
          case "QRCode":
            copyFunc("QRCode", devUrl, true);
            break;
          case "getPdId":
            getProductInfo();
            break;
        }
      } else {
        tips("当前不是测试环境", "");
      }
    }

    function copyFunc(
      msg: string,
      url: string,
      showCode: boolean = false
    ): void {
      tips(msg, url, showCode);

      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      try {
        textarea.select();
        document.execCommand("copy");
        console.log("复制成功:", url);
      } catch (err) {
        console.error("复制失败:", err);
      } finally {
        document.body.removeChild(textarea);
      }
    }

    function getProductInfo() {
      if (window.location.pathname.indexOf("/products") > -1) {
        tips("加载中..✨✨", "");
        fetch(`${window.location.href.split("?")[0]}.json`)
          .then((response) => response.json())
          .then((data) => {
            const title = data.product.title;
            const length = data.product.variants.length;
            const str = title.concat("<br/>VARIANTS : " + length);
            copyFunc(str, data.product.id);
          })
          .catch((error) => {
            tips("出错了~😱", "");
          });
      } else {
        tips("当前不在产品页面 😰", "");
      }
    }

    function tips(
      msg: string | null,
      url: string | null,
      showCode: boolean = false
    ) {
      storage.setItem("local:tips", { msg: msg, url: url, showCode: showCode });
    }
  },
});
