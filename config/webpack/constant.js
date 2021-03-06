const path = require('path')
const config = require('../webpack')
const { CONSTANT } = require('@gem-mine/sapphire-helper')
const { SXP, SXP_PREFIX } = CONSTANT

const ROOT = path.resolve(__dirname, '../../')
const NM = 'node_modules'
const NODE_MODULES = path.resolve(ROOT, NM)
const SRC = path.resolve(ROOT, 'src')
const BUILD = config.buildPath || path.resolve(ROOT, 'build')
const PUBLIC = path.resolve(ROOT, 'public')
const CONFIG = path.resolve(ROOT, 'config')
const STYLE = path.resolve(SRC, 'styles')

let CDN = false
// 使用 --cdn 或者 env 在 cdnEnv 中，则启用 cdn 功能
if (config.cdn) {
  if (!!process.env.npm_config_cdn || (config.cdn.env && config.cdn.env.indexOf(process.env.npm_config_env) > -1)) {
    CDN = true
  }
}

const GEM_MINE_DOC = 'http://gem-mine.club'
const GEM_MINE_DOC_VERSION = `${GEM_MINE_DOC}/#/docs/version`
const UI_DOC = {
  [`${SXP_PREFIX}/fish`]: `http://fish-docs.${SXP}.${3 - 2}01.com/changelog-cn`,
  [`${SXP_PREFIX}/fish-mobile`]: `http://fish-design-mobile.${SXP}.10${3 - 2}.com/changelog-cn`,
  antd: 'https://ant.design/changelog-cn',
  'antd-mobile': 'https://mobile.ant.design/changelog-cn'
}

exports.ROOT = ROOT
exports.NODE_MODULES = NODE_MODULES
exports.SRC = SRC
exports.BUILD = BUILD
exports.PUBLIC = PUBLIC
exports.CONFIG = CONFIG
exports.STYLE = STYLE
exports.CDN = CDN
exports.GEM_MINE_DOC = GEM_MINE_DOC
exports.GEM_MINE_DOC_VERSION = GEM_MINE_DOC_VERSION
exports.SXP_PREFIX = SXP_PREFIX
exports.UI_DOC = UI_DOC
