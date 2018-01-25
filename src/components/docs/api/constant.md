# 环境变量与常量

## 环境变量

gem-mine 打包过程中会去 npm 中获取名为 **env** 的环境变量，同时将这个值写入名为 ENV 的常量，因此代码中可以直接使用这个变量。本地开发中想模拟这个环境变量，最简单有效的方式是通过 --env 指定：

```
npm start --env=dev
```

当然，小众做法是通过 npm 命令行设定：

```
npm config set env=dev
npm start
```

但最常使用到 ENV 这个常量的，是 gem-mine 脚手架里面的 常量与网络请求。

## 常量的定义与使用

常量配置文件：`config/constant.js`

如果是所有环境下的常量一致，可以直接定义输出：

```javascript
exports.TITLE = 'gem-mine'
```

常量命名规则是全大写字母，多个单词之间使用下划线连接，例如：SOME_CONSTANT

对于不同环境下的不同常量值，在 config/constant.js 中的 data 中进行定义：

```javascript
const data = {
  // 本地配置
  local: {
    NAME: 'tom'
  },
  // 开发环境
  dev: {
    NAME: 'jerry'
  },
  // 生产环境
  production: {
    NAME: 'lucy'
  }
}
```

没有 env 值时会读取 local 中的值，通常本地就是这种情况。当读取到 env 时，则获取对应的值，例如 env=production 时，读取到的 NAME 值是 lucy。

使用常量值，直接 import 即可：

```javascript
import { TITLE, NAME } from 'config/constant'
```

## 网络请求

请参看 <a href="#/docs/api/request">网络请求</a> 一节
