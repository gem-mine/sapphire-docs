import React from 'react'
import { VelocityComponent } from 'velocity-react'
import logo from 'styles/images/logo.png'
import style from './style'

export default props => {
  return (
    <div className={style.logo}>
      <VelocityComponent animation={{ rotateZ: -360 }} duration={5000} loop easing="linear" runOnMount>
        <img src={logo} alt="logo" />
      </VelocityComponent>
    </div>
  )
}
