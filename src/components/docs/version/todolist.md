# 待办事项

* <span class="gray">[不处理，sourcemap 无问题，devtools 语法高亮问题是 chrome 带来的，create-react-app 也是如此] jsx 文件的 sourcemap 有问题，并且在 devtools 中没有语法高亮</span>
* <span class="green">[已处理] 提供 style lint</span>
* <span class="green">[已处理] postcss 配置检查并完善</span>
* 提供单元测试能力

* <span class="green">[已处理] 提高打包速度，调研以下方案：</span>

  * <span class="green">[已处理] dev 中也使用 dll plugin 方案</span>
  * <span class="gray">[暂不加入，测试后对目前打包方案没有速度提升] happypack 方案</span>
  * <span class="green">[已处理] webpack cache</span>
  * <span class="green">[已处理] babel cache</span>
  * <span class="gray">[暂不加入，测试后对目前打包方案没有速度提升] hard-source-webpack-plugin</span>
  * <span class="gray">[暂不加入，测试后对目前打包方案没有速度提升] webpack-uglify-parallel</span>
  * <span class="gray">[暂不加入，测试后对目前打包方案没有速度提升] parallel-webpack</span>

* 多页面打包能力

* <span class="green">[已处理] 提供根据路由拆包打包能力</span>
* <span class="green">[已处理] 提供空闲期自动加载能力</span>

* 国际化能力
  * 业务国际化
  * UI 组件库国际化管理
  * 工具类国际化定制（moment）
  * 支持远程翻译资源文件（工具类）
* <span class="green">[已处理] webpack 根据项目是否支持 IE8 进行自动选择版本，现代浏览器可以使用 webpack 3 or 4。目前脚手架中为了兼容 IE8，采用了 webpack 1.x</span>
* 资源自动化 CDN 能力
  * <span class="green">[已处理]支持资源前缀配置</span>
  * 阿里云（工具类）
  * 七牛（工具类）
  * CS（内网，工具类）
