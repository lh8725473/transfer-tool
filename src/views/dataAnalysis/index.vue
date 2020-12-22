<template>
  <div class="authenticationCompany">
    <div class="seach-div">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline" size="mini">
        <el-form-item label="">
          <el-select v-model="searchParams.id" placeholder="请选择" @change="onChange">
            <el-option v-for="item in auditStatusList" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="exportReport">报告导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row :gutter="20" class="panel">
      <el-col :span="8" class="panel-item height100">
        <div class="number font45">{{ statisticsTotal.deviceCount }}</div>
        <div class="label font16">提交数据设备数</div>
      </el-col>
      <el-col :span="8" class="height100 flex">
        <el-row class="panel-item height125">
          <div class="number">{{ statisticsTotal.pluginCount }}</div>
          <div class="label">使用插件种类</div>
        </el-row>
        <el-row class="panel-item height125">
          <div class="number">{{ statisticsTotal.apiCount }}</div>
          <div class="label">使用API个数</div>
        </el-row>
      </el-col>
      <el-col :span="8" class="height100 flex">
        <el-row class="panel-item height125">
          <div class="number">{{ statisticsTotal.pageCount }}</div>
          <div class="label">访问网站数量</div>
        </el-row>
        <el-row class="panel-item height125">
          <div class="number">{{ statisticsTotal.siteCount }}</div>
          <div class="label">访问域名数量</div>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <div class="chart-panel">
          <div class="panel-header">
            设备插件数量使用情况
          </div>
          <div ref="chart1" class="pie-chart" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-panel">
          <div class="panel-header">
            使用浏览器插件分布
          </div>
          <div ref="chart2" class="pie-chart" />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="chart-panel">
          <div class="panel-header">
            访问域名次数统计
          </div>
          <div ref="chart3" class="bar-chart" />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="chart-panel">
          <div class="panel-header">
            域名插件使用次数统计
          </div>
          <div ref="chart4" class="bar-chart" />
        </div>
      </el-col>
    </el-row>

    <div class="plug-in-list-div">
      <div class="title">
        <div class="panel-header">
          使用插件排行
        </div>
        <div class="width120">使用插件网站数</div>
        <div class="width120">使用插件设备</div>
      </div>
      <div class="plug-in-list">
        <div v-for="item in pluginRankData" :key="item.classid" class="plug-in-item">
          <div class="plug-in-item-detail">
            <div class="item-detail">
              <div class="item-title">{{ item.name }}</div>
              <div class="item-type">插件类型：{{ item.type }}</div>
            </div>
          </div>
          <div class="width120">{{ item.site_count }}</div>
          <div class="width120">{{ item.device_count }}</div>
        </div>
      </div>
    </div>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="chart-panel">
          <div class="panel-header">
            系统插件使用设备分布
          </div>
          <div ref="chart5" class="bar-chart" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import adminService from '@/api/admin'
import reportService from '@/api/report'
import _ from 'lodash'
import Data from './data'
import qs from 'qs'
import dayjs from 'dayjs'

