<template>
  <div class="panel">
    <div class="panel-header">
      系统已安装插件
    </div>
    <div class="panel-content">
      <el-row class="plugin-row">
        <el-row class="margin-bottom15" style="height: 40px; background: #ecf1f8; line-height: 40px;margin-bottom: 0;padding: 0 15px;border-bottom: 1px solid #DCDFE6;">
          <el-col :span="24" class="text-overflow">
            <label>{{ plugin.name }}</label>
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

          <el-row style="background-color: #FeFeFe; padding: 0 15px;border-bottom: 1px solid #DCDFE6;border-top: 1px solid #DCDFE6;height: 40px;line-height: 40px;">
            <el-col :span="24" class="text-overflow">
              <label style="font-weight: bold;color: #666666;">API总数({{ functionList.inUse.length + functionList.unUse.length }})</label>
            </el-col>
          </el-row>
          <div class="panel-header">
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
                  API未调用个数({{ functionList.unUse.length }})
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
                  <el-row v-for="(item,index) in functionList.unUse" :key="index" class="margin-bottom15">
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
          </div></el-row>

        <div class="panel-header">
          使用该插件应用排行（{{ total }}）
        </div>

        <div class="table-div">
          <el-table
            border
            :data="siteRecordList"
            highlight-current-row
            style="width: 100%;height: 100%"
          >

            <el-table-column
              prop="site_id"
              label="编号"
            />
            <el-table-column
              prop="logo"
              align="center"
              label="logo"
            />

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

        </div>

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

      </el-row></div>
    <div class="panel-header">
      插件使用终端（{{ deviceTotal }}）
    </div>
    <el-row>
      <el-col v-for="item in deviceRecordList" :key="item.device_id" :span="8">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <p>终端用户名：{{ item.device_user_name }}</p>
            <p>终端系统：{{ item.sys_name }} {{ item.version }} {{ item.os_platform }}</p>
            <p>唯一识别：{{ item.device_serial }}</p>
            <p>终端IP:{{ item.ip_address }}</p>
            <p>系统服务商：{{ item.os_service_pack }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import pluginService from '@/api/plugin'
import _ from 'lodash'
export default {
  name: 'PluginManage',
  data() {
    return {
      deviceTotal: 0,
      total: 0,
      plugin: null,
      siteRecordList: [],
      deviceRecordList: [],
      functionList: null,
      searchParams: {
        page: 1,
        size: 10,
        classid: null,
        version: null
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
  methods: {
    getPluginInfo() {
      pluginService.getPluginDetail({ classid: this.searchParams.classid, version: this.searchParams.version })
        .then(res => {
          this.plugin = res
        })
    },
    getFunction() {
      pluginService.getFunctionByPluginId({ classid: this.searchParams.classid })
        .then(res => {
          this.functionList = res
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
