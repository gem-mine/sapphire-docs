# 版本履历

* `2018年01月22日`
  * gem-mine-template
    * windows 下 webpack-dev-server 默认使用本机 IP 打开

* `2018年01月18日`

  * gem-mine 0.1.9
    * gem-mine update 命令自动处理增加的包，更新 package.json，自动更新依赖
    * gem-mine update 支持 --with_public 选项，此时会自动更新 public 目录

  * gem-mine-template
    * npm start 端口冲突时，自动选择可用端口
  * gem-mine-docs
    * 首页样式优化

* `2018年01月16日`

  * gem-mine 0.1.8，update 命令只更新 webpack 相关内容，不处理其他源码
  * gem-mine-template
    * 修正样式无法热更新问题
    * npm start 默认启用热更新
    * 对于现代浏览器，webpack 使用 3x 版本
    * 修正一些 IE 兼容性 的 polyfill
  * 文档系统发布
