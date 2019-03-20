# 开发实例

下面通过 内置用例 和 开发项目实例 来大致介绍下 sapphire 的业务开发过程

## sapphire 内置开发样例

使用 sapphire 初始化项目后，通过 `/examples` 可以访问到提供的开发样例列表，<a href="#/examples">点击访问在线样例</a>

样例的代码主要位于 `src/components/examples` 目录下，样例包括以下功能：

* 不同环境下的常量示例：该例子展示了不同环境下（依赖 npm 环境变量 env），例如本地环境、测试环境、生产环境中，一些常量需要不同的值，可以在此例子中得到帮助。本地要模拟不同 env 的值，可以通过指定参数 --env=xxx，例如 `npm start --env=production`，更多环境变量与常量的使用，<a href="#/docs/api/constant">参看文档：环境变量与常量</a>
* 计数器：该例子展示了 model 中 action、reducer、smart 的使用，更多 model 及其概念、使用 的帮助，<a href="#/docs/api/model">参看文档：model</a>
* 路由：该例子展示了 路由的配置（配置目录 `src/global/routes`，例子中给出了如何拆分路由的方案）、路由参数的获取（路径参数与查询参数）、构造路由路径、返回上一页的功能。更多 路由配置和使用的帮助，<a href="#/docs/api/router">参看文档：路由</a>
* 网络请求：该例子展示了 网络请求的配置（配置文件 `config/proxy.js` 以及 通用切面配置 `src/global/request.js`），使用 CORS 模式给出了 GET/POST 请求示例，包含了通用 loading、异常处理。更多 网络请求的配置和使用，参看 <a href="#/docs/api/request">参看文档：网络请求</a>
* 权限拦截：该例子展示了如何在路由层面判断是否有权限访问某个组件，此能力由路由配置提供
* 404 页面：该例子展示了如何配置 404 页面（包含了子路由 404 页面），此能力也是由路由配置提供
* UI 组件例子：该例子展示了如何使用接入的 UI 组件库，如果没有使用，则无功能。不同 UI 组件库的用例可能会显示不一样，具体 UI 组件库的使用，参看对应文档，脚手架默认提供了 ant design、fish 相关的组件库作为最佳实践，当然你可以接入任意的 React UI 组件库，只是配置上需要你自己多费点心思。

## 使用 sapphire 开发一个项目

<span class="red">你现在正在看的文档系统正是使用 sapphire 创建的一个项目</span>。项目的源码地址：<a href="http://github.com/gem-mine/sapphire-docs" target="_blank">sapphire-docs</a>

下面我们来看看是如何一步一步来构建我们的项目的，重点是开发流程以及遇到问题的解决过程。** 建议：可以看一遍 <a href="#/docs/api">使用教程</a> ，然后再来看下面的实操过程，遇到不理解的再回头看文档，然后来理解开发过程，这样往复思考效果会更好一些。**

### 初始化项目

首先，项目定位：

* 支持 markdown 编写文档

```shell
# 初始化项目
sapphire sapphire-docs

# 开始开发
cd sapphire-docs
npm start
```

这里不采用任何 UI 组件库，毕竟只是一个文档系统。更多命令，请参考：<a href="#/docs/api/command">命令行</a>

### 规划模块与路由

模块分为：

* 首页
* 文档

它们共有头部和底部，头部导航去各个文档的分类，底部则是一些链接地址。

因此路由就按此来划分，由于首页仅一个页面，就放在 `src/global/routes/index.js` 中配置，文档涉及了很多页面，独立拆分出 `src/global/routes/docs.js` 来配置。我们并不急于如何编写这个文件如何，可以新建出这个路由文件，以及在 components 下建立 `home` 和 `docs` 两个目录，作为后续开发的基础。那现在的增加的目录结构为（不变的省略）：

```text
├── src
│     ├── components
│     │     ├── home
│     │     ├── docs
│     ├── global
│     │     ├── routes
│     │     │     ├── docs.js
```

由于项目中没有涉及到网络请求，因此这一块的配置在此项目中没有体现。

### 布局开发

头部、底部是公用的，我们在 `src/components/common` 下分别建立 header、footer。

```text
├── src
│     ├── components
│     │     ├── common
│     │     │     ├── header
│     │     │     ├── footer
```

