<template>
  <div class="dataDetail">
    <div class="panel">
      <div class="panel-header">
        已安装插件
      </div>
      <el-row>
        <el-col v-for="item in pluginRecordList" :key="item.spId" :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              <p>{{ item.name }}</p>
              <p>{{ item.pluginFunctionCount }}次</p>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <div class="panel-content">
        <el-row class="plugin-row">
          <el-row class="margin-bottom15" style="height: 40px; background: #ecf1f8; line-height: 40px;margin-bottom: 0;padding: 0 15px;border-bottom: 1px solid #DCDFE6;">
            <el-col :span="24" class="text-overflow">
              <label>{{ searchParams.pageTitle }}</label>
              <label>{{ searchParams.url }}</label>
            </el-col>
          </el-row>
          <el-row style="background-color: #FAFAFA; padding: 15px;">
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

          </el-row></el-row></div>
      <div v-if="functionList!=null" class="panel-header">
        <el-collapse accordion class="panel">
          <el-collapse-item>
            <template slot="title">
              API调用个数（{{ functionList.inUse.length }}）
            </template>

            <div class="panel-content">
              <el-row class="margin-bottom15">
                <el-col :span="12" class="text-overflow">
                  <label>API名称</label>
                </el-col>
                <el-col :span="12" class="text-overflow">
                  <label>访问次数</label>
                </el-col>
              </el-row>
              <el-row v-for="(item,index) in functionList.inUse" :key="index" class="margin-bottom15">
                <el-col :span="12" class="text-overflow">
                  <span>{{ item.function_name }}</span>
                </el-col>
                <el-col :span="12" class="text-overflow">
                  <span>{{ item.count }}</span>
                </el-col>
              </el-row>

            </div>
          </el-collapse-item>

          <el-collapse-item>
            <template slot="title">
              API未调用个数({{ functionList.onUse.length }})
            </template>
            <div class="panel-content">
              <el-row class="margin-bottom15">
                <el-col :span="12" class="text-overflow">
                  <label>API名称</label>
                </el-col>
                <el-col :span="12" class="text-overflow">
                  <label>访问次数</label>
                </el-col>
              </el-row>
              <el-row v-for="(item,index) in functionList.onUse" :key="index" class="margin-bottom15">
                <el-col :span="12" class="text-overflow">
                  <span>{{ item.function_name }}</span>
                </el-col>
                <el-col :span="12" class="text-overflow">
                  <span>{{ item.count }}</span>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>

        </el-collapse>
      </div>
      <!-- 与插件相关的页面列表-->
      <el-card class="box-card">
        <div v-for="(item,index) in pageRecordList" :key="index" class="text item">
          <span>{{ item.page_title }}</span>
          <a>{{ item.url }}</a>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getProjectPluginByPage, getProjectPluginList } from '@/api/project'
import { getProjectPluginFunction } from '@/api/project'
import { getProjectPageFunction } from '@/api/project'
import { getPluginFuntionBySite } from '@/api/project'
import { getUsePluginPageBySite } from '@/api/project'
import _ from 'lodash'
export default {
  name: 'PluginManage',
  data() {
    return {
      total: 0,
      plugin: {},
      pluginRecordList: [],
      pageRecordList: [],
      functionList: null,
      searchParams: {
        page: 1,
        size: 5,
        siteId: null,
        classid: ''
      }
    }
  },
  created() {
    this.searchParams.siteId = this.$route.query.siteId
    this.getProjectPluginList()
    // this.getFunction()
    // this.getPageApiList()
  },
  methods: {
    getProjectPluginList() {
      getProjectPluginList(this.searchParams)
        .then(res => {
          console.log(res)
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
                this.pageRecordList = res
              })
          }
        })
    }

  }
}
</script>

<style lang='scss'>
.tooltipContent{
    width: 300px;
  }

.dataDetail{
  height: 100%;
  padding: 20px 30px;
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
      margin-bottom: 20px;
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

}
</style>
