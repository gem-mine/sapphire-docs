import React, { Component } from 'react'
import { actions, smart } from '@gem-mine/durex'
import Typist from 'components/common/typist'
import style from './style'

class Typing extends Component {
  render() {
    const props = this.props
    const { done } = props
    const content = (
      <span>
        <span className={style.tip}>
          # 安装工具 🛠<br />
        </span>
        $: npm i @gem-mine/sapphire -g
        <br />
        <Typist.Delay ms={750} />
        <span className={style.tip}>
          # 初始化项目 🚀 <br />
        </span>
        $: sapphire project_name
        <br />
        <Typist.Delay ms={750} />
        <span className={style.tip}>
          # 开始开发 😀<br />
        </span>
        $: cd project_name
        <br />
        <Typist.Delay ms={750} />
        $: npm start
      </span>
    )

    const result = !done ? (
      <Typist cursor={{ hideWhenDone: true }} startDelay={1300} avgTypingSpeed={300} onTypingDone={props.onFinish}>
        {content}
      </Typist>
    ) : (
      <div>{content}</div>
    )

    return result
  }
}

export default smart(
  state => {
    return state.home
  },
  props => {
    return {
      onFinish() {
        actions.home.setField({ showMore: true })
      }
    }
  }
)(Typing)
