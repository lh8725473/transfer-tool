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
      <div class="functionList">
        <el-row>
          <label>调用API（{{ functionList.inUse.length }}）:</label>
          <el-tag
            v-for="(item,index) in functionList.inUse"
            :key="index"
            type="''"
            effect="plain"
            size="medium"
          >
            {{ item.function_name }} (调用{{ item.count }}次)
          </el-tag>
        </el-row>
        <el-row>
          <label>未调用API（{{ functionList.unUse.length }}）:</label>
          <el-tag
            v-for="(item,index) in functionList.unUse"
            :key="index"
            type="''"
            effect="plain"
            size="medium"
          >
            {{ item.function_name }} (调用{{ item.count }}次)
          </el-tag>
          <!-- <span v-for="(item,index) in functionList.unUse" :key="index">
            {{ item.function_name }} (调用{{ item.count }}次)
          </span> -->
        </el-row>
      </div>
    </div>

    <div v-for="(item,index) in sitePage" :key="index">
      <span>{{ item.page_title }}</span>
      <span>{{ item.url }}</span>

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
      plugin: {},
      pluginRecordList: [],
      functionList: { 'inUse': [], 'unUse': [] },
      sitePage: [],
      searchParams: {
        page: 1,
        size: 5,
        siteId: null,
        classid: ''
      }
    }
  },
  created() {
    this.domain = this.$route.query.domain
    this.searchParams.siteId = this.$route.query.siteId
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
      getPluginFuntionBySite(this.searchParams)
        .then(res2 => {
          this.functionList = res2
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
            getPluginFuntionBySite(this.searchParams)
              .then(res2 => {
                this.functionList = res2
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
