import request from '@/utils/request'

const adminService = {}

/*
 * 后台登录
 * post /sys/login
 * data = {
 *   username: 'username',
 *   password: 'password',
 */
adminService.sysLogin = data => {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/*
 * 后台企业审核列表
 * get /companyAuth
 */
adminService.getCompanyAuthList = params => {
  return request({
    url: '/companyAuth',
    method: 'get',
    params
  })
}

/*
 * 后台企业审核详情
 * get /companyAuth/selectById?id=4
 */
adminService.getCompanyAuthDetail = params => {
  return request({
    url: '/companyAuth/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台企业审核(通过/不通过)
 * post /companyAuth/audit
 * data = {
 *   tblType: '表类型',
 *   tblTypePkId: '表ID',
 *   auditOpinion: '审核意见',
 *   auditStatus: '审核状态'
 * }
 */
adminService.postCompanyAuth = data => {
  return request({
    url: '/companyAuth/audit',
    method: 'post',
    data
  })
}

/*
 * 后台制氢审核列表
 * get /hydrogenProject
 */
adminService.getHydrogenProject = params => {
  return request({
    url: '/hydrogenProject',
    method: 'get',
    params
  })
}

/*
 * 后台制氢审核详情
 * get hydrogenProject/selectById?id=3
 */
adminService.getHydrogenProjectDetail = params => {
  return request({
    url: '/hydrogenProject/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台加氢站审核详情
 * get hydrogenationStation/selectById?id=3
 */
adminService.getHydrogenationStationDetail = params => {
  return request({
    url: '/hydrogenationStation/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台‘工业-化学合成’核详情
 * get chemicalSynthesis/selectById?id=3
 */
adminService.getChemicalSynthesisDetail = params => {
  return request({
    url: '/chemicalSynthesis/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台‘其它工业用途’审核详情
 * get industrialOther/selectById?id=3
 */
adminService.getIndustrialOtherDetail = params => {
  return request({
    url: '/industrialOther/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台‘能量转换’审核详情
 * get energyConversion/selectById?id=3
 */
adminService.getEnergyConversionDetail = params => {
  return request({
    url: '/energyConversion/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-电解水制氢’审核详情
 * get teElectrolyzedWater/selectById?id=3
 */
adminService.getTeElectrolyzedWaterDetail = params => {
  return request({
    url: '/teElectrolyzedWater/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-压缩机’审核详情
 * get teCompressor/selectById?id=3
 */
adminService.getTeCompressorDetail = params => {
  return request({
    url: '/teCompressor/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-储氢罐’审核详情
 * get teHydrogenStorage/selectById?id=3
 */
adminService.getTeHydrogenStorageDetail = params => {
  return request({
    url: '/teHydrogenStorage/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-加氢机’审核详情
 * get teHydrogenatMachine/selectById?id=3
 */
adminService.getTeHydrogenatMachineDetail = params => {
  return request({
    url: '/teHydrogenatMachine/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-燃料电池’审核详情
 * get teFuelCell/selectById?id=3
 */
adminService.getTeFuelCellDetail = params => {
  return request({
    url: '/teFuelCell/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-燃料电池汽车’审核详情
 * get teCarCompany/selectById?id=3
 */
adminService.getTeCarCompanyDetail = params => {
  return request({
    url: '/teCarCompany/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-关键材料’审核详情
 * get teKeyMaterial/selectById?id=3
 */
adminService.getTeKeyMaterialDetail = params => {
  return request({
    url: '/teKeyMaterial/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-关键零部件’审核详情
 * get teKeyParts/selectById?id=3
 */
adminService.getTeKeyPartsDetail = params => {
  return request({
    url: '/teKeyParts/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-氢能相关检测、测试系统’审核详情
 * get teDetectSystem/selectById?id=3
 */
adminService.getTeDetectSystemDetail = params => {
  return request({
    url: '/teDetectSystem/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-氢气纯化系统’审核详情
 * get tePurificationSystem/selectById?id=3
 */
adminService.getTePurificationSystemDetail = params => {
  return request({
    url: '/tePurificationSystem/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-其它’审核详情
 * get teOther/selectById?id=3
 */
adminService.getTeOtherDetail = params => {
  return request({
    url: '/teOther/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-燃料电池汽车’审核详情
 * get teCarCompany/selectById?id=3
 */
adminService.getTeCarCompanyDetail = params => {
  return request({
    url: '/teCarCompany/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台‘公共服务’审核详情
 * get publicService/selectById?id=3
 */
adminService.getPublicServiceDetail = params => {
  return request({
    url: '/publicService/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台储运氢审核详情
 * get hydrogenStorageTransport/selectById?id=3
 */
adminService.getHydrogenStorageTransportDetail = params => {
  return request({
    url: '/hydrogenStorageTransport/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台储运氢审核列表
 * get /hydrogenStorageTransport
 */
adminService.getHydrogenStorageTransport = params => {
  return request({
    url: '/hydrogenStorageTransport',
    method: 'get',
    params
  })
}

/*
 * 后台加氢站审核列表
 * get /hydrogenationStation
 */
adminService.getHydrogenationStation = params => {
  return request({
    url: '/hydrogenationStation',
    method: 'get',
    params
  })
}

/*
 * 后台‘工业-化学合成’审核列表
 * get /chemicalSynthesis
 */
adminService.getChemicalSynthesis = params => {
  return request({
    url: '/chemicalSynthesis',
    method: 'get',
    params
  })
}

/*
 * 后台‘工业其它用途’审核列表
 * get /industrialOther
 */
adminService.getIndustrialOther = params => {
  return request({
    url: '/industrialOther',
    method: 'get',
    params
  })
}

/*
 * 后台‘能量转换’审核列表
 * get /energyConversion
 */
adminService.getEnergyConversion = params => {
  return request({
    url: '/energyConversion',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-电解水装置’审核列表
 * get /teElectrolyzedWater
 */
adminService.getTeElectrolyzedWater = params => {
  return request({
    url: '/teElectrolyzedWater',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-压缩机’审核列表
 * get /teCompressor
 */
adminService.getTeCompressor = params => {
  return request({
    url: '/teCompressor',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-储氢罐’审核列表
 * get /teHydrogenStorage
 */
adminService.getTeHydrogenStorage = params => {
  return request({
    url: '/teHydrogenStorage',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-加氢机’审核列表
 * get /teHydrogenatMachine
 */
adminService.getTeHydrogenatMachine = params => {
  return request({
    url: '/teHydrogenatMachine',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-燃料电池’审核列表
 * get /teFuelCell
 */
adminService.getTeFuelCell = params => {
  return request({
    url: '/teFuelCell',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-燃料电池汽车’审核列表
 * get /teCarCompany
 */
adminService.getTeCarCompany = params => {
  return request({
    url: '/teCarCompany',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-关键材料’审核列表
 * get /teKeyMaterial
 */
adminService.getTeKeyMaterial = params => {
  return request({
    url: '/teKeyMaterial',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-关键零部件’审核列表
 * get /teKeyParts
 */
adminService.getTeKeyParts = params => {
  return request({
    url: '/teKeyParts',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-氢能相关检测、测试系统’审核列表
 * get /teDetectSystem
 */
adminService.getTeDetectSystem = params => {
  return request({
    url: '/teDetectSystem',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-氢气纯化系统’审核列表
 * get /tePurificationSystem
 */
adminService.getTePurificationSystem = params => {
  return request({
    url: '/tePurificationSystem',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-其它’审核列表
 * get /teOther
 */
adminService.getTeOther = params => {
  return request({
    url: '/teOther',
    method: 'get',
    params
  })
}

/*
 * 后台‘公共服务’审核列表
 * get /publicService
 */
adminService.getPublicService = params => {
  return request({
    url: '/publicService',
    method: 'get',
    params
  })
}

/*
 * 后台审核(通过/不通过)
 * post /companyAuth/audit
 * data = {
 *   tblType: '表类型',
 *   tblTypePkId: '表ID',
 *   auditOpinion: '审核意见',
 *   auditStatus: '审核状态'
 * }
 */
adminService.postAuth = data => {
  return request({
    url: '/auditData',
    method: 'post',
    data
  })
}

/*
 * 后台制氢月报审核列表
 * get /hpData
 */
adminService.getHpData = params => {
  return request({
    url: '/hpData',
    method: 'get',
    params
  })
}

/*
 * 后台储运氢月报审核列表
 * get /hstData
 */
adminService.getHstData = params => {
  return request({
    url: '/hstData',
    method: 'get',
    params
  })
}

/*
 * 后台加氢站月报审核列表
 * get /hsData
 */
adminService.getHsData = params => {
  return request({
    url: '/hsData',
    method: 'get',
    params
  })
}

/*
 * 后台‘工业-化学合成’月报审核列表
 * get /csData
 */
adminService.getCsData = params => {
  return request({
    url: '/csData',
    method: 'get',
    params
  })
}

/*
 * 后台‘工业其它用途’月报审核列表
 * get /ioData
 */
adminService.getIoData = params => {
  return request({
    url: '/ioData',
    method: 'get',
    params
  })
}

/*
 * 后台‘能量转换’月报审核列表
 * get /ecData
 */
adminService.getEcData = params => {
  return request({
    url: '/ecData',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-电解水制氢’月报审核列表
 * get /teEwData
 */
adminService.getTeEwData = params => {
  return request({
    url: '/teEwData',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-压缩机’月报审核列表
 * get /teCdata
 */
adminService.getTeCdata = params => {
  return request({
    url: '/teCdata',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-储氢罐’月报审核列表
 * get /teHsData
 */
adminService.getTeHsData = params => {
  return request({
    url: '/teHsData',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-加氢机’月报审核列表
 * get /teHmData
 */
adminService.getTeHmData = params => {
  return request({
    url: '/teHmData',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-燃料电池’月报审核列表
 * get /teFcData
 */
adminService.getTeFcData = params => {
  return request({
    url: '/teFcData',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-燃料电池汽车’月报审核列表
 * get /teCcData
 */
adminService.getTeCcData = params => {
  return request({
    url: '/teCcData',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-关键材料’月报审核列表
 * get /teKmData
 */
adminService.getTeKmData = params => {
  return request({
    url: '/teKmData',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-关键零部件’月报审核列表
 * get /teKpData
 */
adminService.getTeKpData = params => {
  return request({
    url: '/teKpData',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-氢能相关检测、测试系统’月报审核列表
 * get /teDsData
 */
adminService.getTeDsData = params => {
  return request({
    url: '/teDsData',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-氢气纯化系统’月报审核列表
 * get /tePsData
 */
adminService.getTePsData = params => {
  return request({
    url: '/tePsData',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-其它’月报审核列表
 * get /teOdata
 */
adminService.getTeOdata = params => {
  return request({
    url: '/teOdata',
    method: 'get',
    params
  })
}

/*
 * 后台制氢月报审核详情
 * get /hpData/selectById?id=5
 */
adminService.getHydrogenMothDetail = params => {
  return request({
    url: '/hpData/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台储运氢月报审核详情
 * get /hstData/selectById?id=5
 */
adminService.getHstDataMothDetail = params => {
  return request({
    url: '/hstData/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台加氢站月报审核详情
 * get /hsData/selectById?id=5
 */
adminService.getHsDataMothDetail = params => {
  return request({
    url: '/hsData/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台工业-化学合成月报审核详情
 * get /hsData/selectById?id=5
 */
adminService.getCsDataMothDetail = params => {
  return request({
    url: '/csData/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台工业其它用途月报审核详情
 * get /ioData/selectById?id=5
 */
adminService.getIoDataMothDetail = params => {
  return request({
    url: '/ioData/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台能量转换月报审核详情
 * get /ecData/selectById?id=5
 */
adminService.getEcDataMothDetail = params => {
  return request({
    url: '/ecData/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台技术装备-电解水装置月报审核详情
 * get /teEwData/selectById?id=5
 */
adminService.getTeEwDataDetail = params => {
  return request({
    url: '/teEwData/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台技术装备-压缩机月报审核详情
 * get /teCdata/selectById?id=5
 */
adminService.getTeCdataDetail = params => {
  return request({
    url: '/teCdata/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台技术装备-储氢罐月报审核详情
 * get /teHsData/selectById?id=5
 */
adminService.getTeHsDataDetail = params => {
  return request({
    url: '/teHsData/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台技术装备-加氢机月报审核详情
 * get /teHmData/selectById?id=5
 */
adminService.getTeHmDataDetail = params => {
  return request({
    url: '/teHmData/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台技术装备-燃料电池月报审核详情
 * get /teFcData/selectById?id=5
 */
adminService.getTeFcDataDetail = params => {
  return request({
    url: '/teFcData/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台技术装备-燃料电池汽车 月报审核详情
 * get /teCcData/selectById?id=5
 */
adminService.getTeCcDataDetail = params => {
  return request({
    url: '/teCcData/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台技术装备-关键材料 月报审核详情
 * get /teKmData/selectById?id=5
 */
adminService.getTeKmDataDetail = params => {
  return request({
    url: '/teKmData/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台技术装备-关键零部件 月报审核详情
 * get /teKpData/selectById?id=5
 */
adminService.getTeKpDataDetail = params => {
  return request({
    url: '/teKpData/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台技术装备-氢能相关检测、测试系统 月报审核详情
 * get /teDsData/selectById?id=5
 */
adminService.getTeDsDataDetail = params => {
  return request({
    url: '/teDsData/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台技术装备-氢气纯化系统 月报审核详情
 * get /tePsData/selectById?id=5
 */
adminService.getTePsDataDetail = params => {
  return request({
    url: '/tePsData/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台技术装备-其它 月报审核详情
 * get /teOdata/selectById?id=5
 */
adminService.getTeOdataDetail = params => {
  return request({
    url: '/teOdata/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台公共服务产品列表
 * get /psProduct
 */
adminService.getPsProductList = params => {
  return request({
    url: '/psProduct',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-电解水装置’产品列表
 * get /teEwProduct
 */
adminService.getTeEwProductList = params => {
  return request({
    url: '/teEwProduct',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-压缩机’产品列表
 * get /teCproduct
 */
adminService.getTeCproductList = params => {
  return request({
    url: '/teCproduct',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-储氢罐’产品列表
 * get /teHsProduct
 */
adminService.getTeHsProductList = params => {
  return request({
    url: '/teHsProduct',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-加氢机’产品列表
 * get /teHmProduct
 */
adminService.getTeHmProductList = params => {
  return request({
    url: '/teHmProduct',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-燃料电池’产品列表
 * get /teFcProduct
 */
adminService.getTeFcProductList = params => {
  return request({
    url: '/teFcProduct',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-燃料电池汽车’产品列表
 * get /teCcProduct
 */
adminService.getTeCcProductList = params => {
  return request({
    url: '/teCcProduct',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-关键材料’产品列表
 * get /teKmProduct
 */
adminService.getTeKmProductList = params => {
  return request({
    url: '/teKmProduct',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-关键零部件’产品列表
 * get /teKpProduct
 */
adminService.getTeKpProductList = params => {
  return request({
    url: '/teKpProduct',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-氢能相关检测、测试系统’产品列表
 * get /teDsProduct
 */
adminService.getTeDsProductList = params => {
  return request({
    url: '/teDsProduct',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-氢气纯化系统’产品列表
 * get /tePsProduct
 */
adminService.getTePsProductList = params => {
  return request({
    url: '/tePsProduct',
    method: 'get',
    params
  })
}

/*
 * 后台‘技术装备-其它’产品列表
 * get /teOproduct
 */
adminService.getTeOproductList = params => {
  return request({
    url: '/teOproduct',
    method: 'get',
    params
  })
}

/*
 * 后台公共服务产品详情
 * get /psProduct/selectById?id=1
 */
adminService.getPsProductAuthDetail = params => {
  return request({
    url: '/psProduct/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台’技术装备-电解水装置‘产品详情
 * get /teEwProduct/selectById?id=1
 */
adminService.getTeEwproductAuthDetail = params => {
  return request({
    url: '/teEwProduct/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台’技术装备-压缩机‘产品详情
 * get /teCproduct/selectById?id=1
 */
adminService.getTeCproductAuthDetail = params => {
  return request({
    url: '/teCproduct/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台’技术装备-储氢罐‘产品详情
 * get /teHsProduct/selectById?id=1
 */
adminService.getTeHsProductAuthDetail = params => {
  return request({
    url: '/teHsProduct/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台’技术装备-加氢机‘产品详情
 * get /teHmProduct/selectById?id=1
 */
adminService.getTeHmProductAuthDetail = params => {
  return request({
    url: '/teHmProduct/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台’技术装备-燃料电池‘产品详情
 * get /teFcProduct/selectById?id=1
 */
adminService.getTeFcProductAuthDetail = params => {
  return request({
    url: '/teFcProduct/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台’技术装备-燃料电池汽车‘产品详情
 * get /teCcProduct/selectById?id=1
 */
adminService.getTeCcProductAuthDetail = params => {
  return request({
    url: '/teCcProduct/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台’技术装备-关键材料‘产品详情
 * get /teKmProduct/selectById?id=1
 */
adminService.getTeKmProductAuthDetail = params => {
  return request({
    url: '/teKmProduct/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台’技术装备-关键零部件‘产品详情
 * get /teKpProduct/selectById?id=1
 */
adminService.getTeKpProductAuthDetail = params => {
  return request({
    url: '/teKpProduct/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台’技术装备-氢能相关检测、测试系统‘产品详情
 * get /teDsProduct/selectById?id=1
 */
adminService.getTeDsProductAuthDetail = params => {
  return request({
    url: '/teDsProduct/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台’技术装备-氢气纯化系统‘产品详情
 * get /tePsProduct/selectById?id=1
 */
adminService.getTePsProductAuthDetail = params => {
  return request({
    url: '/tePsProduct/selectById',
    method: 'get',
    params
  })
}

/*
 * 后台’技术装备-其它‘产品详情
 * get /teOproduct/selectById?id=1
 */
adminService.getTeOproductAuthDetail = params => {
  return request({
    url: '/teOproduct/selectById',
    method: 'get',
    params
  })
}

export default adminService
