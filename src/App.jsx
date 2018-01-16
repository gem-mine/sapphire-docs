import React from 'react'
import { smart, withRouter, Routes } from 'cat-eye'
import 'normalize.css'
import 'github-markdown-css'
import 'highlight.js/styles/atom-one-light.css'
import 'styles/app'

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
    </div>
  )
}

export default withRouter(
  smart(state => {
    return {}
  })(App)
)
