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

      <div v-if="pluginRecordList.legth>0" class="panel-content">
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
            <el-col :span="24" @click="getMoreOuterHTML(false)">
              <label>调用代码：</label>
              <span v-show="!moreOuterHTML">{{ plugin.outerHTML.substring(0, 20) }}... <el-button type="text" size="medium" @click="getMoreOuterHTML(true)">展开<i class="el-icon-arrow-down el-icon--right" /></el-button></span>
              <span v-show="moreOuterHTML">{{ plugin.outerHTML }}<el-button type="text" size="medium" @click="getMoreOuterHTML(false)">收起<i class="el-icon-arrow-up el-icon--right" /></el-button></span>
            </el-col>
          </el-row>
        </el-row>
      </div>
      <div class="inUsefunctionList">
        <el-row>
          <label>调用API（{{ pluginFunctionInUseTotal }}）: </label>
          <el-tag
            v-for="(item,index) in inUsefunctionList"
            :key="index"
            type="info"
            effect="dark"
            size="medium"
          >
            {{ item.function_name }} (调用{{ item.count }}次)
          </el-tag>
          <el-button v-show="!morePluginFunction && inUsefunctionList.length < pluginFunctionInUseTotal" type="text" size="medium" @click="getMorePluginFunction(true)">展开<i class="el-icon-arrow-down el-icon--right" /></el-button>
          <el-button v-show="morePluginFunction" type="text" size="medium" @click="getMorePluginFunction(false)">收起<i class="el-icon-arrow-up el-icon--right" /></el-button>
        </el-row>
        <el-row>
          <label>未调用API（{{ pluginFunctionCount - pluginFunctionInUseTotal }}）:</label>
          <el-tag
            v-for="(item,index) in unUsefunctionList"
            :key="index"
            type="info"
            effect="dark"
            size="medium"
          >
            {{ item.function_name }} (调用{{ item.count }}次)
          </el-tag>
          <el-button v-show="!morePluginFunctionUnUse && pluginFunctionCount - pluginFunctionInUseTotal > 0" type="text" size="medium" @click="getMorePluginFunctionUnUse(true)">展开<i class="el-icon-arrow-down el-icon--right" /></el-button>
          <el-button v-show="morePluginFunctionUnUse" type="text" size="medium" @click="getMorePluginFunctionUnUse(false)">收起<i class="el-icon-arrow-up el-icon--right" /></el-button>
        </el-row>
      </div>
    </div>
    <div class="page-api-recordList panel">
      <div class="panel-header">
        浏览器特有API({{ pageApiTotal }})
      </div>
      <div class="inUsefunctionList">
        <el-row>
          <label>调用API（{{ pageApiInUseTotal }}）: </label>
          <el-tag
            v-for="(item,index) in pageApiInUseList"
            :key="index"
            type="info"
            effect="dark"
            size="medium"
          >
            {{ item.function_name }} (调用{{ item.count }}次)
          </el-tag>
          <el-button v-if="pageApiInUseList.legth <pageApiInUseTotal" v-show="!morePageFunction" type="text" size="medium" @click="getMorePageFunction(true)">展开<i class="el-icon-arrow-down el-icon--right" /></el-button>
          <el-button v-show="morePageFunction" type="text" size="medium" @click="getMorePageFunction(false)">收起<i class="el-icon-arrow-up el-icon--right" /></el-button>
        </el-row>
        <el-row>
          <label>未调用API（{{ pageApiTotal - pageApiInUseTotal }}）:</label>
          <el-tag
            v-for="(item,index) in pageApiUnUseList"
            :key="index"
            type="info"
            effect="dark"
            size="medium"
          >
            {{ item.function_name }} (调用{{ item.count }}次)
          </el-tag>
          <el-button v-if="pageApiTotal - pageApiInUseTotal >0" v-show="!morePageFunctionUnUse" type="text" size="medium" @click="getMorePageFunctionUnUse(true)">展开<i class="el-icon-arrow-down el-icon--right" /></el-button>
          <el-button v-show="morePageFunctionUnUse" type="text" size="medium" @click="getMorePageFunctionUnUse(false)">收起<i class="el-icon-arrow-up el-icon--right" /></el-button>
        </el-row>
      </div>
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
      moreOuterHTML: false,
      morePluginFunction: false,
      morePluginFunctionUnUse: false,

      morePageFunction: false,
      morePageFunctionUnUse: false,

      total: 0,
      pluginFunctionInUseTotal: 0, // 插件调用api总数
      pluginFunctionunUseTotal: 0, // 插件未调用api总数
      pluginFunctionCount: 0,
      pageApiInUseTotal: 0, // 页面api调用总数
      pageApiTotal: 0, // 页面api总数

      plugin: {
        outerHTML: ''
      }, // 插件详情
      pageInfo: {}, // 页面详情
      pluginRecordList: [],
      pageApiRecordList: { 'inUse': [], 'unUse': [] },
      inUsefunctionList: [],
      unUsefunctionList: [],
      pageApiInUseList: [], // 页面特有api 调用列表
      pageApiUnUseList: [], // 页面特有api 未调用列表
      searchParams: {
        page: 1,
        size: 5,
        siteId: null,
        pathName: null,
        classid: '',
        type: 'all'
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
        page: 1,
        size: 5,
        siteId: null,
        pathName: null,
        classid: '',
        type: 'unUse'
      },
      searchPageFunctionInUseParams: { // 查询页面api未调用参数
        page: 1,
        size: 2,
        siteId: null,
        pathName: null,
        type: 'inUse'
      },
      searchPageFunctionUnUseParams: { // 查询页面api调用参数
        page: 0,
        size: 5,
        siteId: null,
        pathName: null,
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

    this.searchPageFunctionInUseParams.siteId = this.$route.query.siteId
    this.searchPageFunctionInUseParams.pathName = this.$route.query.pathName

    this.searchPageFunctionUnUseParams.siteId = this.$route.query.siteId
    this.searchPageFunctionUnUseParams.pathName = this.$route.query.pathName

    this.getPageBySiteId()
    this.getPagePlugin()
    this.getPageApiTotal()
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

      this.moreOuterHTML = false
      this.morePluginFunction = false
      this.morePluginFunctionUnUse = false

      this.morePageFunction = false
      this.morePageFunctionUnUse = false
      this.searchPluginFunctionParams.size = 5
      // this.searchPluginFunctionUnUseParams.page = 1
      this.getPluginInfo() // 获取插件详细信息
      this.getProjectPluginFunctionCount() // 获取插件所有api个数
      getProjectPluginFunction(this.searchPluginFunctionParams) // 查询插件使用api记录
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

    getMorePluginFunction(flag) {
      this.searchPluginFunctionParams.type = 'inUse'
      if (flag) {
        this.searchPluginFunctionParams.size = 999
      } else {
        this.searchPluginFunctionParams.size = 5
      }
      this.morePluginFunction = flag
      getProjectPluginFunction(this.searchPluginFunctionParams)
        .then(res => {
          this.inUsefunctionList = res.data
        })
    },

    getMorePluginFunctionUnUse(flag) {
      this.searchPluginFunctionUnUseParams.type = 'unUse'
      if (flag) {
        this.searchPluginFunctionUnUseParams.size = 999
        getProjectPluginFunction(this.searchPluginFunctionUnUseParams)
          .then(res => {
            this.unUsefunctionList = res.data
          })
      } else {
        this.unUsefunctionList = []
      }
      this.morePluginFunctionUnUse = flag

      // this.searchPluginFunctionUnUseParams.page++
      // this.searchPluginFunctionUnUseParams.size = this.pluginFunctionCount - this.pluginFunctionInUseTotal
    },
    getPageApiList() {
      getProjectPageFunction(this.searchParams)
        .then(res => {
          this.pageApiInUseList = res.data
          this.pageApiInUseTotal = res.total
        })
    },

    getPageApiTotal() {
      this.searchPageFunctionInUseParams.type = 'all'
      getProjectPageFunction(this.searchPageFunctionInUseParams)
        .then(res => {
          this.pageApiTotal = res.total
        })
    },

    getMorePageFunction(flag) {
      if (flag) {
        this.searchPageFunctionInUseParams.size = 999
      } else {
        this.searchPageFunctionInUseParams.size = 5
      }
      this.morePageFunction = flag
      this.searchPageFunctionInUseParams.type = 'inUse'
      getProjectPageFunction(this.searchParams)
        .then(res => {
          this.pageApiInUseList = res.data
          this.pageApiInUseTotal = res.total
        })
    },

    getMorePageFunctionUnUse(flag) {
      this.searchPageFunctionUnUseParams.type = 'unUse'
      if (flag) {
        this.searchPageFunctionUnUseParams.size = 999
        getProjectPageFunction(this.searchPageFunctionUnUseParams)
          .then(res => {
            this.pageApiUnUseList = res.data
          })
      } else {
        this.pageApiUnUseList = []
      }
      this.morePageFunctionUnUse = flag

      // this.searchPluginFunctionUnUseParams.page++
      // this.searchPluginFunctionUnUseParams.size = this.pluginFunctionCount - this.pluginFunctionInUseTotal
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
      getProjectPluginFunctionCount(this.searchParams)
        .then(res => {
          this.pluginFunctionCount = res.count
        })
    },
    getMoreOuterHTML(flag) {
      this.moreOuterHTML = flag
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
    margin-bottom: 20px;
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
  .el-tag--dark.el-tag--info{
    background-color: #ebf2fe;
    border-color: #ebf2fe;
    color: #333333;
    margin-right: 8px;
  }

  .inUsefunctionList{
    label{
      font-weight: bold;
      color: #666666;
      font-size: 14px;
    }
     .el-row{
       margin-top: 20px;
    }
  }
  .page-api-recordList-inUse{
    label{
      font-weight: bold;
      color: #666666;
      font-size: 14px;
    }
  }
  .page-api-recordList-unUse{
    label{
      font-weight: bold;
      color: #666666;
      font-size: 14px;
    }
  }
}
</style>
