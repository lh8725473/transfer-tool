/*
 * @Description:
 * @version:
 * @Author: whimzhu
 * @Date: 2020-12-05 13:15:19
 * @LastEditors: whimzhu
 * @LastEditTime: 2020-12-05 16:03:45
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import socket from 'socket.io-client'

import '@/styles/index.scss' // global css
import '@/fonts/iconfont.css' // 引入iconfont.css

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import App from './App'
import store from './store'
import router from './router'
import * as filters from '@/utils/filters'

import '@/icons' // icon
import '@/permission' // permission control

import 'highlight.js/styles/atom-one-dark.css'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

// 上传地址
Vue.prototype.$uploadUrl = process.env.VUE_APP_BASE_API + '/data/offlineUpload?token='
// 下载地址
Vue.prototype.$downloadPath = process.env.VUE_APP_BASE_API + 'reid/download?second_path=TEMP&fileName='
// 预览地址
Vue.prototype.$previewPath = process.env.VUE_APP_BASE_API + '/sys/file/preview/file?filePath='
// socket链接
if (localStorage.getItem('token')) {
  Vue.prototype.$socket = socket(process.env.VUE_APP_BASE_WS + '?token=' + localStorage.getItem('token'))
}

// 全局filter
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// Vue.prototype.$socket = socket('ws://192.168.100.210:5005/video_template')
// Vue.prototype.$socket = socket('ws://192.168.100.178:5700/video_template')
// Vue.prototype.$socket = socket(process.env.VUE_APP_BASE_WS)

const vueInstance = new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})

console.log(vueInstance)
export default vueInstance

var hljs = require('highlight.js')
// import hljs from 'highlight.js';

var vueHighlightJS = {}
vueHighlightJS.install = function install(Vue) {
  Vue.directive('highlightjs', {
    deep: true,
    bind: function bind(el, binding) {
      // on first bind, highlight all targets
      var targets = el.querySelectorAll('code')
      var target
      var i

      for (i = 0; i < targets.length; i += 1) {
        target = targets[i]

        if (typeof binding.value === 'string') {
          // if a value is directly assigned to the directive, use this
          // instead of the element content.
          target.textContent = binding.value
        }

        hljs.highlightBlock(target)
      }
    },
    componentUpdated: function componentUpdated(el, binding) {
      // after an update, re-fill the content and then highlight
      var targets = el.querySelectorAll('code')
      var target
      var i

      for (i = 0; i < targets.length; i += 1) {
        target = targets[i]
        if (typeof binding.value === 'string') {
          target.textContent = binding.value
        }
        hljs.highlightBlock(target)
      }
    }
  })
}

// module.exports = vueHighlightJS
Vue.use(vueHighlightJS)
