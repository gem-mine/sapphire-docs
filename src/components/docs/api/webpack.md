# webpack 配置

## 支持的功能

脚手架屏蔽了大部分 webpack 繁琐的配置细节，目前支持了以下能力：

* 如果选择支持 IE8，将会支持 IE8 的兼容性处理
* 支持 webpack-dev-server，包括请求代理、热加载
* 支持 webpack dll plugin，作为公共包的优化方案
* 支持输出包使用分析，作为包优化方案依据
* 支持样式模块化处理，支持 css、less、scss、postcss 处理
* 支持样式合并文件，PC 端支持样式文件拆分功能（避免 IE9 下 css 文件太大导致部分样式失效问题）
* 支持小的资源文件 base64 化处理，其余文件会自动带上 hash 值，防止缓存问题
* 支持以下路径别名：
  * config: config 目录 /config
  * components: 组件目录 /src/components
  * styles: 公用样式目录 /src/styles
  * global: 全局功能目录 /src/global
  * fish: 用到 fish UI 组件库时的别名
  * fish-mobile: 用到 fish-mobile UI 组件库时的别名
* 支持 uglifyJS 进行代码压缩
* 支持自动化上传 CDN 处理
* 细节支持：
  * npm start 端口冲突时自动采用可用端口
  * 开发期异常输出到浏览器界面，方便调试（需要选择非 IE8 项目）

**重要：gem-mine 中的 webpack 会根据你是否支持 IE8 进行自行选择，IE8 会选择 webpack 1x，现代浏览器会选择 webpack 3x。这里也不对 webpack 进行包装统一，涉及到细节的配置，请根据不同版本的 webpack 进行。**

## 涉及文件

webpack 配置涉及的文件在 <a href="#/docs/guide/catalogue">目录结构</a> 这一节中详细描述过：

> * `webpack.js` 暴露给开发者的配置文件
> * `webpack` 封装的 webpack 配置目录，通常情况下开发者无须去修改，包含：
>
>   * loaders：存放自定义 webpack loader 目录，在 webpack 常规 loader 无法满足功能需要自己定制 loader 时才会用到
>   * plugins：存放自定义 webpack plugins 目录，在 webpack 常规 plugin 无法满足功能需要自己定制 plugin 时才会用到
>   * helper.js：webpack 常规辅助工具函数，后续 dev.js、production.js、polyfill.js、vendor.js 重度依赖此文件
>   * dev.js：npm start 对应的运行脚本，是一个标准的 webpack 配置文件，用于 webpack 构建开发期的脚本
>   * production.js：npm run build 对应的运行脚本，是一个标准的 webpack 配置文件，用于 webpack 打包上线时的脚本
>   * polyfill.js：npm run polyfill 对应的运行脚本，是一个标准的 webpack 配置文件，用于 webpack 构建 polyfill 文件
>   * vendor.js：npm run vendor 对应的运行脚本，是一个标准的 webpack 配置文件，用于 webpack 构建公共包文件

## 配置说明

webpack.js 支持的配置在该文件的注释中已经有了详细的说明，这里再逐一介绍：

* title：HTML 页面标题栏的名称
* resolve：额外的别名设置，放在 alias 中处理
* buildPath：指定打包输出的目录结构，默认是 /build 目录，你可以指定到磁盘中的有权限写入的任意位置
* publicPath：静态资源路径配置，默认值 `./`，表示的是 `/build` 目录。对于 css 中的图片、字体等路径，以及写入到入口 `index.html` 的 js、css 等路径，都是通过这个值设定的。（如果配置了自动上传 CDN 功能，则此路径无效，会使用 cdn 的路径（cd.host + '/' + cdn.params.path）作为 publicPath）
* cdn：自动化上传 CDN 配置，根据不同 CDN 配置可能会略有不同，并且要求开启前安装对应的工具包。例如七牛 CDN 的配置：

```javascript
// 七牛 CDN 配置
// 开启前请安装依赖包，执行：npm i gem-mine-cdn-qiniu -D
const { QINIU_KEY: key, QINIU_SECRET: secret } = process.env
exports.cdn = {
  // 在哪些环境中启用 cdn，npm_config_env 的值（通过 --env=production 指定）
  env: ['production'],
  // cdn 的包，可以自己实现，默认提供了 七牛（gem-mine-cdn-qiniu）、OSS（gem-mine-cdn-oss 未发布）、CS（gem-mine-cdn-cs 未发布） 方案
  package: 'gem-mine-cdn-qiniu',
  // cdn 的域名
  host: 'http://dn-tomjoke.qbox.me',
  // cdn 的参数，作为参数被上面实现的包接收
  params: {
    bucket: 'tomjoke',
    key, // access_key
    secret, // access_secret
    path: 'static', // 七牛存储对应的路径
    uploadMapFile: false // 是否上传 map 文件
  }
}
```

* port：webpack-dev-server 的端口，默认 9000。当然你可以直接用命令行指定：npm start --port=9001
* vendor：额外要打入公共包的文件，默认已经有 react、redux、cat-eye （、prop-types）相关文件
* loaders：额外的 loader 配置
* plugins：额外的 plugin 配置
* additional：额外第三包配置，这些包是放在 public 目录下，直接在 index.html 中使用
* excludeStyleModule：不需要进行样式模块化的文件或目录（默认 node_modules、styles 目录不会进行样式模块化）
* staticHash：是否需要将资源文件名进行 hash 处理（用来自动处理缓存问题），某些项目需要固定静态资源文件名（缓存方案自行处理）, 可以将其设置为 false
* done：打包结束后的回调函数

可以打开 `config/webpack.js` 来对照查看。
