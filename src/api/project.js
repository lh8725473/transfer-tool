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
export function getProjectPluginList(params) {
  return request({
    url: '/project/getProjectPlugin',
    method: 'get',
    params
  })
}

/**
 * 获取项目中插件调用，未调用api列表
 * @param params
 */
export function getPluginFuntionBySite(params) {
  return request({
    url: '/project/getPluginFuntionBySite',
    method: 'get',
    params
  })
}

/**
 * 获取项目中使用指定插件的页面列表
 * @param params
 */
export function getUsePluginPageBySite(params) {
  return request({
    url: '/project/getUsePluginPageBySite',
    method: 'get',
    params
  })
}

/**
 * 获取项目中指定页面的内容
 * @param params
 */
export function getPageBySiteId(params) {
  return request({
    url: '/project/getPageBySiteId',
    method: 'get',
    params
  })
}

/**
 * 获取项目中指定页面指定插件的内容
 * @param params
 */
export function getPluginById(params) {
  return request({
    url: '/project/getPluginById',
    method: 'get',
    params
  })
}

/**
 *获取页面插件所有api总数
 * @param params
 */
export function getProjectPluginFunctionCount(params) {
  return request({
    url: '/project/getProjectPluginFunctionCount',
    method: 'get',
    params
  })
}

/**
 * 获取页面指定api引用记录
 */

export function getPageApiRecord(params) {
  return request({
    url: '/project/getProjectPageFunctionQuoteRecord',
    method: 'get',
    params
  })
}

/**
 * 获取页面指定CSS引用记录
 */

export function getPageCSSRecord(params) {
  return request({
    url: '/project/getProjectPageCSSQuoteRecord',
    method: 'get',
    params
  })
}

/**
 * 获取页面调用，未调用api列表
 * @param params
 */
export function getProjectPageCSS(params) {
  return request({
    url: '/project/getProjectPageCSS',
    method: 'get',
    params
  })
}

/**
 * 获取页面api,css 原始文件记录
 * @param params
 */
export function getLocalFileContent(params) {
  return request({
    url: '/project/getLocalFileContent',
    method: 'get',
    params
  })
}