export default {
  name: 'AuthenticationCompany',
  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      total: 0,
      statisticsTotal: {},
      pluginRankData: [],
      auditStatusList: [
        {
          label: '所有时间',
          id: 0
        },
        {
          label: '近1个月',
          id: 30
        },
        {
          label: '近15天',
          id: 15
        },
        {
          label: '近7天',
          id: 7
        },
        {
          label: '近3天',
          id: 3
        }
      ],
      companyAuthList: [],
      searchParams: {
        startTime: '',
        endTime: '',
        id: 0
      }
    }
  },
  created() {
    // this.getCompanyAuthList()
    this.getTotal()
    this.getPluginRankData()
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      reportService.getPluginInDevice(this.searchParams)
        .then(res => {
          const mergePieOption1LegendData = []
          const mergePieOption1SeriesData = []
          _.forEach(res, item => {
            mergePieOption1LegendData.push(item.plugin_group)
            mergePieOption1SeriesData.push({
              value: item.device_count,
              name: item.plugin_group
            })
          })
          const mergePieOption1 = {
            legend: {
              data: mergePieOption1LegendData
            },
            series: [{
              data: mergePieOption1SeriesData
            }]
          }
          this.echartsInstance1 = window.echarts.init(this.$refs.chart1, 'hybigdata')
          this.echartsInstance1.setOption(_.merge(_.cloneDeep(Data.pieOption), mergePieOption1))
        })

      reportService.getRankInBrowser(this.searchParams)
        .then(res => {
          const mergeBrowserName = []
          const mergeBreowserNameSerialsData = []
          _.forEach(res, item => {
            mergeBrowserName.push(item.browser_name)
            mergeBreowserNameSerialsData.push({ value: item.plugin_count, name: item.browser_name })
          })

          const mergePieOption2 = {
            legend: {
              data: mergeBrowserName
            },
            series: [{
              data: mergeBreowserNameSerialsData
            }]
          }
          this.echartsInstance2 = window.echarts.init(this.$refs.chart2, 'hybigdata')
          this.echartsInstance2.setOption(_.merge(_.cloneDeep(Data.pieOption), mergePieOption2))
        })

      reportService.getAccessSiteeStatistic(this.searchParams)
        .then(res => {
          const mergeSiteList = []
          const mergeSiteCount = []
          _.forEach(res, item => {
            mergeSiteList.push(item.host + item.port)
            mergeSiteCount.push(item.site_count)
          })

          const mergeBarOption3 = {
            legend: {
              data: ['访问次数']
            },
            xAxis: [{
              type: 'category',
              data: mergeSiteList
            }],
            yAxis: [
              {
                type: 'value',
                name: 'X: 域名/ Y: 次数',
                nameTextStyle: {
                  color: '#666666'
                }
              }
            ],
            series: [
              {
                name: '访问次数',
                type: 'bar',
                data: mergeSiteCount
              }
            ]
          }
          this.echartsInstance3 = window.echarts.init(this.$refs.chart3, 'hybigdata')
          this.echartsInstance3.setOption(_.merge(_.cloneDeep(Data.barOption), mergeBarOption3))
        })

      reportService.getPluginCountBySite(this.searchParams)
        .then(res => {
          const mergeSiteList = []
          const mergeSitePluginCount = []
          _.forEach(res, item => {
            mergeSiteList.push(item.host)
            mergeSitePluginCount.push(item.plugin_count)
          })

          const mergeBarOption4 = {
            legend: {
              data: ['访问次数']
            },
            xAxis: [{
              type: 'category',
              data: mergeSiteList
            }],
            yAxis: [
              {
                type: 'value',
                name: 'X: 域名/ Y: 次数',
                nameTextStyle: {
                  color: '#666666'
                }
              }
            ],
            series: [
              {
                name: '访问次数',
                type: 'bar',
                data: mergeSitePluginCount
              }
            ]
          }
          this.echartsInstance4 = window.echarts.init(this.$refs.chart4, 'hybigdata')
          this.echartsInstance4.setOption(_.merge(_.cloneDeep(Data.barOption), mergeBarOption4))
        })

      reportService.getPluginDistribution(this.searchParams)
        .then(res => {
          const mergeSystemName = []
          const mergePluginCount = []
          const mergeDeviceCount = []
          _.forEach(res, item => {
            mergeSystemName.push(item.sys_name)
            mergePluginCount.push(item.plugin_count)
            mergeDeviceCount.push(item.device_count)
          })

          const mergeBarOption5 = {
            legend: {
              data: ['插件数量', '使用设备数']
            },
            xAxis: [{
              type: 'category',
              data: mergeSystemName
            }],
            yAxis: [
              {
                type: 'value',
                name: 'X: 系统/ Y: 数量',
                nameTextStyle: {
                  color: '#666666'
                }
              }
            ],
            series: [
              {
                name: '插件数量',
                type: 'bar',
                data: mergePluginCount
              },
              {
                name: '使用设备数',
                type: 'bar',
                data: mergeDeviceCount
              }
            ]
          }
          this.echartsInstance5 = window.echarts.init(this.$refs.chart5, 'hybigdata')
          this.echartsInstance5.setOption(_.merge(_.cloneDeep(Data.barOption), mergeBarOption5))
        })
    },
    getTotal() {
      reportService.getTotal(this.searchParams)
        .then(res => {
          this.statisticsTotal = res
        })
    },
    getPluginRankData() {
      reportService.getPluginRank(this.searchParams)
        .then(res => {
          this.pluginRankData = res
        })
    },
    onChange() {
      if (this.searchParams.id === 0) {
        this.searchParams.startTime = ''
        this.searchParams.endTime = ''
      } else {
        const now = dayjs()
        const startTime = now.subtract(this.searchParams.id, 'day')
        this.searchParams.startTime = dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
        this.searchParams.endTime = dayjs(now).format('YYYY-MM-DD HH:mm:ss')
      }

      this.init()
      this.getPluginRankData()
      this.getTotal()
    },

    exportReport() {
      const params = qs.stringify({
        token: localStorage.getItem('token'),
        ...this.searchParams
      })
      console.log(this.searchParams)
      window.open(process.env.VUE_APP_BASE_API + '/report/exportReport?' + params, '_blank')
    }

  }

}
</script>

