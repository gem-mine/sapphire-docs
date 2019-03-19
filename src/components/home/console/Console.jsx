import React, { Component } from 'react'
import { smart, Link, actions, urlFor } from '@gem-mine/durex'
import { VelocityComponent } from 'velocity-react'
import style from './style'

class Console extends Component {
  render() {
    const props = this.props
    const { showMore } = props
    return (
      <div className={`${props.className} ${style.console}`}>
        <div className={style.header}>
          <span className={style.red} />
          <span className={style.yellow} />
          <span className={style.green} />
        </div>
        <div className={style.body}>{props.children}</div>
        {showMore ? (
          <VelocityComponent
            animation="transition.fadeIn"
            duration={2000}
            delay={200}
            runOnMount
            complete={props.finish}
          >
            <div className={style.footer}>
              <Link to={urlFor('docs.guide')}> 👉 查看新手指南</Link>
            </div>
          </VelocityComponent>
        ) : (
          undefined
        )}
      </div>
    )
  }
}

export default smart(
  state => {
    return state.home
  },
  props => {
    return {
      finish() {
        actions.home.setField({ done: true })
      }
    }
  }
)(Console)
