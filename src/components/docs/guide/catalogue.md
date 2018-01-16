# 目录结构

通过命令行工具，快速创建了项目工程。下面我们来看下项目的目录结构：

```text
project
├── config
│     ├── webpack （大部分情况下无须去修改此目录下文件）
│     │     ├── loaders
│     │     ├── plugins
│     │     ├── helper.js
│     │     ├── dev.js
│     │     ├── production.js
│     │     ├── polyfill.js
│     │     ├── vendor.js
│     ├── constant.js
│     ├── proxy.js
│     ├── webpack.js
├── public
│     ├── index.html
│     ├── polyfill-promise.js
│     ├── polyfill-ie8.js
├── src
│     ├── components
│     ├── global
│     │     ├── model
│     │     ├── routes
│     │     │     ├── index.js
│     │     ├── util
│     │     │     ├── sys.js
│     │     ├── cat-eye.js
│     │     ├── request.js
│     ├── styles
│     ├── App.jsx
│     ├── index.js
├── .babelrc
├── .editorconfig
├── .eslintignore
├── .eslintrc
├── .gem-mine
├── .gitignore
├── .npmrc
├── package.json
├── webpack.config.js
```

脚手架约定的目录结构与文件说明如下：

* `config` 存放项目的 webpack 配置、常量配置、网络请求配置。（<span class="tip">注：常量、网络请求中涉及使用了环境变量，而且是配置，所以放在 config 而不是 src</span>）

  * `webpack.js` 暴露给开发者的配置文件
  * `webpack` 封装的 webpack 配置目录，通常情况下开发者无须去修改，包含：

    * loaders：存放自定义 webpack loader 目录，在 webpack 常规 loader 无法满足功能需要自己定制 loader 时才会用到
    * plugins：存放自定义 webpack plugins 目录，在 webpack 常规 plugin 无法满足功能需要自己定制 plugin 时才会用到
    * helper.js：webpack 常规辅助工具函数，后续 dev.js、production.js、polyfill.js、vendor.js 重度依赖此文件
    * dev.js：npm start 对应的运行脚本，是一个标准的 webpack 配置文件，用于 webpack 构建开发期的脚本
    * production.js：npm run build 对应的运行脚本，是一个标准的 webpack 配置文件，用于 webpack 打包上线时的脚本
    * polyfill.js：npm run polyfill 对应的运行脚本，是一个标准的 webpack 配置文件，用于 webpack 构建 polyfill 文件
    * vendor.js：npm run vendor 对应的运行脚本，是一个标准的 webpack 配置文件，用于 webpack 构建公共包文件

  * `constant.js` 存放常量的配置，可以根据环境变量 env 来设置不同环境变量下常量值
  * `proxy.js` 存放网络请求配置，可以配置不同环境下的网络请求，包括本地开发的 webpack-dev-server 配置

* `public` 系统模块之外的资源目录

  * `index.html` 入口 HTML 文件模板，会被 html-webpack-plugin 处理，如果你要添加一些第三方直接使用的包、一些兼容性处理 等修改模板，例如加入 jquery 等，就需要修改此文件
  * `polyfill-promise.js` IE8-IE11 的 promise 的 polyfill 包
  * `polyfill-ie8.js` 专门针对 IE8 的 polyfill 包，仅在支持 IE8 项目中存在

* `src` 源码目录
  * `components` 组件目录
  * `global` 系统通用功能目录
    * model：通用 model 目录，例如 用户 model，会被多个业务组件使用到时，就放在这里
    * routes：系统路由目录，在这里配置系统中的路由
    * util：通用工具目录，一些通用函数可以放在这里
    * cat-eye.js：cat-eye 配置文件
    * request.js：网络请求的切面配置文件，可以配置全局 或 某个域的请求配置（例如 before、loading、error 等通用处理）
  * `styles` 样式目录，一般存放一些全局的样式，注意：这里的样式文件不会被 css 模块化处理
  * `App.jsx` 组件入口文件，被 index.js 调用
  * `index.js` 项目入口文件

剩余的是一些常规配置文件，例如 .babelrc、.eslintrc 等。最外的 webpack.config.js 只是作为 webpack 入口配置文件，无须修改此文件。
