<template>
  <div class="pageDetail">
    <div class="pageTitle-url">
      <label>{{ pageInfo.pageTitle }}</label>
      <label>{{ pageInfo.url }}</label>
    </div>
    <div class="panel">
      <div class="panel-header">
        系统已安装插件({{ total }})
      </div>
      <div class="plugin-list">
        <el-tag
          v-for="item in pluginRecordList"
          :key="item.classId"
          :type="item.selected ? '' : 'info' "
          :effect="item.selected ? 'dark' : 'plain'"
          @click="changePlugin(item)"
        >
          {{ item.name }} ({{ item.pluginFunctionCount }})次
        </el-tag>
        <el-tag
          v-show="pluginRecordList.length < total "
          type="''"
          effect="plain"
          @click="getMore"
        >
          更多...
        </el-tag>
      </div>

      <div class="panel-content">
        <el-row class="plugin-detail">
          <el-row class="margin-bottom15">
            <el-col :span="8" class="text-overflow">
              <label>插件ID：</label>
              <span>{{ plugin.classId }}</span>
            </el-col>
            <el-col :span="8" class="text-overflow">
              <label>插件路径：</label>
              <span>{{ plugin.directory }}</span>
            </el-col>
            <el-col :span="8" class="text-overflow">
              <label>插件文件名：</label>
              <span>{{ plugin.fileName }}</span>
            </el-col>
          </el-row>
          <el-row class="margin-bottom15">
            <el-col :span="8" class="text-overflow">
              <label>插件大小：</label>
              <span>{{ plugin.fileSize }}</span>
            </el-col>
            <el-col :span="8" class="elColClass">
              <label>浏览插件属性ID：</label>
              <el-tooltip placement="top">
                <div slot="content" class="tooltipContent">{{ plugin.progId }}</div>
                <span class="text-overflow">{{ plugin.progId }}</span>
              </el-tooltip>
            </el-col>
            <el-col :span="8" class="text-overflow">
              <label>id：</label>
              <span>{{ plugin.id }}</span>
            </el-col>
          </el-row>
          <el-row class="margin-bottom15">
            <el-col :span="8" class="text-overflow">
              <label>插件类型ID：</label>
              <span>{{ plugin.typeLib }}</span>
            </el-col>
            <el-col :span="8" class="text-overflow">
              <label>插件版本：</label>
              <span>{{ plugin.version }}</span>
            </el-col>
            <el-col :span="8" class="text-overflow">
              <label>插件类型：</label>
              <span>{{ plugin.type }}</span>
            </el-col>
          </el-row>
          <el-row class="margin-bottom15">
            <el-col :span="8" class="text-overflow">
              <label>是否启用：</label>
              <span>{{ plugin.enabled }}</span>
            </el-col>
            <el-col :span="8" class="text-overflow">
              <label>插件阻止次数：</label>
              <span>{{ plugin.blockCount }}</span>
            </el-col>
            <el-col :span="8" class="text-overflow">
              <label>作者：</label>
              <span>{{ plugin.companyName }}</span>
            </el-col>
          </el-row>
          <el-row class="margin-bottom15">

            <el-collapse accordion>
              <el-collapse-item title="调用代码：">
                <span>{{ plugin.outerHTML }}</span>
              </el-collapse-item>
            </el-collapse>

          </el-row>
        </el-row>
      </div>
      <div class="inUsefunctionList">
        <el-row>
          <label>调用API（{{ pluginFunctionInUseTotal }}）:</label>
          <el-tag
            v-for="(item,index) in inUsefunctionList"
            :key="index"
            type="''"
            effect="plain"
            size="medium"
          >
            {{ item.function_name }} (调用{{ item.count }}次)
          </el-tag>
          <el-tag
            v-show="inUsefunctionList.length < pluginFunctionInUseTotal "
            type="''"
            effect="plain"
            @click="getMorePluginFunction"
          >
            更多...
          </el-tag>
        </el-row>
        <el-row>
          <label>未调用API（{{ pluginFunctionCount - pluginFunctionInUseTotal }}）:</label>
          <el-tag
            v-for="(item,index) in unUsefunctionList"
            :key="index"
            type="''"
            effect="plain"
            size="medium"
          >
            {{ item.function_name }} (调用{{ item.count }}次)
          </el-tag>

          <el-tag
            v-show="unUsefunctionList.length < pluginFunctionCount - pluginFunctionInUseTotal"
            type="''"
            effect="plain"
            @click="getMorePluginFunctionUnUse"
          >
            更多...
          </el-tag>
        </el-row>
      </div>
    </div>
    <div class="page-api-recordList panel">
      <div class="panel-header">
        浏览器兼容API({{ pageApiRecordList.inUse.length + pageApiRecordList.unUse.length }})
      </div>
      <el-row class="page-api-recordList-inUse">
        <el-tag
          v-for="(item,index) in pageApiRecordList.inUse"
          :key="index"
          type="''"
          effect="plain"
        >
          {{ item.name }} (调用{{ item.count }}次)
        </el-tag>
      </el-row>

      <el-row class="page-api-recordList-unUse">
        <el-tag
          v-for="(item,index) in pageApiRecordList.unUse"
          :key="index"
          type="''"
          effect="plain"
        >
          {{ item.name }} (调用{{ item.count }}次)
        </el-tag>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getProjectPluginByPage } from '@/api/project'
