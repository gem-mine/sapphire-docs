# 目录结构

通过命令行工具，快速创建了项目工程。下面我们来看下项目的目录结构：

```text
project
├── config [存放项目的 webpack 配置、常量配置、网络请求配置]
│     ├── webpack [webpack 核心配置，大部分情况下无须去修改此目录下文件]
│     │     ├── helper [webpack 工具函数，webpack 的能力都是由这里提供组装]
│     │     ├── loaders [自定义的 loaders]
│     │     ├── plugins [自定义的 plugins]
│     │     ├── scripts [提供的一些自动化脚本]
│     │     ├── constant.js [webpack 需要的常量]
│     │     ├── dev.js [development 模式下的打包，是一个完整的 webpack 配置文件]
│     │     ├── production.js [production 模式下的打包，是一个完整的 webpack 配置文件]
│     │     ├── polyfill.js [将 polyfill 进行打包]
│     │     ├── postcss.config.js [postcss 配置文件]
│     │     ├── vendor.js [将一些公共包进行打包，使用 dll]
│     ├── constant.js [开发者定义的常量，可以根据环境变量进行区分]
│     ├── proxy.js [网络请求配置，可以根据不同环境进行区分]
│     ├── webpack.js [开发者进行 webpack 的基本配置]
├── public
│     ├── partial [代码片段，会被直出到页面]
│     ├── index.html [首页]
│     ├── favicon.ico
│     ├── polyfill-promise.js
├── src
│     ├── components [组件，业务代码主要开发在这里]
│     ├── global [一些全局设定]
│     │     ├── model [全局 model，会被自动加载]
│     │     ├── routes [路由配置]
│     │     ├── util [一些工具函数]
│     │     ├── durex.js [redux 封装后的全局设定文件]
│     │     ├── request.js [请求切面配置，可以设定全局或者某个 API 域]
│     ├── styles [全局样式，这里的样式不会被模块化，即带上 hash 值]
│     ├── App.jsx [组件首页]
│     ├── index.js [应用启动脚本]
├── .babelrc [babel 配置]
├── .editorconfig [editor 配置]
├── .eslintignore [eslint ignore 配置]
├── .eslintrc [eslint 配置]
├── .gitignore [git ignore 配置]
├── .npmrc [npm 配置]
├── .sapphire [sapphire 配置信息]
├── .stylelintrc [style lint 配置]
├── package.json
├── webpack.config.js [webpack 配置入口，会根据不同环境加载不同配置文件]
```

脚手架约定的目录结构与文件说明如下：

* `config` 存放项目的 webpack 配置、常量配置、网络请求配置。（<span class="tip">注：常量、网络请求中涉及使用了环境变量，而且是配置，所以放在 config 而不是 src</span>）

  * `webpack.js` 暴露给开发者的配置文件。如果该配置不能满足需求时才考虑去修改 webpack 目录下对应的配置。
  * `webpack` 封装的 webpack 配置目录，**通常情况下开发者无须去修改**，包含：

    * helper：webpack 常规辅助工具函数放在此目录下，后续 dev.js、production.js、polyfill.js、vendor.js 重度依赖此文件
    * loaders：存放自定义 webpack loader 目录，在 webpack 常规 loader 无法满足功能需要自己定制 loader 时才会用到
    * plugins：存放自定义 webpack plugins 目录，在 webpack 常规 plugin 无法满足功能需要自己定制 plugin 时才会用到
    * scripts：一些提供给 npm scripts 的脚本，目前有 lint 脚本 
    * dev.js：npm start 对应的运行脚本，是一个标准的 webpack 配置文件，用于 webpack 构建开发期的脚本
    * production.js：npm run build 对应的运行脚本，是一个标准的 webpack 配置文件，用于 webpack 打包上线时的脚本
    * polyfill.js：npm run polyfill 对应的运行脚本，是一个标准的 webpack 配置文件，用于 webpack 构建 polyfill 文件
    * postcss.config.js：postcss 配置文件
    * vendor.js：npm run vendor 对应的运行脚本，是一个标准的 webpack 配置文件，用于 webpack 构建公共包文件

  * `constant.js` 存放常量的配置，可以根据环境变量 env 来设置不同环境变量下常量值
  * `proxy.js` 存放网络请求配置，可以配置不同环境下的网络请求，包括本地开发的 webpack-dev-server 配置

* `public` 系统模块之外的资源目录

  * `index.html` 入口 HTML 文件模板，会被 html-webpack-plugin 处理，如果你要添加一些第三方直接使用的包、一些兼容性处理 等修改模板，例如加入 jquery 等，就需要修改此文件
  * `partial`：该目录存放一些局部模板，目前提供了 loading.html 作为直出的页面等待效果
  * `polyfill-promise.js` promise 的 polyfill 包

* `src` 源码目录
  * `components` 组件目录
  * `global` 系统通用功能目录
    * model：通用 model 目录，例如 用户 model，会被多个业务组件使用到时，就放在这里
    * routes：系统路由目录，在这里配置系统中的路由
    * util：通用工具目录，一些通用函数可以放在这里
    * durex.js：@gem-mine/durex 配置文件，负责处理 redux 的配置，通常不需要进行配置
    * request.js：网络请求的切面配置文件，可以配置全局 或 某个域的请求配置（例如 before、loading、error 等通用处理）
  * `styles` 样式目录，一般存放一些全局的样式，注意：这里的样式文件不会被 css 模块化处理
  * `App.jsx` 组件入口文件，被 index.js 调用
  * `index.js` 项目入口文件

剩余的是一些常规配置文件，例如 .babelrc、.eslintrc 等。最外的 webpack.config.js 只是作为 webpack 入口配置文件，无须修改此文件。
