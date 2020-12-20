import service from '@/utils/request'

const sourceFileRecordService = {}

/*
 * 原始文件记录列表
 * post /data/sourceFileRecord
 */
sourceFileRecordService.getSourceFileRecordList = data => {
  return service({
    url: '/data/sourceFileRecord',
    method: 'post',
    data
  })
}

/*
 * 逻辑删除原始数据
 * post /data/sourceFileDelete
 */
sourceFileRecordService.sourceFileDelete = data => {
  return service({
    url: '/data/sourceFileDelete',
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
sourceFileRecordService.getCityList = params => {
  return service({
    url: '/public/city/getAllList',
    method: 'get',
    params
  })
}

export default sourceFileRecordService