这里提一下命名推荐的规范：**目录一律用小写，jsx 组件除了 index.jsx 外采用驼峰命名**，例如：footer 下的 index.jsx、Links.jsx。**组件对外暴露的默认是 index.jsx**。导入时只要到目录一级即可：

```jsx
import Footer from 'components/common/footer'
```

接着就可以根据 react 开发方式，开发 header、footer，其中的样式采用 scss 模块化开发。

开发完毕后，在 `src/App.jsx` 引入，进行布局：

```jsx
import Header from 'components/common/header'
import Footer from 'components/common/footer'

const App = props => {
  return (
    <div className="main">
      <Header />
      <div className="body">
        <Routes />
      </div>
      <Footer />
    </div>
  )
}
```

中间的一块留给路由填充组件使用

### 开发首页

首页希望做的酷炫一些，加入一些动画。同时希望路由切换后切回来，可以保持动画后的状态，因此状态保存在 redux 中，也就是被脚手架提供的 model 托管。

经过一些选型比较（依据：兼容性、易用性、维护性），动画库选择 <a href="https://github.com/google-fabric/velocity-react" target="_blank">velocity-react</a>：

```shell
npm i velocity-react -S
```

~velocity-react 在 IE8 下的动画需要依赖 jquery，因此引进 jquery-1.9.0（最后支持 IE8 的版本），引入工作需要进行以下三步：~

* ~下载 jquery-1.9.0（压缩后的版本），放入 public 目录~
* ~修改 `config/webpack.js`，将 jquery-1.9.0.js 加入到 additional 数组中，这样 webpack 编译时就会将其拷贝到目标目录中~
* ~修改 `public/index.html`，使用 IE 条件表达式，用 script 标签引入 jquery~


然后重新 npm start 启动项目（修改了 webpack 的配置需要重新启动才能生效）

此时，home 目录为：

```text
├── src
│     ├── components
│     │     ├── home
│     │     │     ├── index.jsx
│     │     │     ├── model.js
│     │     │     ├── style.scss
```

这种标准结构，后续可以考虑加入命令行功能来生成。开发过程中，又拆分出 Console、Info、Logo 三个子组件。Console 组件用到了打字效果，同样经过选型比较，选择了 `react-typist`。

编写完代码后，修改 `src/global/routes/index.js`，添加 home 对应的路由，然后浏览器中就能看到酷炫的首页了。

### 文档开发

为了解析 markdown 文件并将其转化为 jsx，借助了 `marked` 这个库，同时为了显示代码语法高亮，结合了 `highlight.js`。这里使用 webpack 的 loader 来处理 `markdown-loader`，同时将该 loader 加入 `config/webpack.js` 的 loaders 字段。同样由于修改了 webpack 配置，需要重新 npm start 启动。

解析来就是在 src/components/docs 目录下撸 markdown 文档了。文档具有二级目录，因此使用了子路由功能，鉴于各个文档结构布局的一致性，这里用了一些小技巧，提供了 Layout.jsx 进行封装。

```text
├── src
│     ├── components
│     │     ├── docs
│     │     │     ├── api
│     │     │     │     ├── markdown files
│     │     │     ├── guide
│     │     │     │     ├── markdown files
│     │     │     ├── ...
│     │     │     ├── Layout.jsx
│     │     │     ├── style.scss
```

然后处理路由，配置对应文档的地址，`src/global/routes/docs.js` 看起来和常规路由配置有些不同，只是利用了 `src/global/routes/docs-helper.js` 提供的函数对 markdown 和 Layout 进行统一处理少写点重复的代码，仅此而已。

### 收获

使用 sapphire 开发了 sapphire-docs，一方面验证了其开发的便利性、灵活度，另一方面也反哺了 sapphire，发现了脚手架一些 bug，并提出一些基础需求让脚手架改进增强。

希望你在 sapphire 的过程中，也能提出思考后的建设性意见，欢迎在 <a href="https://github.com/gem-mine/sapphire/issues" target="_blank"> issues</a> 提出问题，如果你可以 pull request 进行贡献，那自然是极好的。只有良好的互动，才是一个健康的程序，健康的生态。

> 本文档站点原来是由 gem-mine 生成，此次使用 sapphire 做了升级。升级可以参看：<a href="#/docs/guide/update">升级指南</a>


