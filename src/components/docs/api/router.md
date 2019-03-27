# 路由

sapphire 通过 @gem-mine/durex 内置 react-router 4，并提供了基于 react router 4 的封装，具有以下特性：

- 使用 JSON 方式对路由进行配置
- 支持多级子路由
- 支持默认路由
- 支持权限拦截

## 配置与使用

路由配置文件存放在 `src/global/routes` 目录下，一般所有配置都放置在 `index.js` 中，当然你可以进行拆分成多个文件来处理来减少冲突。

路由配置包括两个部分：**通用配置** 和 **路由注册**。

### 通用配置

通用配置用来为路由组件注入 props，以及设置 403 无权限，404 没找到路由的默认组件配置。这个配置是通过 @gem-mine/durex 提供的 router.config 进行：

```js
import { router } from '@gem-mine/durex'
import NotFound from 'components/common/exception/404'
import Forbidden from 'components/common/exception/403'

// 通用配置
router.config({
  // 为路由注入 props，主要是为了做权限判断时使用，路由配置时可以看到使用
  mapStateToProps: state => {
    return {
      user: state.user
    }
  },
  // 设置默认的 403，404 组件（可选，默认的403、404 无样式，较为简陋）
  components: {
    NotFound,
    Forbidden
  }
})
```

### 路由注册

通过 router.register 来注册路由，接受的参数是一个 object，一个相对完整的模板如下：

```js
import { router } from '@gem-mine/durex'

// 注册路由
router.register({
  login: {
    path: LOGIN_PATH,
    component: Login,
    description: '登录页',
    index: true // 根路由下默认显示
  },
  main: {
    path: '/',
    permission: props => {
      if (getIn(props, 'user.token')) {
        return true
      }
      return <Redirect to={{ pathname: LOGIN_PATH }} />
    },
    // 子路由
    sub: {
      home: {
        path: '/home',
        component: Home,
        description: '首页',
        index: true // 子路由如果要默认显示，path 设置成 /，并且设置 exact: true。或者设置 index 为 true
      },
      about: {
        path: '/about',
        component: About,
        description: '关于页'
      },
      topic: {
        path: '/topics',
        redirect: 'main.topic.list',
        module: {
          // 子模块
          list: {
            description: '话题列表页',
            path: '/list',
            component: TopicList
          },
          add: {
            description: '添加话题页面',
            path: '/add',
            component: TopicAdd
          },
          detail: {
            description: '话题详细页',
            path: '/:id',
            component: TopicItem
          }
        }
      },
      admin: {
        description: '管理路由',
        path: '/admin',
        component: Admin, // 存在子路由，需要有个组件来放置路由
        permission: props => {
          if (props.user.name === ADMIN || props.user.name === SUPER) {
            return true
          }
          return false
        },
        sub: {
          dashboard: {
            path: '/dashboard',
            description: '管理首页',
            index: true, // 作为默认显示的子路由
            redirect: {
              // 带参数的 redirect
              key: 'main.admin.dashboard.x',
              params: { name: 'tom' }
            },
            module: {
              x: {
                path: '/x',
                component: X
              },
              y: {
                path: '/y',
                component: Y
              }
            }
          },
          super: {
            description: '超级管理员页面',
            path: '/super',
            component: Super,
            permission: props => {
              if (props.user.name === SUPER) {
                return true
              }
              return <Forbidden message={`请将用户名改为 ${SUPER}`} />
            }
          },
          log: {
            description: '日志',
            path: '/logs',
            module: {
              list: {
                description: '日志列表',
                path: '/',
                exact: true,
                component: LogList
              },
              detail: {
                description: '日志详情',
                path: '/:id',
                component: LogItem
              }
            }
          }
        }
      }
    }
  }
})
```

路由中的每一项，可能由下面的若干个配置构成：

