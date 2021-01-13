<template>
  <div class="pageDetail">
    <div class="pageTitle-url">
      <label>{{ domain }}</label>
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

      <div v-if="pluginRecordList.length>0" class="panel-content">
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
          <el-button v-show="!morePluginFunction&& inUsefunctionList.length<pluginFunctionTotal" type="text" size="medium" @click="getMorePluginFunction(true)">展开<i class="el-icon-arrow-down el-icon--right" /></el-button>
          <el-button v-show="morePluginFunction" type="text" size="medium" @click="getMorePluginFunction(false)">收起<i class="el-icon-arrow-up el-icon--right" /></el-button>
        </el-row>
        <el-row>
          <label>未调用API（{{ pluginFunctionTotal - pluginFunctionInUseTotal }}）:</label>
          <el-tag
            v-for="(item,index) in unUsefunctionList"
            :key="index"
            type="info"
            effect="dark"
            size="medium"
          >
            {{ item.function_name }} (调用{{ item.count }}次)
          </el-tag>
          <el-button v-show="!morePluginFunctionUnUse && pluginFunctionTotal - pluginFunctionInUseTotal>0" type="text" size="medium" @click="getMorePluginFunctionUnUse(true)">展开<i class="el-icon-arrow-down el-icon--right" /></el-button>
          <el-button v-show="morePluginFunctionUnUse" type="text" size="medium" @click="getMorePluginFunctionUnUse(false)">收起<i class="el-icon-arrow-up el-icon--right" /></el-button>
        </el-row>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        插件安装页面({{ sitePage.length }})
      </div>
      <div class="site-page-list">
        <div v-for="(item,index) in sitePage" :key="index" class="site-page-item">
          <label>{{ item.page_title }}</label>
          <el-link class="text-overflow" type="primary" :href="item.url" target="_blank">{{ item.url }}</el-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getProjectPluginList, getPluginFuntionBySite, getUsePluginPageBySite } from '@/api/project'
import _ from 'lodash'
export default {
  name: 'PluginManage',
  data() {
    return {
      domain: '',
      total: 0,
      morePluginFunction: false,
      morePluginFunctionUnUse: false,
      pluginFunctionTotal: 0,
      pluginFunctionInUseTotal: 0, // 插件调用api总数
      pluginFunctionunUseTotal: 0, // 插件未调用api总数
      inUsefunctionList: [],
      unUsefunctionList: [],
      plugin: {},
      pluginRecordList: [],

      sitePage: [],
      searchPluginFunctionParams: { // 查询插件api调用未调用参数
        page: 1,
        size: 5,
        classid: '',
        siteId: '',
        type: 'inUse'
      },
      searchPluginFunctionUnUseParams: { // 插件查询api调用未调用参数
        page: 1,
        size: 5,
        classid: '',
        siteId: '',
        type: 'unUse'
      },
      searchParams: {
        page: 1,
        size: 5,
        siteId: null,
        classid: '',
        type: 'all'
      }
    }
  },
  created() {
    this.domain = this.$route.query.domain
    this.searchParams.siteId = this.$route.query.siteId
    this.searchPluginFunctionUnUseParams.siteId = this.$route.query.siteId
    this.searchPluginFunctionParams.siteId = this.$route.query.siteId
    this.getProjectPluginList()
  },
  methods: {
    changePlugin(row) {
      _.forEach(this.pluginRecordList, item => {
        item.selected = false
      })
      row.selected = true
      this.plugin = row
      this.searchParams.classid = this.plugin.classId
      this.searchPluginFunctionUnUseParams.classid = this.plugin.classId
      this.searchPluginFunctionParams.classid = this.plugin.classId
      this.morePluginFunction = false
      this.morePluginFunctionUnUse = false

      this.getProjectPluginCount()
      this.searchPluginFunctionParams.size = 5
      getPluginFuntionBySite(this.searchPluginFunctionParams)
        .then(res2 => {
          this.inUsefunctionList = res2.data
          this.pluginFunctionInUseTotal = res2.total
          this.unUsefunctionList = []
        })
      getUsePluginPageBySite(this.searchParams)
        .then(res => {
          this.sitePage = res
        })
    },

    getProjectPluginCount() {
      getPluginFuntionBySite(this.searchParams)
        .then(res2 => {
          this.pluginFunctionTotal = res2.total
          console.log('=====' + this.pluginFunctionTotal)
        })
    },
    getProjectPluginList() {
      getProjectPluginList(this.searchParams)
        .then(res => {
          this.total = res.total
          _.forEach(res.data, item => {
            item.selected = false
          })
          res.data[0].selected = true
          this.pluginRecordList = res.data
          if (this.pluginRecordList.length > 0) {
            this.plugin = this.pluginRecordList[0]
            this.searchParams.classid = this.plugin.classId
            this.searchPluginFunctionParams.classid = this.plugin.classId
            this.searchPluginFunctionUnUseParams.classid = this.plugin.classId
            this.getProjectPluginCount()
            this.searchPluginFunctionParams.type = 'inUse'

            getPluginFuntionBySite(this.searchPluginFunctionParams)
              .then(res2 => {
                this.inUsefunctionList = res2.data
                this.pluginFunctionInUseTotal = res2.total
              })
            getUsePluginPageBySite(this.searchParams)
              .then(res => {
                this.sitePage = res
              })
          }
        })
    },
    getMore() {
      this.searchParams.page++
      getProjectPluginList(this.searchParams)
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
      getPluginFuntionBySite(this.searchPluginFunctionParams)
        .then(res => {
          this.inUsefunctionList = res.data
        })
    },

    getMorePluginFunctionUnUse(flag) {
      this.searchPluginFunctionUnUseParams.type = 'unUse'
      if (flag) {
        this.searchPluginFunctionUnUseParams.size = 999
        getPluginFuntionBySite(this.searchPluginFunctionUnUseParams)
          .then(res => {
            this.unUsefunctionList = res.data
          })
      } else {
        this.unUsefunctionList = []
      }
      this.morePluginFunctionUnUse = flag

      // this.searchPluginFunctionUnUseParams.page++
      // this.searchPluginFunctionUnUseParams.size = this.pluginFunctionCount - this.pluginFunctionInUseTotal
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
  .site-page-list{
    margin: 0 -30px;
    padding: 10px 30px;
    max-height: 500px;
    overflow-y: auto;
    .site-page-item{
      border-bottom: 1px solid #EBEEF5;
      margin: 0 -30px;
      padding: 10px 30px;
      &:last-child{
        border-bottom: none;
      }
      a{
        margin-top: 10px;
        display: block;

      }
    }
  }
}
</style>
