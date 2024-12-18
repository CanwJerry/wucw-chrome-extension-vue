import { CONTENT_SCRIPT_MATCHES } from "@/utils/matches";
import { createApp } from "vue";
import ChromeToastTips from '@/components/ChromeToastTips.vue';

export default defineContentScript({
  matches: [ CONTENT_SCRIPT_MATCHES ],
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: '.template-product',
      onMount: (container) => {
        const app = createApp(ChromeToastTips);
        app.mount(container);
        return app;
      },
      onRemove: (app) => {
				if(app) {
					app.unmount();
				}
      },
    });
    ui.mount();
  },
});