- path: 路由对应的 url 地址，嵌套的路由（包括 sub 和 module）会祖先路由的 path 作为前缀拼接
- component：路由对应的组件
- permission：权限拦截函数，返回 true 表示有权限。返回 false 则渲染默认无权限组件，返回一个组件时是表示无权限对应的自定义组件。嵌套的路由会继承祖先的 permission 权限拦截函数，因此只有祖先 permission 返回 true 后才会进入目标路由
- description：描述，相当于一个注释作用
- index：是否作为默认子路由
- redirect：进入该路由后自动跳转到指定路由。**注意：redirect 不能和 sub 同级别存在，也就是某一项路由中，redirect 和 sub 不能同时存在**，因为如果 redirect 的目标是自己的子路由，而子路由渲染必然需要经过祖先路由，又会触发 redirect，从而死循环。虽然 redirect 一般是结合 module 使用，表示跳转进入某个平级路由，但 redirect 其实是可以跳转进入任意的其他路由。
- sub：子路由，其下配置也是一个路由配置
- module：平级模块路由，其下配置也是一个路由配置
- exact：唯一匹配，否则”/“和”/page1”都会匹配到 path 为"/"的路由，制定 exact 后，"/page1"就不会再匹配到"/"了

> 注意：路由的 path 如果出现重复，则以第一个注册的组件为准生效，同时将会在浏览器控制台进行警告提示 路由 path 被重复注册。

### 路由的拆包打包与加载

gem-mine 提供了 asyncLoad 支持路由的拆包、加载能力。这样可以有效减小首屏 js 大小，同时提供了闲时自动下载这些独立的拆包，为非首屏的页面做预加载，提高了非首屏页面的加载性能与体验度。

```js
import { asyncLoad } from 'global/util/async-load'

import Container from 'components/examples'
import List from 'components/examples/List'

export default {
  path: '/examples',
  component: Container,
  description: '一些示例',
  // 子路由
  sub: {
    list: {
      component: List,
      description: '简单示例列表页',
      index: true
    },
    constant: {
      path: '/constant',
      component: asyncLoad('components/examples/constant'),
      description: '常量使用例子'
    },
    action: {
      path: '/action',
      component: asyncLoad('components/examples/counter'),
      description: 'action使用例子'
    },
    params: {
      path: '/params/:id',
      component: asyncLoad('components/examples/params'),
      description: 'URL变量和参数例子'
    },
    request: {
      path: '/request',
      component: asyncLoad('components/examples/request'),
      description: '请求使用例子'
    },
    permission: {
      path: '/permission',
      permission: function(props) {
        return props.example.count > 10
      },
      redirect: 'examples.permission.y',
      description: '权限拦截例子',
      module: {
        x: {
          path: '/x',
          component: asyncLoad('components/examples/permission/X')
        },
        y: {
          path: '/y',
          component: asyncLoad('components/examples/permission/Y')
        }
      }
    },
    ui: {
      path: '/ui',
      description: 'UI 组件库示例',
      component: asyncLoad('components/examples/ui')
    }
  }
}
```

这样，打包时候，asyncLoad 的组件就会被单独打包成类似 `1.1-9966fae0d52341b0adcb.js` 的文件。_sapphire 提供了闲时自动加载这些单独打包的文件，这样非首屏文件可以在闲时静默下载。_

#### 嵌套路由：sub 和 module 的区别

sub 和 module 都属于嵌套路由，会从祖先路由那里继承到 path 和 permission。其区别在于 sub 是子路由，需要一个容器作为承载，路由变化时，只有指定部分的内容会发生变化。 module 我们称之为平级模块，只是为了较少 path 和 permission 书写而已。module 无论嵌套多少级他们之间都是平级的，是共享操作一个区域的内容。

子路由 sub 被 `<Routes>` 组件接收，是这样使用的：

```js
// 使用顶级路由
<Routes/>

// 使用某个子路由
<Routes path="main.admin"/>
```

#### 默认路由

默认路由是针对 sub 的，当给某个 sub 的元素指定 index:true 时，如果 url 对应的是父路由的 path，该子路由会作为默认显示。例如上面的配置，当访问 / 时，permission 通过时，由于其 home 子路由具有 index:true，因此会默认显示 home 对应的内容。当然，访问 /home 也是一样显示 home。

默认路由还有另外一种写法，即子路由的 path 为 / 时，就是作为默认子路由显示，此时通常需要增加一个 exact:true 防止路由冲突，例如上面配置中的 main.admin.log.list。

如果是 module，想默认进入某个路由，可以使用 redirect 进行跳转。

#### 路由的拆分

所有路由都写在 `src/global/routes/index.js` 下的话，可能会导致该文件变得很大，多人协作时容易引起冲突。可以利用 js 的模块性质进行拆分，通常根据功能块进行拆分：

