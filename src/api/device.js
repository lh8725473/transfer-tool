import service from '@/utils/request'

const deviceService = {}

/*
 * 查看数据包分析后的页面记录
 * post /device/deviceDetail
 * deviceinfoId 设备详情记录id
 */
deviceService.getDeviceDetail = data => {
  return service({
    url: '/device/deviceDetail',
    method: 'post',
    data
  })
}

/*
 * 查询所有的设备列表
 * post /device/getDevice
 * deviceinfoId 设备详情记录id
 */
deviceService.getDevice = data => {
  return service({
    url: '/device/getDevice',
    method: 'get',
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
deviceService.getCityList = params => {
  return service({
    url: '/public/city/getAllList',
    method: 'get',
    params
  })
}

export default deviceService
