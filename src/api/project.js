import request from '@/utils/request'
/**
 * 应用列表
 * @param params
 */
export function getProjectList(params) {
  return request({
    url: '/project/getProject',
    method: 'get',
    params
  })
}

/**
 * 页面列表
 * @param params
 */
export function getPageList(params) {
  return request({
    url: '/project/getProjectPageById',
    method: 'get',
    params
  })
}

/**
 * 获取页面所有的插件列表
 * @param params
 */
export function getProjectPluginByPage(params) {
  return request({
    url: '/project/getProjectPluginByPage',
    method: 'get',
    params
  })
}

/**
 * 获取插件调用，未调用api列表
 * @param params
 */
export function getProjectPluginFunction(params) {
  return request({
    url: '/project/getProjectPluginFunction',
    method: 'get',
    params
  })
}

/**
 * 获取页面调用，未调用api列表
 * @param params
 */
export function getProjectPageFunction(params) {
  return request({
    url: '/project/getProjectPageFunction',
    method: 'get',
    params
  })
}

/**
 * 获取项目所有的插件列表
 * @param params
 */
export function getPagetProjectPlugingeList(params) {
  return request({
    url: '/project/getProjectPlugin',
    method: 'get',
    params
  })
}

// export function addProject(data) {
//   return request({
//     url: '/project/add',
//     method: 'post',
//     data
//   })
// }