```javascript
import topicRoutes from './main.topic'
import adminRoutes from './main.admin'

router.register({
  login: {
    path: LOGIN_PATH,
    component: Login,
    description: '登录页',
    index: true // 根路由下默认显示
  },
  main: {
    path: '/',
    permission: props => {
      if (getIn(props, 'user.token') && getIn(props, 'user.name')) {
        return true
      }
      return <Redirect to={{ pathname: LOGIN_PATH }} />
    },
    // 子路由
    sub: {
      home: {
        path: '/home',
        component: Home,
        description: '首页',
        index: true
      },
      about: {
        path: '/about',
        component: About,
        description: '关于页'
      },
      topic: topicRoutes,
      admin: adminRoutes
    }
  }
})
```

topic 配置放在同目录下的 `main.topic.js` 中：

```javascript
export default {
  path: '/topics',
  redirect: 'main.topic.list', // 跳转到话题列表页（如果话题列表页path是 / 就不要 redirect）
  // 子模块
  module: {
    list: {
      description: '话题列表页',
      path: '/list',
      component: TopicList
    },
    add: {
      description: '添加话题页面',
      path: '/add',
      component: TopicAdd
    },
    detail: {
      description: '话题详细页',
      path: '/:id',
      component: TopicItem
    }
  }
}
```

同样也将 admin 配置抽取，放在同目录下的 `main.admin.js` 中

### 路由的使用

#### 使用子路由

使用 `Routes` 组件

```js
// 使用顶级路由
<Routes/>

// 使用某个子路由
<Routes path="main.admin"/>
```

#### 使用链接跳转

使用 `Link` 组件，一般结合 urlFor 来自动从路由配置中获取 url

```js
<Link to={urlFor('main.admin')}>跳转</Link>

// 携带参数，id命中路径参数，没命中的 name 和 age 作为查询参数，因此得到 url: /topics/233?name=tom&age22
<Link to={urlFor('main.topic.detail', {id: 233, name:'tom', age: 22})}>
```

#### 使用导航链接

对于导航性质，尤其是需要高亮处理的情况，建议使用 `NavLink` 替换 Link 组件。具体使用参看 <a href="https://reacttraining.com/react-router/web" target="_blank">react-router 4 文档</a>

#### 获取 url 参数

获取查询参数通过 @gem-mine/durex 提供的 `queryString` 工具对 search 参数进行解析，获取路径参数直接通过 props.match.params 来获取。

例如上面路由中定义的 main.topic.detail 对应的 url：/topics/233?name=tom&age22，其中的 233 就是路径参数（key 为 id），name 和 age 是查询参数，可以这样获取：

```js
import { queryString } from '@gem-mine/durex'

export default props => {
  const { name } = queryString.parse(props.location.search)
  const { id } = props.match.params

  // ...
}
```

注意，如果 props 中没有 search 和 match，需要使用 `withRouter` 对组件进行包装。

#### js 中路由跳转

actions 中默认具有一个 routing 对象，这个对象上有 5 个方法，是用来更新 location 的：

- push(url)： 往 history 中添加一条记录，并跳转到目标 url（浏览器具有后退功能）
- replace(url)： 替换 hisotry 中当前 url（替换当前 url，不会加入浏览器历史栈）
- go()：往前或者往后跳转
- goForward()：往前跳转一条历史记录，等价于 go(1)。
- goBack()：往后跳转一条历史记录，等价于 go(-1)。

这些方法来自于 history API，意义和用法完全一致。不过与原生方法不同的是，调用 actions.routing 上的这些方法，在更新 location 的同时，你的 routing 与 Redux store 将会保持同步，同时一个 type 为 `@@router/LOCATION_CHANGE` 的 action 会被 dispatch。

例如，我们需要代码中 3 秒后跳转到一个新的 url：

```jsx
import { actions, urlFor } from '@gem-mine/durex'

// ...
setTimeout(() => {
  actions.routing.push(urlFor('examples'))
}, 3000)
// ...
```

### 其他 react-router 的 API

@gem-mine/durex 对 <a href="https://reacttraining.com/react-router/web" target="_blank">react-router 4 </a> 进行了封装，但也将其常用 API 暴露出来，包括：

- Route
- Redirect
- Switch
- Prompt
- withRouter
- Link
- NavLink
