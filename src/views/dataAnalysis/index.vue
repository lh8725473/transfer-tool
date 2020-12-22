<template>
  <div class="authenticationCompany">
    <div class="seach-div">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline" size="mini">
        <el-form-item label="审核状态">
          <el-select v-model="searchParams.auditStatus" placeholder="请选择">
            <el-option v-for="item in auditStatusList" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
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

export default {
  name: 'AuthenticationCompany',
  data() {
    return {
      total: 0,
      statisticsTotal: {},
      auditStatusList: [
        {
          label: '未提交审核',
          id: 0
        },
        {
          label: '审核中',
          id: 1
        },
        {
          label: '审核通过',
          id: 2
        },
        {
          label: '审核驳回',
          id: 3
        }
      ],
      companyAuthList: [],
      searchParams: {
        pageNum: 1,
        pageSize: 10,
        sortColumns: '',
        sortDefault: false
      }
    }
  },
  created() {
    // this.getCompanyAuthList()
    this.getTotal()
  },
  mounted() {
    reportService.getPluginInDevice({})
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

    reportService.getRankInBrowser({})
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

    reportService.getAccessSiteeStatistic({})
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

    reportService.getPluginCountBySite({})
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

    reportService.getPluginDistribution({})
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
  methods: {
    getTotal() {
      reportService.getTotal({})
        .then(res => {
          this.statisticsTotal = res
        })
    },
    onSubmit() {
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
}
</style>
