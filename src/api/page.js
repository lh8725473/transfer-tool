import service from '@/utils/request'

const pageService = {}

/*
 * 查看数据包分析后的页面记录
 * post page/pageRecord
 */
pageService.getPageRecordList = data => {
  return service({
    url: 'page/pageRecord',
    method: 'post',
    data
  })
}

/*
 * 查看数据包分析后的页面记录
 * post page/pageRecord
 */
pageService.getPageApiDetail = data => {
  return service({
    url: 'page/pageApiDetail',
    method: 'post',
    data
  })
}

/*
 * 查看数据包分析后的页面记录
 * post /page/pagePluginDetail
 * pageId 页面详情记录id
 */
pageService.getPagePluginDetail = data => {
  return service({
    url: 'page/pagePluginDetail',
    method: 'post',
    data
  })
}

/*
 * 访问记录详情
 * post /page/pagePluginDetail
 * pageId 页面详情记录id
 */
pageService.getPageDetailById = data => {
  return service({
    url: '/page/pageDetailById',
    method: 'post',
    data
  })
}

/*
 * 省数据
 * post /public/city/getAllList
 * params = {
 *  provinceId: 130000
 * }
 */
pageService.getCityList = params => {
  return service({
    url: '/public/city/getAllList',
    method: 'get',
    params
  })
}

export default pageService
