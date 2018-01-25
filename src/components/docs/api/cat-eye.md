# cat-eye api 速查

## model

* 定义 model

```javascript
import ce from 'cat-eye'

ce.model({
  name: 'user',
  state: {},
  reducers: {
    growUp(data, getState) {
      // this.getState()
      // return this.setField({})
    }
  },
  effects: {
    fetchSome(data, getState) {
      // this.getState()
      // this.actions.otherModel.someFn()
      // this.setField({})
    }
  }
})
```

* 连接组件 smart、使用 actions

```javascript
import { smart, actions } from 'cat-eye'

smart(
  state => {
    const s = state.user
    return {
      //
    }
  },
  props => {
    const a = actions.user
    return {
      //
    }
  }
)()
```

## router

* 路由 配置与声明

```javascript
import { router } from 'cat-eye'

// 参见 src/global/request.js
router.config({})

router.register({})
```

* 路由使用

```javascript
import {Routes} from 'cat-eye'

<Routes />

<Routes path="main.home" />
```

## request

* 请求配置

```javascript
// 参见 config/proxy.js
import { request } from 'cat-eye'

request.config({})
```

* 切面配置

```javascript
// 参见 src/global/request.js
import { request } from 'cat-eye'

// 全局配置
request.config({})

// 某个域配置
request.api.config({})
```

* 使用

```javascript
import { request } from 'cat-eye'
const { api } = request

// 参数同 axios
api.get(url, {}).then(res => {})
```

## tool

* immutable

```javascript
// 详细使用参看 zero-immutable: https://github.com/gem-mine/zero-immutable
import { setIn, getIn } from 'cat-eye'

// 设置
setIn(object, {})

// 无论多深，取不到返回 undefined
getIn(object, keyPath)
```

* URL 处理

```javascript
import { queryString } from 'cat-eye'

// 解析查询参数
queryString.parse(url)

// 生成 url
queryString.stringify(url, {
  // ...
})
```

通过 urlFor 结合路由生成 url：

```javascript
import { urlFor } from 'cat-eye'

// 可以处理路径参数和查询参数
urlFor('main.home', {
  // ...
})
```

* 从 path 解析成正则

```javascript
import { pathToRegexp } from 'cat-eye'

const path = '/topics/:id'

// 生成的正则可以验证某个 url 是否满足规则
const reg = pathToRegexp(path)
```

* 获取 store

组件中可以通过 smart 注入，model 中可以通过 this.getState, getState 参数获取。

其他地方可以通过 getState 来获取

```javascript
import { getState } from 'cat-eye'

const store = getState()
```
