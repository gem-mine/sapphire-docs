import React from 'react'
import { smart, withRouter, Routes } from '@gem-mine/durex'
import 'normalize.css'
import 'github-markdown-css'
import 'highlight.js/styles/atom-one-light.css'
import 'styles/app'
import { Preload } from 'global/util/async-load'

import Header from 'components/common/header'
import Footer from 'components/common/footer'

const App = props => {
  return (
    <div className="main">
      <Header />
      <div className="body">
        <Routes />
      </div>
      <Footer />
      <Preload />
    </div>
  )
}

export default withRouter(
  smart(state => {
    return {}
  })(App)
)
