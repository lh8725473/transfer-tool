import request from '@/utils/request'

// 燃料电池录入（列表）
export function getFuelCellInputList(data) {
  return request({
    url: '/fuelCellInput',
    method: 'get',
    data
  })
}
