# 网络请求

gem-mine 支持的网络请求特性包括：

* 多域下的封装：支持对多个域请求的封装，例如需要请求多个 API 站点
* 请求的切面处理：
  * 支持全局切面处理（对所有请求）
  * 单个域切面处理（对某个域下的所有请求）
  * 单个请求处理如果某个请求同时存在上述两个或者以上的切面，优先级是：
  * 单个请求 > 域 > 全局

脚手架支持 3 种跨域请求处理方式：

* CORS
* nginx 反向代理
* server 代理

3 种方式各有优劣，这里简单讲述下 3 中方案的优劣，项目中请根据自己情况进行选择：

* CORS：前后端代码分离，仅服务端进行少量配置即可支持。但是 IE8、9 存在兼容性问题，同时将请求的服务器地址或域名直接暴露，架构不合理的情况下存在被攻击的安全隐患
* nginx 反向代理：同域方案，前后端代码分离，仅 nginx 进行少量配置即可支持（需要协定前缀来配置规则来支持 nginx 进行请求转发），无兼容性问题，不暴露请求服务器。
* server 代理：同域方案，无兼容性问题，不暴露请求服务器，但需要服务端代码进行支持，前端工程中必须有服务端代码。还可以做合并请求、请求结果预处理等功能（这部分也需要服务端代码支持）

## 配置与使用

请求配置文件位置：`config/proxy.js`，下面分 CORS、 server 代理、nginx 反向代理 三种情况来描述。

先从 CORS 模式配置入手，并结合使用、本地开发模式。CORS 的基础知识可以参见：<a href="http://www.ruanyifeng.com/blog/2016/04/cors.html" target="_blank">跨域资源共享 CORS 详解 - 阮一峰的网络日志</a>。

### CORS

假设存在一个 API，其支持 CORS 跨域请求
`config/proxy.js` 配置如下：

```javascript
const config = {
  api: {
    mode: 'cors', // CORS 模式
    defaults: {
      // 没有找到 env 时候的默认配置
      url: 'http://cors.me',
      prefix: '/v1.0'
    }
  }
};

module.exports = config;
```

上面声明了一个 api 的请求服务，mode 表明请求使用的模式是 cors。mode 可选值包括：

* cors：使用 CORS
* server：使用服务端代理，这是*默认值*
* nginx：使用 nginx 反向代理

defaults 是没有找到 env 时的默认使用的配置，其下字段含义为：

* url：CORS 请求的域
* prefix：每个请求的 url 的前缀部分

如果想配置额外通用的参数，可以在这里配置，然后通过切面 before 的第三个参数 可以获取到进行统一的处理（before 的使用在本文的最后）。

```javascript
const config = {
  api: {
    mode: 'cors', // CORS 模式
    defaults: {
      // 没有找到 env 时候的默认配置
      url: 'http://cors.me',
      prefix: '/v1.0'
    },
    params: {
      // ...
    },
    extra: {
      // ...
    }
  }
};

module.exports = config;
```



业务中使用就非常的简单：

```javascript
import { request } from 'cat-eye';
const { api } = request;

// 返回了一个 axios 对象（promise）
api.get('/mock', {
  params: {
    q: 'hello'
  }
});
```

使用接口和 axios 相同，axios 文档可以查看：<a href="https://github.com/axios/axios#axios-api" target="_blank">axios</a>

上面只声明了一个 defaults，则所有环境下都使用同一个请求配置，无论本地、测试环境、预生产环境，还是生产环境。不同环境下通常会有不同的请求配置，例如我们针对本地和测试环境，添加配置：

```javascript
const config = {
  api: {
    mode: 'cors', // CORS 模式
    defaults: {
      // 没有找到 env 时候的默认配置
      url: 'http://cors.me',
      prefix: '/v1.0'
    },
    wds: {
      // WDS 使用的配置
      url: 'http://local.cors.me',
      prefix: '/v1.0'
    },
    debug: {
      url: 'http://debug.cors.me',
      prefix: '/v1.0'
    }
  }
};

module.exports = config;
```

对于某个请求服务，使用到的配置优先级查找顺序是这样的：

1. 提供了 env，则根据 env 查找配置，找到则直接得到配置
2. 没有提供 env，或者提供的 env 对应的配置不存在，分情况来看：
   * 如果通过 webpack-dev-server 来启动，则先找 key 为 wds 的配置（例如上面 api 请求服务，如果通过 WDS 启动，没有找到配置情况下会先查找 api.wds）；如果 wds 配置也不存在，才会去找 defaults 配置。
   * 对于非本地情况，不可能以 WDS 启动，因此没有找到配置情况下，默认都是查找 defaults 配置。

