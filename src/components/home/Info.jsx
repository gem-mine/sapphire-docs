import React, { Component } from 'react'
import { actions, smart } from '@gem-mine/durex'
import style from './style'

class Info extends Component {
  render() {
    const props = this.props
    return (
      <div className={style.info}>
        <div className={style.title}>
          <h3>Born to build</h3>
          <p>
            better enterprise<br />boilerplate and tool for<br />
            <span className="blue">React</span> &amp; <span className="purple">Redux</span>
          </p>
          <span className={style.tip}>企业级 WEB 前端脚手架</span>
        </div>
        <p className={style.btns}>
          <button className={`${style.btn} ${style.primary}`} onClick={props.quickStart}>
            开始使用
          </button>
          <a className={style.btn} href="https://github.com/gem-mine/gem-mine" target="_blank">
            GitHub
          </a>
        </p>
      </div>
    )
  }
}

export default smart(null, props => {
  return {
    quickStart() {
      actions.home.setField({ showConsole: true })
    }
  }
})(Info)
