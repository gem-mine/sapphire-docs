import React from 'react'
import Console from './Console'
import Typing from './Typing'
import style from './style'

export default props => {
  return (
    <Console className={style.typing}>
      <Typing onFinish={props.onFinish} />
    </Console>
  )
}