注意，本地如果配置了 wds，不论 mode 使用什么，都将使用 webpack-dev-server 的 proxy 代理，本质是 server 代理（wepack-dev-server 内置了 express 服务器）。webpack-dev-server 的文档可以点击查阅：<a href="https://webpack.github.io/docs/webpack-dev-server.html" target="_blank">webpack dev server</a>，我们做了一层封装，让 webpack-dev-server 的 proxy 更简单使用。

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

### server 代理

server 代理需要在前端工程中加入后端代码，因此项目不会是纯静态项目。后端代码通常是用来做统一请求处理，将请求统一转发到对应的服务器，从而绕过跨域限制。这个弊端就是对后端有要求，极端情况下，对接不同语言的后端，要分别实现一遍代理请求处理。

`config/proxy.js` 其配置和上面 CORS 基本一致：

```javascript
const config = {
  api: {
    mode: 'server', // server 模式，不填默认也是 server
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
  }
};

module.exports = config;
```

和 CORS 中配置的区别是，非 wds 模式下，prefix 添加了一个前缀 /proxy（defaults 和 debug 配置中可以看到）。这个前缀是为了让后端代码路由识别，统一处理。这个规则需要前后端进行协定。

wds 和上一节 CORS 中介绍的一致，业务代码使用请求也和 CORS 完全一致，不在赘述。

### nginx 反向代理

nginx 反向代理和 server 代理类似，是实现了同域请求转发功能，只是转发功能放到了 nginx 上来处理。前端工程通常就需要 nginx 支持，因此和 server 代理对比，就没有了服务端代码。

`config/proxy.js` 其配置和上面 server 代理，除了 mode 外完全一致：

```javascript
const config = {
  api: {
    mode: 'nginx',
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
  }
};

module.exports = config;
```

prefix 在非 wds 配置下，同样增加了 /proxy 前缀，是为了发送请求后被 nginx 识别，将需要的请求转发到服务器。

业务中使用网路请求，3 中代理模式完全一致。

## 多域的使用

上面讲述中，我们例举了一个域的使用，gem-mine 支持多域的配置，我们在`config/proxy.js`增加一个域：

```javascript
const config = {
  api: {
    mode: 'nginx',
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
    mode: 'server',
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
};

module.exports = config;
```

上面配置中，api 这个请求使用了 nginx 反向代理，douban 这个请求使用了 server 代理

## 请求的切面处理

通常有以下这些需求：

* 每次请求的头信息中需要携带计算的授权头
* 大部分请求希望有统一的异常处理，无须每个请求都对异常进行处理
* 请求如果超过一定时间，希望有统一的等待提示

上面的需求可以通过请求的切面来实现，这些切面的配置文件位于：`src/global/request.js`，其代码大致结构如下：

```javascript
import { request, actions } from 'cat-eye';
import proxyConfig from 'config/proxy';
import { getCurrentProxyConfig } from './util/proxy';

request.init(getCurrentProxyConfig(proxyConfig));

// 全局设置，对所有请求生效
request.config({});

// 某个域的设置，对该域的请求生效
request.api.config({});
```

设置通常包括了以下几点：

* 请求前的切面处理（before）
* loading 处理
* 请求异常处理（error）
* 请求完成处理（complete）

例如对全局的设置：

```javascript
request.config({
  // 当请求时间超过默认设定的1500ms时触发 loading
  loading: function(params) {
    // this 指向这个请求实例，为了便于后面取消这个提示。这里使用了 fish 的 message 组件
    this.hideTip = message.loading('请求仍在进行，请稍候...', 15);
  },
  // 请求异常时的处理函数，这里使用 fish 的 message 组件进行提示
  error: function(res) {
    const msg = getIn(res, 'data.message') || '您的请求遇到了错误，请稍候再试';
    message.error(msg, 5);
  },
  // 请求完成时的处理函数，无论成功失败，这里只是将 loading 隐藏
  complete: function(res) {
    if (this.hideTip) {
      this.hideTip();
    }
  }
});
```

还可以对某个域进行设置，如果有重复的切面，则域的设置会覆盖全局的设置：

```javascript
request.api.config({
  error: function(res) {
    alert(res.data.message);
  }
});
```

因此 api 请求还会使用 全局的 loading 和 complete，但是 error 使用自己定义的方式。

对于统一授权头的处理，是通过 before 切面进行设定：

```javascript
request.api.config({
  // params: axios 的请求配置参数
  // ins: 请求实例
  // cfg: 对应的 proxy 的配置（即 config/proxy.js 中对应环境下的配置），如果有配置额外的参数，这里就可以拿到
  before: function(params, ins, cfg) {
    return setIn(params, {
      'headers.Authorization': '...'
    });
  }
});
```
