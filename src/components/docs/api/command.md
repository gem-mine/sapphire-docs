# 命令行

## 安装 gem-mine

```
npm i gem-mine -g
```

## 使用 gem-mine

* 创建项目

```
gem-mine project_name
```

如果该项目已经存在，会提示你是否进行覆盖处理，会对脚手架已经存在的文件进行覆盖。

1. **重要：覆盖处理前，请务必确保已经将代码 commit 到 git 仓库，这样一来可以避免修改的丢失，二来更新后可以利用 git 看到具体有哪些变动**
2. **重要：如果已经是一个 gem-mine 创建的项目，建议使用 `gem-mine update` 命令处理升级，这样无须进行选项的选择**

创建项目时，如果该项目并没有被 git 管理，gem-mine 会自动为你初始化 git。

* 更新项目

```
# 在项目根目录下执行：
gem-mine update
```

该命令会进行提示选择升级，包括：
* 只更新 webpack 相关配置（更新 config/webpack 以及 config/webpack.js）
* 更新 webpack 相关配置，以及 public 目录
* 更新 除了源码（src目录）外的所有信息
* 更新 gem-mine 涉及的所有信息（包括 src 目录）

gem-mine 会根据项目之前的情况（例如是否支持 IE8，选择了什么 UI 组件库等）进行自动升级

**重要：覆盖处理前，请务必确保已经将代码 commit 到 git 仓库，否则上述涉及的文件会被覆盖**

## npm scripts

### 本地开发

```
npm start
```

默认热加载，如果想在 IE8 下开发调试，需要禁用热加载：

```
npm start --hot=false
```

默认启动端口 9000，如果本地需要启动多个项目，会自动检测端口是否冲突，如果冲突则自动寻找可用端口。

### 打包

```
npm run build
```

打包时会自动调用 npm run polyfill 和 npm run vendor 生成对应的 polyfill 包 和 vendor 包。

### 代码格式化检查

```
npm run lint
```

会执行样式检查（css/less/scss） 以及 js 检查（js/jsx）

如果需要使用自动修复功能，可以添加 --fix 参数：`npm run lint --fix`。自动修复通常效果一般，推荐检测后手动进行修改。

### 参数列表

* --hot=false：禁用热加载，用于 npm start，被 webpack-dev-server 接受
* --port=xxx：指定端口，用于 npm start，被 webpack-dev-server 接受。通常不需要此参数，会自动寻找可用端口
* --env=xxx：指定环境变量，不指定则从系统中获取（没有为空），该变量会影响 `config/constant.js` 和 `config/proxy.js`。**代码中可以使用 ENV 这个全局变量来获取这个值**。
* --analyzer：是否输出打包分析，用于做一些打包性能调优分析依据
* --cdn：强制启用 cdn 功能，默认是根据 config/webpack.js 中的 cdn 配置，根据对应的环境变量进行自动判断是否上传 CDN。
