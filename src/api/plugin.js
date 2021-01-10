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

pluginService.getPluginDetail = params => {
  return service({
    url: '/plugin/getPluginInfo',
    method: 'get',
    params
  })
}

/*
 * 查询插件列表按终端排序
 * get /plugin/getAllPlugin
 */
pluginService.getAllPlugin = params => {
  return service({
    url: '/plugin/getAllPlugin',
    method: 'get',
    params
  })
}

/*
 * 获取插件调用，未调用api列表
 * get /plugin/getFunctionByPluginId
 */
pluginService.getFunctionByPluginId = params => {
  return service({
    url: '/plugin/getFunctionByPluginId',
    method: 'get',
    params
  })
}

/*
 * 获取插件使用该插件应用列表
 * get /plugin/getSiteByPluginId
 */
pluginService.getSiteByPluginId = params => {
  return service({
    url: '/plugin/getSiteByPluginId',
    method: 'get',
    params
  })
}

/*
 * 获取插件调用，使用该插件设备列表
 * get /plugin/getDeviceByPluginId
 */
pluginService.getDeviceByPluginId = params => {
  return service({
    url: '/plugin/getDeviceByPluginId',
    method: 'get',
    params
  })
}

export default pluginService
