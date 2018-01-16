import React from 'react'
import style from './style'
import Links from './Links'
import logo1 from 'styles/images/logo-blue.png'
import logo2 from 'styles/images/logo-purple.png'
import logo3 from 'styles/images/logo-red.png'

export default props => {
  return (
    <div className={style.footer}>
      <div className={style.content}>
        <Links />
        <div className={style.right}>
          <img src={logo1} alt="gem-mine" />
          <img src={logo2} alt="gem-mine" />
          <img src={logo3} alt="gem-mine" />
        </div>
      </div>
    </div>
  )
}
