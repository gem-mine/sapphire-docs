const data = {
  // 本地配置
  local: {
    NAME: 'tom'
  },
  // 开发环境
  dev: {
    NAME: 'jerry'
  },
  // 生产环境
  production: {
    NAME: 'lucy'
  }
}

// 默认使用 local
const result = Object.assign({}, data[ENV || 'local'])
Object.keys(result).forEach(key => {
  exports[key] = result[key]
})
