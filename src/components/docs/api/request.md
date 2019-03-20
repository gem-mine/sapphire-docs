# 网络请求

sapphire 支持的网络请求特性包括：

- 多域下的封装：支持对多个域请求的封装，例如需要请求多个 API 站点
- 请求的切面处理：
  - 支持全局切面处理（对所有请求）
  - 单个域切面处理（对某个域下的所有请求）
  - 单个请求处理如果某个请求同时存在上述两个或者以上的切面，优先级是：
  - 单个请求 > 域 > 全局
- 内置支持 webpack-dev-server 处理请求代理

> 注意：IE9 下跨域 CORS 请求，sapphire 并没有进行处理。建议使用 nginx 反代 或者 server 代理转为同域方式。

## 配置与使用

请求配置文件位置：`config/proxy.js`。

假设存在一个 API，`config/proxy.js` 配置如下：

```js
const config = {
  api: {
    defaults: {
      // 没有找到 env 时候的默认配置
      url: 'http://cors.me',
      prefix: '/v1.0'
    }
  }
}

module.exports = config
```

上面声明了一个 api 的请求服务，defaults 是没有找到 env 时的默认使用的配置，其下字段含义为：

- url：请求的域
- prefix：每个请求的 url 的前缀部分

这两个构成了请求的前面部分 `${url}/${prefix}`

业务中使用就非常的简单：

```js
import { request } from '@gem-mine/request'
const { api } = request

// 返回了一个 axios 对象（promise）
api.get('/mock', {
  params: {
    q: 'hello'
  }
})
```

使用接口和 axios 相同，axios 文档可以查看：<a href="https://github.com/axios/axios#axios-api" target="_blank">axios</a>

上面只声明了一个 defaults，则所有环境下都使用同一个请求配置，无论本地、测试环境、预生产环境，还是生产环境。不同环境下通常会有不同的请求配置，例如我们针对本地和测试环境，添加配置：

```js
const config = {
  api: {
    defaults: {
      // 没有找到 env 时候的默认配置
      url: 'http://cors.me',
      prefix: '/v1.0'
    },
    wds: {
      // webpack-dev-server 使用的配置
      url: 'http://local.cors.me',
      prefix: '/v1.0'
    },
    debug: {
      // env=debug 时候的配置
      url: 'http://debug.cors.me',
      prefix: '/v1.0'
    }
  }
}

module.exports = config
```

对于某个请求服务，使用到的配置优先级查找顺序是这样的：

1. 提供了 env，则根据 env 查找配置，找到则直接得到配置
2. 没有提供 env，或者提供的 env 对应的配置不存在，分情况来看：
   - 如果通过 webpack-dev-server 来启动，则先找 key 为 wds 的配置（例如上面 api 请求服务，如果通过 WDS 启动，没有找到配置情况下会先查找 api.wds）；如果 wds 配置也不存在，才会去找 defaults 配置。
   - 对于非本地情况，不可能以 WDS 启动，因此没有找到配置情况下，默认都是查找 defaults 配置。

注意，本地如果配置了 wds，将使用 webpack-dev-server 的 proxy 代理，本质是 server 代理（wepack-dev-server 内置了 express 服务器）。webpack-dev-server 的文档可以点击查阅：<a href="https://webpack.github.io/docs/webpack-dev-server.html" target="_blank">webpack dev server</a>，我们做了一层封装，让 webpack-dev-server 的 proxy 更简单使用。

因此你通过 chrome 开发者工具看到的网络请求如下：

```
http://localhost:9000/api_wds/v1.0/mock?q=hello
```

是请求的本地 webpack-dev-server 服务器，api_wds 是脚手架自动添加的前缀用来给 webpack-dev-server 识别这是代理请求，需要转发。最终转发到

```
http://cors.me/v1.0/mock?q=hello
```

这个 URL 上。

当然，本地如果配置了 wds，但是想测试下其他配置，可以使用 env 方式：

```bash
# 使用 defaults 配置
npm start --env=defaults

# 使用 debug 配置
npm start --env=debug
```

