import service from '@/utils/request'

const pluginService = {}

/*
 * 获取所有的插件列表
 * get /plugin/getPlugin
 */
pluginService.getPlugins = params => {
  return service({
    url: '/plugin/getPlugin',
    method: 'get',
    params
  })
}

export default pluginService
