import service from '@/utils/request'

const publicService = {}

/*
 * 省数据
 * post /public/province/getAllList
 */
publicService.getProvinceList = params => {
  return service({
    url: '/public/province/getAllList',
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
publicService.getCityList = params => {
  return service({
    url: '/public/city/getAllList',
    method: 'get',
    params
  })
}

export default publicService
