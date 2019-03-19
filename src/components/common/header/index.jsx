import React from 'react'
import { NavLink, Link, urlFor } from '@gem-mine/durex'
import style from './style'
import logo from 'styles/images/logo.png'

export default props => {
  return (
    <div className={style.nav}>
      <div className={`${style.header} clear`}>
        <Link to={''} className={style.logo}>
          <img src={logo} alt="gem-mine" />
          <strong>gem mine</strong>
        </Link>
        <ul className={style.items}>
          <li>
            <NavLink to={urlFor('docs.guide')} activeClassName={style.highlight}>
              新手指南
            </NavLink>
          </li>
          <li>
            <NavLink to={urlFor('docs.api')} activeClassName={style.highlight}>
              使用教程
            </NavLink>
          </li>
          <li>
            <NavLink to={urlFor('docs.question')} activeClassName={style.highlight}>
              常见问题
            </NavLink>
          </li>
          <li>
            <NavLink to={urlFor('docs.version')} activeClassName={style.highlight}>
              版本履历
            </NavLink>
          </li>
        </ul>
        <a href="http://github.com/gem-mine/gem-mine" target="_blank" className={style.version} />
      </div>
    </div>
  )
}
