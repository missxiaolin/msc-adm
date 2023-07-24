import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router"
import { loadPlugins } from "@/plugins"
import { loadDirectives } from "@/directives"

// css
import "uno.css"
import "normalize.css"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import "@/assets/css/index.scss"

const app = createApp(App)
/** 加载插件 */
loadPlugins(app)
/** 加载自定义指令 */
loadDirectives(app)

app.use(router)

router.isReady().then(() => {
  app.mount("#app")
})


// createApp(App).mount('#app')
