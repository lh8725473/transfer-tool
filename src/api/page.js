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
  console.log(data)
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
 * 访问页面插件api记录
 * post /page/pagePluginDetail
 * pageId 页面详情记录id
 */
pageService.getPluginFcuntion = params => {
  return service({
    url: '/page/getPluginFcuntion',
    method: 'get',
    params
  })
}

/*
 * 获取所有的网站信息
 * get /site/getSite
 */
pageService.getSite = params => {
  return service({
    url: '/site/getSite',
    method: 'get',
    params
  })
}

pageService.getFunctions = params => {
  return service({
    url: '/page/getApi',
    method: 'get',
    params
  })
}

/**
 * 删除页面记录
 * post page/deletePageRecord
 */
pageService.pageRecordDelete = data => {
  return service({
    url: '/page/deletePageRecord',
    method: 'post',
    data
  })
}
/**
 * 检查是否可以批量下载
 * get page/checkDownloadStatus
 */
pageService.checkDownloadStatus = params => {
  return service({
    url: '/page/checkDownloadStatus',
    method: 'get',
    params
  })
}

export default pageService
