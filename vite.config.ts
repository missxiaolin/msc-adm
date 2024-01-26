import { defineConfig } from 'vite'
import path, { resolve } from "path"
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
import svgLoader from "vite-svg-loader"
import UnoCSS from "unocss/vite"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import eslint from 'vite-plugin-eslint' // 新增

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      /** @ 符号指向 src 目录 */
      "@": resolve(__dirname, "./src")
    }
  },
  server: {
    /** 是否开启 HTTPS */
    https: false,
    /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
    host: true, // host: "0.0.0.0"
    /** 端口号 */
    port: 8888,
    /** 是否自动打开浏览器 */
    open: false,
    /** 跨域设置允许 */
    cors: true,
    /** 端口被占用时，是否直接退出 */
    strictPort: false,
    /** 接口代理 */
    proxy: {
      "/api": {
        target: "",
        ws: true,
        /** 是否允许跨域 */
        changeOrigin: true,
        rewrite: (path) => path.replace("/api", "")
      }
    }
  },
  build: {
    /** 消除打包大小超过 500kb 警告 */
    chunkSizeWarningLimit: 2000,
    /** Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效 */
    minify: "terser",
    /** 在打包代码时移除 console.log、debugger 和 注释 */
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
        pure_funcs: ["console.log"]
      },
      format: {
        /** 删除注释 */
        comments: false
      }
    },
    /** 打包后静态资源目录 */
    assetsDir: "static",
    sourcemap: true
  },
  /** Vite 插件 */
  plugins: [
    vue(),
    // eslint(),
    vueJsx(),
    /** 将 SVG 静态图转化为 Vue 组件 */
    svgLoader({ defaultImport: "url" }),
    /** SVG */
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
      symbolId: "icon-[dir]-[name]"
    }),
    /** UnoCSS */
    UnoCSS()
  ],
  
})
