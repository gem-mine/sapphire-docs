# 版本履历

- `2018年08月23日`

  - gem-mine 0.3.4

    - 使用 runNpm 安装依赖包，解决内网 npm 包安装问题

  - gem-mine-template @mobile 0.8.10, 0.8.11
    - 移动端支持高分屏

- `2018年08月08日`

  - gem-mine 0.3.3

    - 支持多层级目录创建工程

  - gem-mine-template 0.8.9
    - 删除 package.json 的 private 字段

- `2018年08月07日`

  - gem-mine-template 0.8.8
    - 本地 webpack dev server 代理跨域请求输出日志

- `2018年07月18日`

  - gem-mine 0.3.2

    - 支持早期 gem-mine 项目升级

  - gem-mine 0.8.7
    - 默认 npm 使用淘宝源

- `2018年07月16日`

  - gem-mine 0.3.1

    - 增强同步脚手架 package.json 能力
    - 优化 gem-mine update 推荐更新默认选项

  - gem-mine 0.8.6

    - 使用 gem-mine-helper

  - gem-mine-docs
    - 使用 https

- `2018年07月15日`

  - gem-mine 0.3.0

    - 剥离工具函数到 gem-mine-helper 进行重构优化
    - 修复 windows 下 inquirer 不能选择问题 [#2](https://github.com/gem-mine/gem-mine/issues/2)
    - 增加自定义代码骨架能力，在选择经典代码骨架时，可以选择自己的骨架
    - 增加版本更新检测，优化 gem-mine update 选项
    - 增加 npm registry 自动选择，降低因为网络问题导致不能访问 npm 官方源

  - gem-mine-template 0.8.5
    - 修复并优化 npm run lint 功能
    - 增加版本更新检测，包括 gem-mine、gem-mine-template、 UI 库、选择的经典代码骨架
    - 模版页直出 loading 功能，提高低速网络下的等待体验

- `2018年04月11日`

  - gem-mine-template
    - 支持 七牛自动化 CDN
    - 提供稳定的 chunkhash 方案

- `2018年04月10日`

  - gem-mine-template
    - 支持 code splitting，根据路由拆包打包、加载资源，减轻首屏 js 大小，提高首屏下载速度
    - 支持 idle preload，空闲期时自动加载被拆包打包的资源，提高非首屏页面的加载速度与体验

- `2018年03月26日`

  - gem-mine-template
    - fixbug：vendor/polyfill 在开发模式下的判断错误问题
  - gem-mine-docs
    - 添加 actions.routing 使用说明

- `2018年03月21日`

  - gem-mine-template
    - 添加 staticHash 配置，支持静态资源文件名非 hash 化
    - 添加 favicon 支持（自定义可以替换 public/favicon.ico 文件即可）
    - clean 方案优化，默认命令首次运行都会执行 clean
    - bundle 层级去除（clean 方案优化后，不再需要 bundle 目录）
    - vendor、polyfill 自动构建，并且统一 dev 和 production 下的 polyfill 方案
    - fixbug：修复 css 中图片打包不正确的问题（publicPath 引发的 bug） [#4](https://github.com/gem-mine/gem-mine/issues/3)

- `2018年02月11日`

  - gem-mine-template
    - 支持自定义不加入模块化的样式文件

- `2018年02月08日`

  - gem-mine-template
    - fixbug：dll plugin 构建时，若 manifest.json 不存在 npm start 出错

- `2018年02月06日`

  - gem-mine 0.2.2
    - gem-mine update 能力升级，可以通过选择进行针对性的升级
    - 优化 git 工具安装的检测

- `2018年02月05日`

  - gem-mine-template
    - 提供 stylelint，并对开发模式下启用 cache 以及 dll plugin，提高编译速度
    - 提供 postcss 支持

- `2018年01月25日`

  - cat-eye 0.3.6（latest）或 2.2.1（next）
    - 提供 getState 方法，在任意地方直接获取 store

- `2018年01月22日`

  - gem-mine-template
    - windows 下 webpack-dev-server 默认使用本机 IP 打开

- `2018年01月18日`

  - gem-mine 0.1.9

    - gem-mine update 命令自动处理增加的包，更新 package.json，自动更新依赖
    - gem-mine update 支持 --with_public 选项，此时会自动更新 public 目录

  - gem-mine-template
    - npm start 端口冲突时，自动选择可用端口

- `2018年01月16日`
  - gem-mine 0.1.8，update 命令只更新 webpack 相关内容，不处理其他源码
  - gem-mine-template
    - 修正样式无法热更新问题
    - npm start 默认启用热更新
    - 对于现代浏览器，webpack 使用 3x 版本
    - 修正一些 IE 兼容性 的 polyfill
