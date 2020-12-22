import service from '@/utils/request'

const reportService = {}

/*
 * 查看访问该页面时浏览器的详细配置信息
 * post /report/usingPluginInDevice
 */
reportService.getBrowserDetail = data => {
  return service({
    url: '/report/usingPluginInDevice',
    method: 'post',
    data
  })
}

/*
 * 获取所有的浏览器信息
 * post /browser/getBrowser
 */
reportService.getBrowsers = params => {
  return service({
    url: '/browser/getBrowser',
    method: 'get',
    params
  })
}

/*
 * 省数据
 * post /public/city/getAllList
 * params = {
 *  provinceId: 130000
 * }
 */
reportService.getCityList = params => {
  return service({
    url: '/public/city/getAllList',
    method: 'get',
    params
  })
}

export default reportService
