import service from '@/utils/request'

const reportService = {}

/*
 * 查看访问该页面时浏览器的详细配置信息
 * post /report/usingPluginInDevice
 */
reportService.getPluginInDevice = data => {
  return service({
    url: '/report/usingPluginInDevice',
    method: 'post',
    data
  })
}

/*
 * 数据统计-浏览器使用插件分布
 * post /report/pluginRankInBrowser
 */
reportService.getRankInBrowser = data => {
  return service({
    url: '/report/pluginRankInBrowser',
    method: 'post',
    data
  })
}

/*
 * 数据统计-总数统计
 * post /report/statisticsTotal
 */
reportService.getTotal = data => {
  return service({
    url: '/report/statisticsTotal',
    method: 'post',
    data
  })
}

/*
 * 数据统计-访问域名统计次数
 * post /report/accessSiteStatistic
 */
reportService.getAccessSiteeStatistic = data => {
  return service({
    url: '/report/accessSiteStatistic',
    method: 'post',
    data
  })
}

/*
 *数据统计-按域名统计插件个数
 * post /report/pluginCountBySite
 */
reportService.getPluginCountBySite = data => {
  return service({
    url: '/report/pluginCountBySite',
    method: 'post',
    data
  })
}

/*
 * 数据统计-系统插件使用设备分布
 * post /report/pluginDistribution
 */
reportService.getPluginDistribution = data => {
  return service({
    url: '/report/pluginDistribution',
    method: 'post',
    data
  })
}

export default reportService