<style lang='scss'>
.authenticationCompany{
  height: 100%;
  padding: 20px 30px;
  .pagination{
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .panel{
    height: 270px;
    margin-left: 0 !important;
    .panel-item{
      background: #ECF1F8;
      border-radius: 2px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      .number{
        font-size: 36px;
        font-family: Roboto;
        font-weight: bold;
        color: #333333;
      }
      .label{
        font-size: 14px;
        color: #757575;
      }
      .font45{
        font-size: 45px;
      }
      .font16{
        font-size: 16px;
      }
    }
    .height100{
      height: 100%;
    }
    .height125{
      height: 125px;
    }
    .flex{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .chart-panel{
    margin-bottom: 20px;
    margin-top: 20px;
    background: #FFFFFF;
    border: 1px solid #E9E9E9;
    border-radius: 2px;
    padding: 20px 30px;
    .panel-header{
      &::before{
        content: '';
        width: 3px;
        background-color: #558AD9;
        display: inline-block;
        height: 16px;
        position: relative;
        top: 2px;
        margin-right: 8px;
      }
      font-size: 16px;
      color: #333333;
      margin-bottom: 20px;
    }
    .pie-chart{
      height: 400px;
      width: 100%;
    }
    .bar-chart{
      height: 400px;
      width: 100%;
    }
  }
  .plug-in-list-div{
    .title{
      display: flex;
      .panel-header{
        flex: 1;
        &::before{
          content: '';
          width: 3px;
          background-color: #558AD9;
          display: inline-block;
          height: 16px;
          position: relative;
          top: 2px;
          margin-right: 8px;
        }
        font-size: 16px;
        color: #333333;
        margin-bottom: 10px;
      }
      .width120{
        width: 120px;
        text-align: center;
      }
    }
    .plug-in-list{
      border: 1px solid #DCDFE6;
      padding: 10px;
      max-height: 500px;
      overflow: auto;
      .plug-in-item{
        display: flex;
        border-bottom: 1px solid #DCDFE6;
        padding: 5px 0;
        .plug-in-item-detail{
          flex: 1;
          display: flex;
          .el-image{
            margin-right: 15px;
          }
          .item-detail{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .item-title{
              color: #333333;
              font-size: 16px;
              margin-bottom: 10px;
            }
            .item-type{
              font-size: 14px;
              color: #666666;
            }
          }
        }
        .width120{
          width: 120px;
          text-align: center;
          line-height: 70px;
        }
      }
    }
  }
}
</style>
