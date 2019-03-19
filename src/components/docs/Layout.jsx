import React, { Component } from 'react'
import { NavLink, urlFor, Routes, router, withRouter } from '@gem-mine/durex'
import style from './style'

class Layout extends Component {
  componentDidMount() {
    this.gotoTop()
  }

  gotoTop = () => {
    document.documentElement.scrollTop = 0
  }
  active = data => {
    return urlFor(`${data.keyPath}.${data.key}`) === this.props.location.pathname || this.props.match.isExact
  }
  render() {
    const { keyPath } = this.props
    const items = router.getSub(keyPath)
    return (
      <div className={style.main}>
        <div className={style.aside}>
          <ul>
            {items.map((item, i) => {
              if (!item.index) {
                let nav
                if (i === 1) {
                  nav = (
                    <NavLink
                      to={urlFor(`${keyPath}.${item.key}`)}
                      onClick={this.gotoTop}
                      isActive={() => {
                        return this.active(item)
                      }}
                      activeClassName={style.highlight}
                    >
                      {item.description}
                    </NavLink>
                  )
                } else {
                  nav = (
                    <NavLink
                      to={urlFor(`${keyPath}.${item.key}`)}
                      onClick={this.gotoTop}
                      activeClassName={style.highlight}
                    >
                      {item.description}
                    </NavLink>
                  )
                }
                return <li key={item.key}>{nav}</li>
              }
            })}
          </ul>
        </div>

        <div className={style.content}>
          <Routes path={keyPath} />
        </div>
      </div>
    )
  }
}
export default withRouter(Layout)
