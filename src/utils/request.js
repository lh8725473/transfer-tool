import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 后台token
    const token = localStorage.getItem('token')
    if (token) {
      if (config.params) {
        config.params.token = token
      } else {
        config.params = {}
        config.params.token = token
      }
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.data.status === 1) {
      return response.data.data
    } else {
      if (response.data.status === -6) { // 无权限
        Message({
          message: response.data.message,
          type: 'error'
        })
        location.href = '#/login'
        localStorage.removeItem('token')
        store.dispatch('updateUser', {})
        return Promise.reject(response)
      } else {
        Message({
          message: response.data.message,
          type: 'error'
        })
        return Promise.reject(response)
      }
    }
  },
  error => {
    console.log(error)
    if (error.message) {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default service
