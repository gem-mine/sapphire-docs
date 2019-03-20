# api 速查

## model

- 定义 model

```js
import durex from '@gem-mine/durex'

durex.model({
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

- 连接组件 smart、使用 actions

```javascript
import { smart, actions } from '@gem-mine/durex'

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

actions 上默认具有 routing 对象，可以操作浏览器的地址：

```jsx
import { actions, urlFor } from '@gem-mine/durex'

actions.routing.push(urlFor('examples')) // 跳转，并写入浏览器历史
actions.routing.replace(urlFor('examples')) // 跳转，但不写入浏览器历史
actions.routing.goBack() // 回退
```

## router

- 路由 配置与声明

```js
import { router } from '@gem-mine/durex'

// 参见 src/global/request.js
router.config({})

router.register({})
```

- 路由使用

```js
import { Routes } from '@gem-mine/durex'

<Routes />

<Routes path="main.home" />
```

## request

- 请求配置

```js
// 参见 src/global/request.js
import { request } from '@gem-mine/request'

request.config({})
```

- 切面配置

```js
// 参见 src/global/request.js
import { request } from '@gem-mine/request'

// 全局配置
request.config({})

// 某个域配置
request.api.config({})
```

- 使用

```js
import { request } from '@gem-mine/request'
const { api } = request

// 参数同 axios
api.get(url, {}).then(res => {})
```

## tool

- immutable

```js
// 详细使用参看 @gem-mine/immutable: https://github.com/gem-mine/immutable
import { setIn, getIn } from '@gem-mine/immutable'

// 设置
setIn(object, {})

// 无论多深，取不到返回 undefined
getIn(object, keyPath)
```

- URL 处理

```js
import { queryString } from '@gem-mine/durex'

// 解析查询参数
queryString.parse(url)

// 生成 url
queryString.stringify(url, {
  // ...
})
```

通过 urlFor 结合路由生成 url：

```js
import { urlFor } from '@gem-mine/durex'

// 可以处理路径参数和查询参数
urlFor('main.home', {
  // ...
})
```

- 从 path 解析成正则

```js
import { pathToRegexp } from '@gem-mine/durex'

const path = '/topics/:id'

// 生成的正则可以验证某个 url 是否满足规则
const reg = pathToRegexp(path)
```

- 获取 store

组件中可以通过 smart 注入，model 中可以通过 this.getState, getState 参数获取。

其他地方可以通过 getState 来获取

```js
import { getState } from '@gem-mine/durex'

const store = getState()
```
