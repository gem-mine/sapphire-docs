import React, { Component } from 'react'
import { smart } from '@gem-mine/durex'
import style from './style'
import { VelocityComponent } from 'velocity-react'
import 'velocity-animate/velocity.ui'
import Info from './Info'
import Logo from './Logo'
import Console from './console'

class Home extends Component {
  render() {
    const props = this.props

    const { showConsole, showMore } = props
    return (
      <div className={`${style.main} clear`}>
        <div className={style.box}>
          <VelocityComponent
            animation={showConsole ? 'slideUp' : 'slideDown'}
            duration={showConsole ? 500 : 4000}
            runOnMount={!showMore}
          >
            <Info />
          </VelocityComponent>

          <VelocityComponent animation={{ left: showConsole ? 0 : 600 }} duration={1000}>
            <Logo />
          </VelocityComponent>

          {showConsole ? (
            <VelocityComponent animation="transition.fadeIn" duration={1000} delay={600} runOnMount>
              <Console />
            </VelocityComponent>
          ) : (
            undefined
          )}
        </div>
      </div>
    )
  }
}

export default smart(state => {
  return state.home
})(Home)
