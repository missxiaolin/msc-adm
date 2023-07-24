// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
const path = require("path");
// const BuildConfigFile = require('./plugins/BuildConfigFile/BuildConfigFile')
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const apiConfig = require("./envApi");
function resolve(dir) {
  return path.join(__dirname, dir);
}

// const cdn = require("./config/monster");

module.exports = {
  outputDir: "dist",
  lintOnSave: true,
  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.extensions.merge([".vue", ".ts", ".json"]).end();
    config.resolve.alias
      .set("@", resolve("src"))
      .set("components", resolve("src/components"));
    // ============注入cdn start============
    // config.plugin("html").tap((args) => {
    //   args[0].cdn = cdn;
    //   return args;
    // });
  },
  // 在多核机器下会默认开启。
  parallel: require("os").cpus().length > 1,
  // PWA 插件的选项。
  pwa: {},
  // 配置 webpack-dev-server 行为。
  devServer: {
    // open: process.env.NODE_ENV === "development" ,
    host: "", // 不设置默认 Local 为 'localhost' Network 为 当前Ip 设置后Local、Network统一为设置后host
    port: "8094",
    https: true, //是否开启 https
    // hotOnly: true, //host 是否唯一
    open: true, //是否自动打开浏览器
    proxy: "", // string | Object
    // disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    // before: (app) => {},
  },
  // 第三方插件的选项
  // pluginOptions: {},
};
