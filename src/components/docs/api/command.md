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

该命令会根据以前的选择（例如是否支持 IE8，选择了什么 UI 组件库等）进行自动升级，默认升级只处理以下文件：

```
├── config
│     ├── webpack
│     ├── webpack.js
```

**重要：覆盖处理前，请务必确保已经将代码 commit 到 git 仓库，否则上述涉及的文件会被覆盖**

这里不处理其他文件是因为通常您已经修改了部分代码，为了减少恢复工作（通常只需要处理 webpack.js）。如果确实需要整个项目方式进行覆盖，可以采用上面提到的 `gem-mine project_name` 方式进行处理。

## npm scripts

### 本地开发

```
npm start
```

默认热加载，如果想在 IE8 下开发调试，需要禁用热加载：

```
npm start --hot=false
```

默认启动端口 9000，如果本地需要启动多个项目，防止端口冲突可以指定一个端口：

```
npm start --hot --port=9001
```

### 打包

```
npm run build
```

打包时会检测是否生成过 polyfill 和 vendor，如果没有，则会自动调用 npm run polyfill 和 npm run vendor 生成对应的 polyfill 包 和 vendor 包。

如果依赖包（例如 cat-eye）或者 polyfill 有更新过，并且本地已经存在 polyfill 或者 vendor，可以手动指定执行：

```
npm run build --polyfill
npm run build --vendor
npm run build --polyfill --vendor
```

当然，你也可以直接执行 vendor 和 polyfill 命令进行打包（通常不需要这两个命令）：

```
npm run vendor
npm run polyfill
```

### 参数列表

* --hot=false：禁用热加载，用于 npm start，被 webpack-dev-server 接受
* --port=xxx：指定端口，用于 npm start，被 webpack-dev-server 接受
* --env=xxx：指定环境变量，不指定则从系统中获取（没有为空），该变量会影响 `config/constant.js` 和 `config/proxy.js`。**代码中可以使用 ENV 这个全局变量来获取这个值**。
* --analyzer：是否输出打包分析，用于做一些打包性能调优分析依据
* --polyfill：是否同时进行 polyfill 打包，用于 npm run build
* --vendor：是否同时进行 vendor 打包，用于 npm run build
