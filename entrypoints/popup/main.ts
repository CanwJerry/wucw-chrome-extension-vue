import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./style.css";
// import Tips from "../../components/ChromeToastTipsInstall";
import App from "./App.vue";

// type Tips = {
//   show: () => void,
//   hide: () => void
// }

// declare module '@vue/runtime-core' {
//   export interface ComponentCustomProperties {
//     $Tips: Tips
//   }
// }

const app = createApp(App);

// app.use(Tips);
app.use(ElementPlus);
app.mount("#app");
