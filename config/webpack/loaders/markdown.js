const loaderUtils = require('loader-utils')
const marked = require('marked')
const highlight = require('highlight.js')

module.exports = function (source) {
  const query = loaderUtils.parseQuery(this.query)
  const options = {
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    langPrefix: 'hljs ',
    highlight: function (code, lang) {
      return highlight.highlightAuto(code).value
    }
  }

  if (this.cacheable) {
    this.cacheable()
  }

  Object.keys(query).forEach(function (key) {
    options[key] = query[key]
  })

  return marked(source, options)
}
