import service from '@/utils/request'

const browserService = {}

/*
 * 查看访问该页面时浏览器的详细配置信息
 * post /browser/browserDetail
 * browserConfigId 设备详情记录id
 */
browserService.getBrowserDetail = data => {
  return service({
    url: '/browser/browserDetail',
    method: 'post',
    data
  })
}

/*
 * 获取所有的浏览器信息
 * post /browser/getBrowser
 */
browserService.getBrowsers = params => {
  return service({
    url: '/browser/getBrowser',
    method: 'get',
    params
  })
}

/*
 * 获取所有的浏览器信息
 * post /browser/getBrowser
 */
browserService.getBrowserVersion = params => {
  return service({
    url: '/browser/getBrowserVersion',
    method: 'get',
    params
  })
}

export default browserService
