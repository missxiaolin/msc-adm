import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router";
import { loadPlugins } from "@/plugins";
import { loadDirectives } from "@/directives";
import { loadSvg } from "@/icons";
import store from "@/store";

// import "@/router/permission"

// import {init,  } from "../../../../monitor-sdk/packages/web/src/index";
// import {init, getCookie } from "../../msc-sdk/packages/web/src/index";

// var baseURL = "https://msc-serve.missxiaolin.com";

// if (window.location.href.indexOf("http://localhost") > -1) {
//   baseURL = "http://127.0.0.1:9001";
// }
// init({
//   monitorAppId: "adm",
//   uuId: () => getCookie("userId"),
//   watch: {
//     pageChange: true,
//     jsError: true,
//     vueError: true,
//     promise: true,
//     performance: true,
//     whiteScreen: true,
//     click: true,
//     resource: true,
//     request: true,
//   },
//   report: {
//     url: baseURL + "/api/update", //错误上报地址
//     reportType: 1, // 1:fetch 2:img 3
//     maxQueues: 100, // img 尽量限制在 10条
//     encryption: 0,
//     delay: 30000,
//   },
//   customInfo: {
//     getDynamic: () => {
//       //获取动态传参  1.4.5版本及以后支持该方式
//     },
//   },
// });
// css
import "uno.css";
import "normalize.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "vxe-table/lib/style.css";
import "vxe-table-plugin-element/dist/style.css";
import "@/assets/css/index.scss";

// highlight 的样式，依赖包，组件
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

const app = createApp(App);
/** 加载插件 */
loadPlugins(app);
/** 加载自定义指令 */
loadDirectives(app);
/** 加载全局 SVG */
loadSvg(app);

app.use(hljsVuePlugin)

app.use(store).use(router);

router.isReady().then(() => {
  app.mount("#app");
});
