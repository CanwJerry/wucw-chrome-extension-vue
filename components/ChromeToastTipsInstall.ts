import { App, createVNode, render, VNode } from "vue";

import Tips from "./ChromeToastTips.vue";

export default {
  install(app: App) {
    const vNode: VNode = createVNode(Tips);
    render(vNode, document.body);
    app.config.globalProperties.$tips = {
      show: vNode.component?.exposed?.show,
      hide: vNode.component?.exposed?.close,
    };
    // app.config.globalProperties.$tips.show() //测试效果
  },
};