import { getProjectPluginFunction } from '@/api/project'
import { getProjectPageFunction } from '@/api/project'
import { getPageBySiteId } from '@/api/project'
import { getPluginById } from '@/api/project'
import { getProjectPluginFunctionCount } from '@/api/project'

import _ from 'lodash'
export default {
  name: 'PluginManage',
  data() {
    return {
      total: 0,
      pluginFunctionInUseTotal: 0, // 插件调用api总数
      pluginFunctionunUseTotal: 0, // 插件未调用api总数
      pluginFunctionCount: 0,
      plugin: {}, // 插件详情
      pageInfo: {}, // 页面详情
      pluginRecordList: [],
      pageApiRecordList: { 'inUse': [], 'unUse': [] },
      inUsefunctionList: [],
      unUsefunctionList: [],
      searchParams: {
        page: 1,
        size: 5,
        siteId: null,
        pathName: null,
        classid: ''
      },
      searchPluginFunctionParams: { // 查询api调用未调用参数
        page: 1,
        size: 5,
        siteId: null,
        pathName: null,
        classid: '',
        type: 'inUse'
      },
      searchPluginFunctionUnUseParams: { // 查询api调用未调用参数
        page: 0,
        size: 5,
        siteId: null,
        pathName: null,
        classid: '',
        type: 'unUse'
      }
    }
  },
  created() {
    this.searchParams.siteId = this.$route.query.siteId
    this.searchParams.pathName = this.$route.query.pathName

    this.searchPluginFunctionParams.siteId = this.$route.query.siteId
    this.searchPluginFunctionParams.pathName = this.$route.query.pathName

    this.searchPluginFunctionUnUseParams.siteId = this.$route.query.siteId
    this.searchPluginFunctionUnUseParams.pathName = this.$route.query.pathName

    this.getPageBySiteId()
    this.getPagePlugin()
    // this.getFunction()

    this.getPageApiList()
  },
  methods: {
    getPageBySiteId() {
      getPageBySiteId({ siteId: this.searchParams.siteId, pathName: this.searchParams.pathName })
        .then(res => {
          this.pageInfo = res
        })
    },
    changePlugin(row) {
      _.forEach(this.pluginRecordList, item => {
        item.selected = false
      })
      row.selected = true
      this.searchParams.classid = row.classId
      this.searchPluginFunctionParams.classid = row.classId
      this.searchPluginFunctionUnUseParams.classid = row.classId
      this.searchPluginFunctionParams.page = 1
      this.searchPluginFunctionUnUseParams.page = 0
      this.getPluginInfo() // 获取插件详细信息
      this.getProjectPluginFunctionCount() // 获取插件所有api个数
      getProjectPluginFunction(this.searchParams) // 查询插件使用api记录
        .then(res2 => {
          if (res2 != null) {
            this.inUsefunctionList = res2.data
            this.unUsefunctionList = []

            this.pluginFunctionInUseTotal = res2.total
            this.pluginFunctionUnUseTotal = this.pluginFunctionCount - this.pluginFunctionInUseTotal
          }
        })
    },
    getPagePlugin() {
      getProjectPluginByPage(this.searchParams)
        .then(res => {
          this.total = res.total
          _.forEach(res.data, item => {
            item.selected = false
          })
          res.data[0].selected = true
          this.pluginRecordList = res.data
          if (this.pluginRecordList.length > 0) {
            this.searchParams.classid = this.pluginRecordList[0].classId
            this.searchPluginFunctionParams.classid = this.pluginRecordList[0].classId
            this.searchPluginFunctionUnUseParams.classid = this.pluginRecordList[0].classId

            this.getPluginInfo()
            this.getProjectPluginFunctionCount()
            getProjectPluginFunction(this.searchPluginFunctionParams)
              .then(res2 => {
                this.inUsefunctionList = res2.data
                this.pluginFunctionInUseTotal = res2.total
                this.pluginFunctionUnUseTotal = this.pluginFunctionCount - this.pluginFunctionInUseTotal
              })
          }
        })
    },
    getMore() {
      this.searchParams.page++
      getProjectPluginByPage(this.searchParams)
        .then(res => {
          _.forEach(res.data, item => {
            item.selected = false
            this.pluginRecordList.push(item)
          })
          this.total = res.total
        })
    },

    getMorePluginFunction(type) {
      this.searchPluginFunctionParams.type = 'inUse'
      this.searchPluginFunctionParams.page++
      getProjectPluginFunction(this.searchPluginFunctionParams)
        .then(res => {
          _.forEach(res.data, item => {
            this.inUsefunctionList.push(item)
          })
          this.pluginFunctionInUseTotal = res.total
        })
    },

    getMorePluginFunctionUnUse() {
      this.searchPluginFunctionUnUseParams.type = 'unUse'
      this.searchPluginFunctionUnUseParams.page++
      this.searchPluginFunctionUnUseParams.size = this.pluginFunctionCount - this.pluginFunctionInUseTotal
      getProjectPluginFunction(this.searchPluginFunctionUnUseParams)
        .then(res => {
          _.forEach(res.data, item => {
            this.unUsefunctionList.push(item)
          })
          this.pluginFunctionUnUseTotal = res.total
        })
    },
    getPageApiList() {
      getProjectPageFunction(this.searchParams)
        .then(res => {
          this.pageApiRecordList = res
          if (res != null) {
            // this.total = res.total
          }
        })
    },
    getPluginInfo() {
      getPluginById(this.searchParams)
        .then(res => {
          this.plugin = res
        })
    },
    showPluginFunctionUnUse() {
      this.searchParams.type = 'unUse'
      getProjectPluginFunction(this.searchParams)
        .then(res => {
          this.unUsefunctionList = res
        })
      // this.searchParams.type = 'inUse'
    },
    getProjectPluginFunctionCount() {
      getProjectPluginFunctionCount(this.searchPluginFunctionParams)
        .then(res => {
          this.pluginFunctionCount = res.count
        })
    }

  }
}
</script>

