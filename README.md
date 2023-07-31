# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## 重新构想原子化 CSS

https://antfu.me/posts/reimagine-atomic-css-zh


## tsconfig

~~~
{
  "compilerOptions": {
    /* 
     * 用于拓宽引入非相对模块时的查找路径的。其默认值就是"./"
     * 目的是解决项目代码层级较深相互之间引用起来会比较麻烦的问题，各种 …/,…/…/,…/…/…/ 等等
     * "paths": {
     *    "@vue": ["packages/vue/src"]
     * }
     */
    "baseUrl": ".",
    /* 指定输出目录 */
    "outDir": "dist",
    /* 
     * 是否生成目标文件的sourceMap文件
     * 此文件允许调试器和其他工具在实际使用发出的JavaScript文件时显示原始的TypeScript源代码。
     * 此文件为 .js.map (or .jsx.map) 格式，位于相应的.js 输出文件相同目录
     */
    "sourceMap": false,
    /*
     * 定义了编译后的目标 javascript 版本, 可选择包括es6、es5、esnext
     * 如果需要考虑兼容性问题就可以设置为es5或更低的版本，一般来说，我们需要让他编译为 es5，这样就可以被主流浏览器解读了。
     * 当然，你说我的 react 代码不是给浏览器看的，比如说，你使用的是 react-native 做作手机 app，那么这里的选项可以选择 es6。
     * 如果代码是在高版本的现代浏览器或高版本的node端，就可以设置为esnext
     */
    "target": "esnext",
    /*
     * 告诉编译器对发出的.js文件中的模块使用什么语法。可选择 none、commonjs、amd、system、umd、es2015或esnext
     * 告诉编译器以哪种语法编写代码，意味着必须从哪个代码将其编译为commonjs。
     * 如果用于服务器端项目 如果使用的是Angular前端应用程序，则使用Node.js，然后可能使用CJS 可能不是ESM
     * 较新的JS版本有时包含用于模块导入/导出的更多功能。 将export设置为"module"可以支持这些功能，而这些功能通常尚未添加到官方规范中。例如dynamic import的"ESNext"表达式。
     * 无论如何，编译器的目的是将代码编译成浏览器可理解的语法（commonjs）
     * module影响发出代码的模块语法，而target影响其余代码
     */
    "module": "esnext",
    /*
     * 模块解析策略，ts默认用node的解析策略，即相对的方式导入, 可选值：node、classic
     * 如果未指定，则 --module commonjs 默认为 node，否则默认为 classic（包括 --module 设置为 amd、system、umd、es2015、esnext 等）
     * Node 模块解析是 TypeScript 社区中最常用的，推荐用于大多数项目。 
     * 如果您在 TypeScript 中遇到导入和导出的解析问题，请尝试设置 moduleResolution: “node” 以查看它是否解决了问题。
     */
    "moduleResolution": "node",
    /*
     * 允许在 TS 项目中导入JavaScript文件，而不是仅导入.ts和.tsx文件。即允许ts和tsx文件与现有JavaScript文件共存
     * 例如js文件 @filename: card.js: export const defaultCardDeck = "Heart";
     * ts文件 @filename: index.ts 中引入上面的js变量：import { defaultCardDeck } from "./card";
     * 如果 allowJs 设置为 false, 将会抛出错误。
     */
    "allowJs": false,
    /*
     * 开启所有严格的类型检查
     * true => 同时开启 alwaysStrict, noImplicitAny, noImplicitThis 和 strictNullChecks
     * alwaysStrict：严格模式，为每个文件添加 "use strict"
     * noImplicitAny：不允许隐式 any，如果true，函数的形参必须带类型，如果叫不出class名的js对象，那就得any。比如(d:any)=>{}；如果false, 则允许隐式any,函数的样子更像js (d)=>{}
     * noImplicitThis：不允许 this 为隐式 any
     * strictNullChecks：undefined 和 null 两个空类型的设计，使用上不方便，所以 通过strictNullChecks严格校验类型，让代码更安全
     */
    "strict": true,
    /* 检查只声明、未使用的局部变量(只提示不报错) */
    "noUnusedLocals": true,
    /**
     * 是否启用实验性的装饰器特性,装饰器的语法是ES7的实验性语法, 不打开可能会出现如下错误：
     * Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option to remove this warning.
     */
    "experimentalDecorators": true,
    /** 
     * 防止 ts文件中引入json文件，会报如下红色波浪线。
     * TypeScript 2.9的resolveJsonModule功能，只要我使用ts-node执行应用程序，该功能就可以正常工作
     */
    "resolveJsonModule": true,
    /* 作用是支持使用import d from 'cjs'的方式引入commonjs包 */
    "esModuleInterop": true,
    /* 用于指定是否将编译后的文件注释删掉，设为true的话即删除注释，默认为false */
    "removeComments": false,
    /**
     * 指定jsx代码用于的开发环境: 'preserve', 'react-native', or 'react'
     * preserve:生成代码中会保留JSX以供后续的转换操作使用(比如：Babel).另外,输出文件会带有.jsx扩展名。 
     * react:会生成React.createElement,在使用前不需要再进行转换操作了,输出文件的扩展名为.js。 
     * react-native:相当于preserve,它也保留了所有的JSX,但是输出文件的扩展名是.js
     */
    "jsx": "preserve", 
    /*
     * 编译过程中需要引入的库文件的列表，告诉 typescript 编译器可以使用哪些功能。
     * 比如说，我们这里有一个 dom 的库文件，这个文件会告诉编译器 dom api 的接口，所以当我们在 ts 代码中使用 dom 的时候，比如说执行 “document.getElementById ("root")” 这句话的时候，编译器就会知道该如何进行检查。
     * 如果我们不设置这个选项，那么编译器也有自己默认的库文件列表，一般来说是 ["dom", "es6","DOM.Iterable"] 等等
     */
    "lib": ["esnext", "dom"],
    /* 用于指定需要包含的模块，只有在这里列出的模块的声明文件才会被加载 */
    "types": ["jest", "puppeteer", "node"],  
    /** 
     * 用来指定编译文件的根目录，编译器会在根目录查找入口文件，
     * 如果编译器发现以rootDir的值作为根目录查找入口文件,并不会把所有文件加载进去的话会报错，但是不会停止编译
     */ 
    "rootDir": ".",
    /* 用于设置模块名称到基于baseUrl的路径映射 */
    "paths": {
      "@vue/*": ["packages/*/src"],
      "vue": ["packages/vue/src"]
    }
  },
  /** 
   * include 用于指定要编译的路径列表，但是和files的区别在于，这里的路径可以是文件夹，
   * 也可以是文件，可以使用相对和绝对路径，而且可以使用通配符，
   * 比如"./src"即表示要编译src文件夹下的所有文件以及子文件夹的文件
   */ 
  "include": [
    "packages/global.d.ts",
    "packages/*/src",
    "packages/runtime-dom/types/jsx.d.ts",
    "packages/*/__tests__",
    "test-dts"
  ]
}
~~~