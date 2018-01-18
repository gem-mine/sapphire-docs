const path = require('path')
// 生成页面的 title
exports.title = `gem-mine's world`

// 别名配置
exports.resolve = {
  alias: {}
}

// 编译目录配置
exports.buildPath = path.resolve(__dirname, '../docs')

// todo: 静态资源路径配置, 如果有 cdn 支持，可以配置到 cdn，对本地开发无效
// exports.publicPath = './'

// 加入 vendor 公共包的库
exports.vendor = []

// webpack dev server 默认端口，也可以通过命令行来指定 --port=9000，默认9000
// exports.port = 9000

// 自定义的 loaders
const loaders = path.resolve(__dirname, './webpack/loaders')
exports.loaders = [{
  test: /\.md$/,
  loader: `html-loader!${loaders}/markdown`,
  options: {
    table: false
  }
}]

// 自定义的 plugins
exports.plugins = []

// 额外需要从 public 目录拷贝到编译后目录的资源（例如一些第三方的lib）
// 只需要写文件文件名即可，会在 vendor 构造时进行拷贝
// 引用请自行修改 public/index.html 进行处理
exports.additional = ['jquery-1.9.0.js']

// webpack 处理完毕后的回调处理
exports.done = function () {}
