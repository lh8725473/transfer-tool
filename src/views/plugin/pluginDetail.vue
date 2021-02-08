<template>
  <div class="pageDetail">
    <div ref="codeHTML" class="pageTitle-url">
      <label>{{ plugin.name }}</label>
    </div>
    <div class="panel">
      <div class="panel-header">
        插件信息
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

        </el-row>
      </div>
      <div class="inUsefunctionList">
        <el-row>
          <label>调用API（{{ pluginFunctionInUseTotal }}）: </label>
          <el-tag
            v-for="(item,inUseFunctionIndex) in inUseFunctionList"
            :key="inUseFunctionIndex"
            type="info"
            effect="dark"
            size="medium"
          >
            {{ item.function_name }}(调用{{ item.count }}次)
          </el-tag>
          <el-button v-show="!morePluginFunction && inUseFunctionList.length<pluginFunctionTotal" type="text" size="medium" @click="getMorePluginFunction(true)">展开<i class="el-icon-arrow-down el-icon--right" /></el-button>
          <el-button v-show="morePluginFunction" type="text" size="medium" @click="getMorePluginFunction(false)">收起<i class="el-icon-arrow-up el-icon--right" /></el-button>
        </el-row>
        <el-row>
          <label>未调用API（{{ pluginFunctionTotal - pluginFunctionInUseTotal }}）:</label>
          <el-tag
            v-for="(item,index) in unUseFunctionList"
            :key="index"
            type="info"
            effect="dark"
            size="medium"
          >
            {{ item.function_name }} (调用{{ item.count }}次)
          </el-tag>
          <el-button v-show="!morePluginFunctionUnUse && pluginFunctionTotal - pluginFunctionInUseTotal >0 " type="text" size="medium" @click="getMorePluginFunctionUnUse(true)">展开<i class="el-icon-arrow-down el-icon--right" /></el-button>
          <el-button v-show="morePluginFunctionUnUse" type="text" size="medium" @click="getMorePluginFunctionUnUse(false)">收起<i class="el-icon-arrow-up el-icon--right" /></el-button>
        </el-row>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        使用该插件应用排行（{{ total }}）
      </div>

      <el-table
        border
        :data="siteRecordList"
        highlight-current-row
        style="width: 100%;height: 100%;margin-top: 20px;"
      >

        <el-table-column
          prop="site_id"
          label="编号"
        />
        <el-table-column
          prop="logo"
          align="center"
          label="logo"
        >
          <template slot-scope="scope">

            <el-image
              style="width: 31px; height: 34px"
              :src="scope.row.logo"
              fit="fill"
            />
          </template>
        </el-table-column>

        <el-table-column
          prop="host"
          align="center"
          label="应用地址"
        />
        <el-table-column
          prop="pageNum"
          align="center"
          label="页面总数"
        />
        <el-table-column
          prop="usePluginPageNum"
          align="center"
          label="使用该插件页面数"
        />

      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :current-page.sync="searchParams.page"
          :page-size.sync="searchParams.size"
          layout="total,sizes, prev, pager, next,jumper"
          :total="total"
          :page-sizes="[10, 20, 50]"
          @current-change="pageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        插件使用终端（{{ deviceTotal }}）
      </div>
      <el-row>
        <div class="device-record-list">
          <div v-for="(item,index) in deviceRecordList" :key="index" class="device-record-item">
            <div class="device-record-item-image">
              <div class="icon-box icon-box1">
                <svg-icon icon-class="wangzhan" />
              </div>
            </div>
            <div class="device-record-item-detail">
              <div class="item-row">
                <span class="label">终端用户名：</span>
                <span class="text">{{ item.device_user_name }}</span>
              </div>
              <div class="item-row">
                <span class="label">终端系统：</span>
                <el-tooltip placement="top">
                  <div slot="content" class="tooltipContent">{{ item.sys_name }} {{ item.version }} {{ item.os_platform }}</div>
                  <span class="text">{{ item.sys_name }} {{ item.version }} {{ item.os_platform }}</span>
                </el-tooltip>

              </div>
              <div class="item-row">
                <span class="label">唯一识别：</span>
                <el-tooltip placement="top">
                  <div slot="content" class="tooltipContent">{{ item.device_serial }}</div>
                  <span class="text">{{ item.device_serial }}</span>
                </el-tooltip>

              </div>
              <div class="item-row">
                <span class="label">终端IP：</span>
                <span class="text">{{ item.ip_address }}</span>
              </div>
              <div class="item-row">
                <span class="label">系统服务商：</span>
                <span class="text">{{ item.os_service_pack }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-row>

    </div>
  </div>
</template>

<script>
import pluginService from '@/api/plugin'
import _ from 'lodash'
import { mount } from '@vue/test-utils'
export default {
  name: 'PluginManage',
  data() {
    return {
      deviceTotal: 0,
      total: 0,
      plugin: {},
      siteRecordList: [],
      deviceRecordList: [],

      morePluginFunction: false,
      morePluginFunctionUnUse: false,
      pluginFunctionTotal: 0,
      pluginFunctionInUseTotal: 0, // 插件调用api总数
      pluginFunctionunUseTotal: 0, // 插件未调用api总数
      inUseFunctionList: [],
      unUseFunctionList: [],

      searchParams: {
        page: 1,
        size: 5,
        classid: null,
        version: null,
        type: ''
      }
    }
  },
  created() {
    this.searchParams.classid = this.$route.query.classid
    this.searchParams.version = this.$route.query.version
    this.getPluginInfo()
    this.getFunction()
    this.getSiteList()
    this.getDeviceList()
  },
  mounted() {
    const el = this.$refs.codeHTML
  },
  methods: {

    reloadCode() {
      const el = this.$refs.codeHTML
      hljs.highlightBlock(el)

      // 行号显示
      hljs.initLineNumbersOnLoad({ singleLine: true })
    },

    getPluginInfo() {
      pluginService.getPluginDetail({ classid: this.searchParams.classid, version: this.searchParams.version })
        .then(res => {
          this.plugin = res
        })
    },

    getFunction() {
      this.searchParams.type = 'all'
      pluginService.getFunctionByPluginId(this.searchParams)
        .then(res => {
          this.pluginFunctionTotal = res.total
          console.log(this.pluginFunctionTotal)
          this.searchParams.type = 'inUse'
          pluginService.getFunctionByPluginId(this.searchParams)
            .then(res => {
              this.inUseFunctionList = res.data
              this.pluginFunctionInUseTotal = res.total
            })
        })
    },
    getSiteList() {
      pluginService.getSiteByPluginId(this.searchParams)
        .then(res => {
          this.siteRecordList = res.data
          this.total = res.total
        })
    },
    getDeviceList() {
      pluginService.getDeviceByPluginId(this.searchParams)
        .then(res => {
          this.deviceRecordList = res.data
          this.deviceTotal = res.total
        })
    },
    pageChange(page) {
      this.searchParams.page = page
      this.getPluginRecordList()
    },
    handleSizeChange() {
      this.searchParams.page = 1
      // this.searchParams.size = size
      this.getSiteList()
    },
    getMorePluginFunction(flag) {
      this.searchParams.type = 'inUse'
      if (flag) {
        this.searchParams.size = 999
      } else {
        this.searchParams.size = 5
      }
      this.morePluginFunction = flag
      pluginService.getFunctionByPluginId(this.searchParams)
        .then(res => {
          this.inUseFunctionList = res.data
        })
    },

    getMorePluginFunctionUnUse(flag) {
      this.searchParams.type = 'unUse'
      if (flag) {
        this.searchParams.size = 999
        pluginService.getFunctionByPluginId(this.searchParams)
          .then(res => {
            this.unUseFunctionList = res.data
          })
      } else {
        this.unUseFunctionList = []
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
    width: 200px;
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
  .device-record-list{
    margin-top: 20px;
    &::after{
      clear: both;
    }
    .device-record-item{
      float: left;
      display: flex;
      width: 375px;
      height: 200px;
      background: #FFFFFF;
      border: 1px solid #EAEBF1;
      border-radius: 5px;
      padding: 20px;
      margin-bottom: 20px;
      margin-right: 15px;
      .device-record-item-detail{
        width: 230px;
      }
      .item-row{
        border-bottom: 1px solid #EAEBF1;
        padding-top: 6px;
        padding-bottom: 6px;
        display: flex;
        width: 100%;
        &:first-child{
          padding-top: 0;
        }
        &:last-child{
          border-bottom: none;
          padding-bottom: 0;
        }
        .label{
          color: #666666;
          width: 100px;
          text-align: right;
        }
        .text{
          color: #333333;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .device-record-item-image{
        display: flex;
        align-items: center;
        margin-right: 10px;
        .icon-box{
          width: 100px;
          height: 100px;
          background: #305BA4;
          border-radius: 50%;
          text-align: center;
          line-height: 120px;
          .svg-icon{
            font-size: 50px;
            color: #ffffff;
          }
        }
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
