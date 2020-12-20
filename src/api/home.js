import service from '@/utils/request'

const homeService = {}

/*
 * 首页数据统计
 * get /home/countInfo
 */
homeService.getCountInfo = params => {
  return service({
    url: '/home/countInfo',
    method: 'get',
    params
  })
}

/*
 * 首页图表数据接口
 * post /home/getChartInfo
 */
homeService.getChartInfo = params => {
  return service({
    url: '/home/chartInfo',
    method: 'get',
    params
  })
}

export default homeService
