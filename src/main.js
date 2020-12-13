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
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// 上传地址
Vue.prototype.$uploadUrl =
  process.env.VUE_APP_API_ROOT + '/sys/file/upload/singleFile'
// 下载地址
Vue.prototype.$downloadPath =
  process.env.VUE_APP_API_ROOT + 'reid/download?second_path=TEMP&fileName='
// 预览地址
Vue.prototype.$previewPath =
  process.env.VUE_APP_API_ROOT + '/sys/file/preview/file?filePath='

// 全局filter
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// Vue.prototype.$socket = socket('ws://192.168.100.210:5005/video_template')
// Vue.prototype.$socket = socket('ws://192.168.100.178:5700/video_template')
// Vue.prototype.$socket = socket(process.env.VUE_APP_BASE_WS)

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
