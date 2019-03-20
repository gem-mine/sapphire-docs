# 升级指南

## 从 gem-mine 升级

在项目目录下执行：

```
sapphire update
```

然后根据提示选择即可

本文档项目就是直接升级。当然，从 gem-mine-docs 升级到 sapphire-docs 其中由于兼容性还处理了这些东西：

- 使用了额外的 loader：markdown-loader，原先是 webpack 1.x，需要修改成 webpack 4.x 写法，修改了文件：config/webpack.js
- 移除了 jquery，因为不需要再兼容 IE8
- 升级了 velocity-react 动画库版本，同样是因为不需要再兼容 IE8

gem-mine 项目中的依赖 cat-eye 被拆解为三块：

- @gem-mine/durex redux 状态管理
- @gem-mine/request 请求工具
- @gem-mine/immutable immutable 工具

这些依赖变化由升级自动化处理

## 升级注意点

以下文件由于用户经常变更不会进行覆盖操作：

- public/favicon.ico
- config/webpack.js
- config/constant.js
- config/proxy.js
- src/App.jsx
- src/components/home/index.jsx
- src/components/common
- src/components/home
- src/global/routes/index.js
- src/global/model
- src/global/request.js
- src/styles/app.scss

升级时会进行依赖包的版本比较，会进行对应的升级。同时如果是从 gem-mine 升级，node_modules 会被删除，这里可能需要耐心等待。