<style lang='scss'>
.tooltipContent{
    width: 300px;
  }

.pageDetail{
  height: 100%;
  padding: 20px 30px;
  .pageTitle-url{
    background: #ecf1f8;
    padding: 15px;
  }
  .plugin-detail{
    padding: 15px 0;
  }
  .panel{
    margin-bottom: 20px;
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
      margin: 0 -30px;
      padding: 0 30px;
      border-bottom: 1px solid #E5E7EE;
      padding-bottom: 20px;
    }
    .plugin-list{
      background: #ecf1f8;
      margin: 0 -30px;
      padding: 10px 30px;
      padding-bottom: 0;
      .el-tag{
        cursor: pointer;
        margin-right: 10px;
        margin-bottom: 10px;
        &.el-tag--dark{
          box-shadow: 0px 2px 5px 0px rgba(54, 128, 249, 0.43);
        }
      }
    }
    .panel-content{
      label{
        font-weight: bold;
        color: #666666;
        font-size: 14px;
      }
      span{
        font-size: 14px;
        flex:1;
        display: inline-block;
      }

    }
  }
  .margin-bottom15{
    margin-bottom: 15px;
  }
  .elColClass{
    display: flex;
  }
  .plugin-row{
    background: #FFFFFF;
    border: 1px solid #E9E9E9;
    border-radius: 2px;
    margin-bottom: 10px;
    background-color: #DCDFE6;
  }
  .functionList{
    .el-tag{
      margin-right: 8px;
      margin-bottom: 5px;
    }
  }
  .page-api-recordList{
    .page-api-recordList-inUse{
      margin-top: 10px;
      margin-bottom: 10px;
      .el-tag{
        margin-right: 8px;
        margin-bottom: 5px;
      }
    }
    .page-api-recordList-unUse{
      .el-tag{
        margin-right: 8px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
