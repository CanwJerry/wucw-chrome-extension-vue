import { defineConfig } from "wxt";
import { CONTENT_SCRIPT_MATCHES } from "./utils/matches";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",

  modules: ["@wxt-dev/module-vue"],

  manifest: {
    name: "Quick Access",
    version: "1.1.2",
    description: "Quick access to your shopify store",
    permissions: ["scripting", "activeTab", "tabs", "notifications", "storage", "clipboardWrite"],
  },
});
