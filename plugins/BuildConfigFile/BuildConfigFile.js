const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
module.exports = class BuildConfigFile {
  constructor(opts = {}) {
    // 文件名称
    this.filename = opts.filename || "config.json";
    // 要保存到的目录，建议放到打包生产的dist目录下
    this.template =
      opts.template || path.join(process.cwd(), "./dist/index.html");
    // 要输出的json文件内容
    this.configJosn = {
      moduleName: opts.moduleName || "", // 模块名称，建议和子项目模块名称一致
      createTime: new Date(),
      createTimeNum: new Date().valueOf(),
      host: opts.host || "", // 文件前缀，拼接文夹名称要求可以直接访问，否则建议不设置
      linkList: [], // link 资源列表，包含js，css，和其他图片资源
      scriptList: [], // script 脚本文件列表
    };
  }

  apply(compiler) {
    // 如果使用done，必须使用stats.compilitation.assets获取数据
    compiler.hooks.afterEmit.tap("BuildConfigFile", (compilation, callback) => {
      // 所有的文件名称
      // console.log('compilation.assets - keys', Object.keys(compilation.assets))
      // 也就是读取dist目录的index.html
      let result = fs.readFileSync(this.template, "utf-8");
      // 使用工具分析html，推荐使用cheerip，可以直接使用jQuery API
      let $ = cheerio.load(result);
      // 这里是循环遍历生成的多个文件，但是如果有chunk是不需要循环的，一般来说只拿第一个就可以了
      // Object.keys(compilation.assets).forEach(item =>{
      //     $(`<script src="${item}"></script>`).appendTo('body')
      // })
      let linkList = [];
      $("link").each((i, ele) => {
        if (ele.type === "tag" && ele.name === "link") {
          linkList.push({
            link: ele.attribs.href,
            rel: ele.attribs.rel,
            as: ele.attribs.as,
            type: ele.attribs.type,
          });
        }
      });
      $("script").each((i, ele) => {
        if (ele.type === "script" && ele.name === "script") {
          this.configJosn.scriptList.push({
            link: ele.attribs.src,
            chaerset: ele.attribs.chaerset,
            async: ele.attribs.async,
            defer: ele.attribs.defer,
          });
        }
      });
      this.configJosn.linkList = linkList.filter((item) => {
        let flag = true;
        this.configJosn.scriptList.forEach((itm) => {
          if (item.link === itm.link) {
            flag = false;
          }
        });
        return flag;
      });
      // 去重，也就是script的不再包含在link中
      // 写入文件 - 是一个json文件，包含匿名函数自调用
      let filepath = path.join(process.cwd(), `./dist/${this.filename}`);
      let str =
        "MIC_SERVER_CONFIG_CALLBACK(" + JSON.stringify(this.configJosn) + ")";
      fs.writeFileSync(filepath, str);
    });
  }
};
