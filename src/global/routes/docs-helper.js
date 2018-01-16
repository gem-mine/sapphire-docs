import React from 'react'
import Markdown from 'components/common/markdown'
import Layout from 'components/docs/Layout'

const md = markdown => {
  return props => {
    return <Markdown source={markdown} />
  }
}

const genSub = items => {
  const obj = {}
  let flag = false
  let first
  items.forEach((item, i) => {
    const { name, markdown, description, path, index } = item
    if (index) {
      flag = index
    }
    obj[name] = {
      path: path || `/${name}`,
      index,
      description,
      component: md(markdown)
    }
    if (i === 0) {
      first = obj[name]
    }
  })

  if (!flag) {
    first.index = true
  }

  return obj
}

const genModule = (...items) => {
  const obj = {}
  items.forEach(item => {
    const { name, path, redirect, subs } = item
    obj[name] = {
      path: path || `/${name}`,
      component: props => <Layout keyPath={`docs.${name}`} />,
      redirect,
      sub: genSub(subs)
    }
  })
  return obj
}

export default genModule
