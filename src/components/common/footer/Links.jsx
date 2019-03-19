import React from 'react'
import { Link, urlFor } from '@gem-mine/durex'
import style from './style'

export default props => {
  return (
    <ul className={style.links}>
      <li>
        <dl>
          <dt>Github</dt>
          <dd>
            <a href="https://github.com/gem-mine" target="_blank">
              源码工程
            </a>
          </dd>
          <dd>
            <a href="https://github.com/gem-mine/durex" target="_blank">
              redux 工具
            </a>
          </dd>
          <dd>
            <a href="https://github.com/gem-mine/immutable" target="_blank">
              immutable 工具
            </a>
          </dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>Community</dt>
          <dd>
            <Link to={urlFor('docs.version')}>版本履历</Link>
          </dd>
          <dd>
            <Link to={urlFor('docs.question')}>常见问题</Link>
          </dd>
          <dd>
            <a href="https://github.com/gem-mine/gem-mine/issues" target="_blank">
              Issues
            </a>
          </dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>Links</dt>
          <dd>
            <a href="https://ant.design" target="_blank">
              Ant Design
            </a>
          </dd>
          <dd>
            <a href="https://mobile.ant.design" target="_blank">
              Ant Design Mobile
            </a>
          </dd>
          <dd>
            <a href="https://github.com/mirrorjs/mirror" target="_blank">
              mirror
            </a>
          </dd>
        </dl>
      </li>
    </ul>
  )
}
