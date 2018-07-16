import genModule from './docs-helper'

// 新手指南
import Introduce from 'components/docs/guide/introduce.md'
import Quickstart from 'components/docs/guide/quickstart.md'
import Catalogue from 'components/docs/guide/catalogue.md'
import Example from 'components/docs/guide/example.md'

// 使用教程
import Command from 'components/docs/api/command.md'
import Constant from 'components/docs/api/constant.md'
import Model from 'components/docs/api/model.md'
import Router from 'components/docs/api/router.md'
import Request from 'components/docs/api/request.md'
import I18n from 'components/docs/api/i18n.md'
import Webpack from 'components/docs/api/webpack.md'
import CatEye from 'components/docs/api/cat-eye.md'

// 常见问题
import Faq from 'components/docs/question/faq.md'
import QuestionList from 'components/docs/question/list.md'
// import Contribute from 'components/docs/question/contribute.md'

// 版本履历
import ChangeLog from 'components/docs/version/changelog.md'
import TodoList from 'components/docs/version/todolist.md'
import Thanks from 'components/docs/version/thanks.md'

export default {
  path: '/docs',
  redirect: 'docs.guide.introduce',
  module: genModule(
    {
      name: 'guide',
      subs: [
        { name: 'introduce', markdown: Introduce, description: 'gem-mine 是什么' },
        { name: 'quickstart', markdown: Quickstart, description: '快速入门' },
        { name: 'catalogue', markdown: Catalogue, description: '目录结构' },
        { name: 'example', markdown: Example, description: '开发实例' }
      ]
    },
    {
      name: 'api',
      subs: [
        { name: 'command', markdown: Command, description: '命令行' },
        { name: 'constant', markdown: Constant, description: '环境变量与常量' },
        { name: 'model', markdown: Model, description: 'model' },
        { name: 'router', markdown: Router, description: '路由' },
        { name: 'request', markdown: Request, description: '网络请求' },
        { name: 'i18n', markdown: I18n, description: '国际化' },
        { name: 'webpack', markdown: Webpack, description: 'webpack 配置' },
        { name: 'cat-eye', markdown: CatEye, description: 'cat-eye api 速查' }
      ]
    },
    {
      name: 'question',
      subs: [
        { name: 'list', markdown: QuestionList, description: '常见问题列表' },
        { name: 'faq', markdown: Faq, description: '如何高效反馈问题' }
        // { name: 'contribute', markdown: Contribute, description: '如何贡献' }
      ]
    },
    {
      name: 'version',
      subs: [
        { name: 'changelog', markdown: ChangeLog, description: '版本履历' },
        { name: 'todolist', markdown: TodoList, description: '待办事项' },
        { name: 'thanks', markdown: Thanks, description: '鸣谢' }
      ]
    }
  )
}