server 代理需要在前端工程中加入后端代码，因此项目不会是纯静态项目。后端代码通常是用来做统一请求处理，将请求统一转发到对应的服务器，从而绕过跨域限制。这个弊端就是对后端有要求，极端情况下，对接不同语言的后端，要分别实现一遍代理请求处理。

nginx 反向代理和 server 代理类似，是实现了同域请求转发功能，只是转发功能放到了 nginx 上来处理。前端工程通常就需要 nginx 支持，因此和 server 代理对比，就没有了服务端代码。

`config/proxy.js` 其配置和上面 CORS 一致。

## 多域的使用

上面讲述中，我们例举了一个域的使用，gem-mine 支持多域的配置，我们在`config/proxy.js`增加一个域：

```javascript
const config = {
  api: {
    defaults: {
      // 没有找到 env 时候的默认配置
      url: 'http://cors.me',
      prefix: '/proxy/v1.0'
    },
    wds: {
      // WDS 使用的配置
      url: 'http://local.cors.me',
      prefix: '/v2.0'
    },
    debug: {
      url: 'http://debug.cors.me',
      prefix: '/proxy/v1.0'
    }
  },

  douban: {
    defaults: {
      // 没有找到 env 时候的默认配置
      url: 'http://api.douban.com',
      prefix: '/v2'
    },
    wds: {
      // WDS 使用的配置
      url: 'http://local.douban.me',
      prefix: '/v2.0'
    }
  }
}

module.exports = config
```

上面配置中，api 这个请求使用了 nginx 反向代理，douban 这个请求使用了 server 代理

## 请求的切面处理

通常有以下这些需求：

- 每次请求的头信息中需要携带计算的授权头
- 大部分请求希望有统一的异常处理，无须每个请求都对异常进行处理
- 请求如果超过一定时间，希望有统一的等待提示

上面的需求可以通过请求的切面来实现，这些切面的配置文件位于：`src/global/request.js`，其代码大致结构如下：

```js
/* global ENV, DEBUG */
import request from '@gem-mine/request'
import proxyConfig from 'config/proxy'

// 获取环境中对应的网络配置
request.init(proxyConfig, {
  env: ENV,
  wds: DEBUG
})

import { request, actions } from '@gem-mine/request'
import proxyConfig from 'config/proxy'
import { getCurrentProxyConfig } from './util/proxy'

request.init(getCurrentProxyConfig(proxyConfig))

// 全局设置，对所有请求生效
request.config({})

// 某个域的设置，对该域的请求生效
request.api.config({})
```

设置通常包括了以下几点：

- 请求前的切面处理（before）
- loading 处理
- 请求异常处理（error）
- 请求完成处理（complete）

例如对全局的设置：

```js
request.config({
  // 当请求时间超过默认设定的1500ms时触发 loading
  loading: function(params) {
    // this 指向这个请求实例，为了便于后面取消这个提示。这里使用了 UI 库 的 message 组件
    this.hideTip = message.loading('请求仍在进行，请稍候...', 15)
  },
  // 请求异常时的处理函数，这里使用 message 组件进行提示
  error: function(res) {
    const msg = getIn(res, 'data.message') || '您的请求遇到了错误，请稍候再试'
    message.error(msg, 5)
  },
  // 请求完成时的处理函数，无论成功失败，这里只是将 loading 隐藏
  complete: function(res) {
    if (this.hideTip) {
      this.hideTip()
    }
  }
})
```

还可以对某个域进行设置，如果有重复的切面，则域的设置会覆盖全局的设置：

```js
request.api.config({
  error: function(res) {
    alert(res.data.message)
  }
})
```

因此 api 请求还会使用 全局的 loading 和 complete，但是 error 使用自己定义的方式。

如果某个请求需要单独设置异常处理，可以使用 `customError` 结合 catch 来处理，避免被全局错误捕获：

```js
import request from '@gem-mine/request'
import { api } from request

api.get('/some/url', {
  customError: true
}).catch(err=> {
  // 自定义异常处理逻辑
})
```

对于统一授权头的处理，是通过 before 切面进行设定：

```js
request.api.config({
  // params: axios 的请求配置参数
  // 这个 function 中的 this 指向 请求实例
  before: function(params) {
    return setIn(params, {
      'headers.Authorization': '...'
    })
  }
})
```
