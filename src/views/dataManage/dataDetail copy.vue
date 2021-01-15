<template>
  <div class="dataDetail">
    <div class="panel">
      <div class="panel-header">
        设备信息
      </div>
      <div class="panel-content">
        <el-row class="margin-bottom15">
          <el-col :span="8" class="text-overflow">
            <label>计算机名：</label>
            <span>{{ deviceInfo.machine_name }}</span>
          </el-col>
          <el-col :span="8" class="elColClass">
            <label>唯一标识：</label>
            <el-tooltip placement="top">
              <div slot="content" class="tooltipContent">{{ deviceInfo.device_serial }}</div>
              <span class="text-overflow">{{ deviceInfo.device_serial }}</span>
            </el-tooltip>
          </el-col>
          <el-col :span="8" class="text-overflow">
            <label>设备名称：</label>
            <span>{{ deviceInfo.device_user_name }}</span>
          </el-col>
        </el-row>
        <el-row class="margin-bottom15">
          <el-col :span="8" class="text-overflow">
            <label>操作系统名称：</label>
            <span>{{ deviceInfo.sys_name }}</span>
          </el-col>
          <el-col :span="8" class="text-overflow">
            <label>操作系统版本：</label>
            <span>{{ deviceInfo.version }}</span>
          </el-col>
          <el-col :span="8" class="text-overflow">
            <label>操作系统平台：</label>
            <span>{{ deviceInfo.os_platform }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="text-overflow">
            <label>服务商：</label>
            <span>{{ deviceInfo.os_service_pack }}</span>
          </el-col>
          <el-col :span="8" class="text-overflow">
            <label>系统位数：</label>
            <span>{{ deviceInfo.bit }}</span>
          </el-col>
          <el-col :span="8" class="text-overflow">
            <label>IP地址：</label>
            <span>{{ deviceInfo.ip_address }}</span>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        浏览器信息
      </div>

      <div class="panel-content">
        <el-row class="margin-bottom15">
          <el-col :span="8" class="text-overflow">
            <label>浏览器名称：</label>
            <span>{{ browserDetail.browser_name }}</span>
          </el-col>
          <el-col :span="8" class="text-overflow">
            <label>浏览器版本：</label>
            <span>{{ browserDetail.version }}</span>
          </el-col>
          <el-col :span="8" class="text-overflow">
            <label>浏览器语言：</label>
            <span>{{ browserDetail.browser_language }}</span>
          </el-col>
        </el-row>
        <el-row class="margin-bottom15">
          <el-col :span="8" class="text-overflow">
            <label>网络连接速度：</label>
            <span>{{ browserDetail.connection_speed }}</span>
          </el-col>
          <el-col :span="8" class="text-overflow">
            <label>cpu架构：</label>
            <span>{{ browserDetail.cpu_class }}</span>
          </el-col>
          <el-col :span="8" class="text-overflow">
            <label>数据污点：</label>
            <span>{{ browserDetail.tian_enable }}</span>
          </el-col>
        </el-row>
        <el-row class="margin-bottom15">
          <el-col :span="8" class="text-overflow">
            <label>系统语言：</label>
            <span>{{ browserDetail.system_language }}</span>
          </el-col>
          <el-col :span="8" class="elColClass">
            <label>浏览器user agent：</label>
            <el-tooltip placement="top">
              <div slot="content" class="tooltipContent">{{ browserDetail.user_agent }}</div>
              <span class="text-overflow">{{ browserDetail.user_agent }}</span>
            </el-tooltip>
          </el-col>
          <!-- <el-col :span="8" class="text-overflow">
            <label>浏览器模块版本：</label>
            <el-tooltip class="item" effect="dark" :content="browserDetail.app_version" placement="top">
              <span>{{ browserDetail.app_version }}</span>
            </el-tooltip>
          </el-col> -->
          <el-col :span="8" class="elColClass">
            <label>浏览器模块版本：：</label>
            <el-tooltip placement="top">
              <div slot="content" class="tooltipContent">{{ browserDetail.app_version }}</div>
              <span class="text-overflow">{{ browserDetail.app_version }}</span>
            </el-tooltip>
          </el-col>

        </el-row>
        <el-row class="margin-bottom15">
          <el-col :span="8" class="text-overflow">
            <label>浏览器代码名称：</label>
            <span>{{ browserDetail.app_code_name }}</span>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        访问记录
      </div>
      <div class="panel-content">
        <el-row class="margin-bottom15">
          <!-- <el-col :span="8" class="text-overflow">
            <label>URL：</label>
            <el-tooltip class="item" effect="dark" :content="pageDetail.url" placement="top">
              <span>{{ pageDetail.url }}</span>
            </el-tooltip>

          </el-col> -->

          <el-col :span="8" class="elColClass">
            <label>URL：</label>
            <el-tooltip placement="top">
              <div slot="content" class="tooltipContent">{{ pageDetail.url }}</div>
              <span class="text-overflow">{{ pageDetail.url }}</span>
            </el-tooltip>
          </el-col>
          <el-col :span="8" class="text-overflow">
            <label>域名：</label>
            <span>{{ pageDetail.host }}</span>
          </el-col>
          <el-col :span="8" class="text-overflow">
            <label>页面标题：</label>
            <span>{{ pageDetail.page_title }}</span>
          </el-col>
        </el-row>
        <el-row class="margin-bottom15">
          <!-- <el-col :span="8" class="text-overflow">
            <label>页面路径：</label>
            <el-tooltip class="item" effect="dark" :content="pageDetail.path_name" placement="top">
              <span>{{ pageDetail.path_name }}</span>
            </el-tooltip>

          </el-col> -->

          <el-col :span="8" class="elColClass">
            <label>页面路径：</label>
            <el-tooltip placement="top">
              <div slot="content" class="tooltipContent">{{ pageDetail.path_name }}</div>
              <span class="text-overflow">{{ pageDetail.path_name }}</span>
            </el-tooltip>
          </el-col>
          <el-col :span="8" class="text-overflow">
            <label>页面访问时间：</label>
            <span>{{ pageDetail.create_time }}</span>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        系统已安装插件
      </div>
      <div class="panel-content">
        <el-row v-for="plugin in pagePluginDetail" :key="plugin.pluginId" class="plugin-row">
          <el-row class="margin-bottom15" style="height: 40px; background: #ecf1f8; line-height: 40px;margin-bottom: 0;padding: 0 15px;border-bottom: 1px solid #DCDFE6;">
            <el-col :span="24" class="text-overflow">
              <label>{{ plugin.systemPlugin.name }}</label>
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
                <span>{{ plugin.systemPlugin.directory }}</span>
              </el-col>
              <el-col :span="8" class="text-overflow">
                <label>插件文件名：</label>
                <span>{{ plugin.systemPlugin.fileName }}</span>
              </el-col>
            </el-row>
            <el-row class="margin-bottom15">
              <el-col :span="8" class="text-overflow">
                <label>插件大小：</label>
                <span>{{ plugin.systemPlugin.fileSize }}</span>
              </el-col>
              <!-- <el-col :span="8" class="text-overflow">
                <label>插件属性ID：</label>

                <el-tooltip class="item" effect="dark" :content="plugin.systemPlugin.progId" placement="top">
                  <span>{{ plugin.systemPlugin.progId }}</span>
                </el-tooltip>
              </el-col> -->

              <el-col :span="8" class="elColClass">
                <label>浏览插件属性ID：</label>
                <el-tooltip placement="top">
                  <div slot="content" class="tooltipContent">{{ plugin.systemPlugin.progId }}</div>
                  <span class="text-overflow">{{ plugin.systemPlugin.progId }}</span>
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
                <span>{{ plugin.systemPlugin.typeLib }}</span>
              </el-col>
              <el-col :span="8" class="text-overflow">
                <label>插件版本：</label>
                <span>{{ plugin.systemPlugin.version }}</span>
              </el-col>
              <el-col :span="8" class="text-overflow">
                <label>插件类型：</label>
                <span>{{ plugin.systemPlugin.type }}</span>
              </el-col>
            </el-row>
            <el-row class="margin-bottom15">
              <el-col :span="8" class="text-overflow">
                <label>是否启用：</label>
                <span>{{ plugin.systemPlugin.enabled }}</span>
              </el-col>
              <el-col :span="8" class="text-overflow">
                <label>插件阻止次数：</label>
                <span>{{ plugin.systemPlugin.blockCount }}</span>
              </el-col>
              <el-col :span="8" class="text-overflow">
                <label>作者：</label>
                <span>{{ plugin.companyName }}</span>
              </el-col>
            </el-row>

            <el-row class="margin-bottom15">
              <el-col :span="8" class="text-overflow">
                <label>宽度：</label>
                <span>{{ plugin.width }}</span>
              </el-col>
              <el-col :span="8" class="text-overflow">
                <label>高度：</label>
                <span>{{ plugin.height }}</span>
              </el-col>
            </el-row>

            <!-- <el-row class="margin-bottom15">
              <el-col :span="24" class="text-overflow">
                <label>HTML：</label>
                <el-tooltip class="item" effect="dark" :content="plugin.outerHTML" placement="top">
                  <code>{{ plugin.outerHTML }}</code>
                </el-tooltip>

              </el-col>
            </el-row> -->
            <el-collapse accordion>
              <el-collapse-item title="HTML">
                <span>{{ plugin.outerHTML }}</span>
              </el-collapse-item>
            </el-collapse>
          </el-row>
          <el-row style="background-color: #FeFeFe; padding: 0 15px;border-bottom: 1px solid #DCDFE6;border-top: 1px solid #DCDFE6;height: 40px;line-height: 40px;">
            <el-col :span="24" class="text-overflow">
              <label style="font-weight: bold;color: #666666;">API总数：{{ plugin.functionTotal }}</label>
            </el-col>
          </el-row>
          <div class="panel-header">
            <el-collapse accordion class="panel" @change="collapseShow(plugin.pluginId)">
              <el-collapse-item>
                <template slot="title">
                  API调用个数：{{ plugin.inUse }}
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
                  <el-row v-for="(item,index) in pagePluginFunction" :key="index" class="margin-bottom15">
                    <el-col :span="12" class="text-overflow">
                      <span>{{ item.functionName }}</span>
                    </el-col>
                    <el-col :span="12" class="text-overflow">
                      <span>{{ item.count }}</span>
                    </el-col>
                  </el-row>

                </div>
              </el-collapse-item>

              <el-collapse-item>
                <template slot="title">
                  API未调用个数：{{ plugin.onUse }}
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
                  <el-row v-for="(item,index) in pagePluginFunctionUse" :key="index" class="margin-bottom15">
                    <el-col :span="12" class="text-overflow">
                      <span>{{ item.functionName }}</span>
                    </el-col>
                    <el-col :span="12" class="text-overflow">
                      <span>{{ item.count }}</span>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>

            </el-collapse>
          </div>

        </el-row>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        API访问记录
      </div>
      <div class="panel-content">
        <el-row class="margin-bottom15">
          <el-col :span="12" class="text-overflow">
            <label>API名称</label>
          </el-col>
          <el-col :span="12" class="text-overflow">
            <label>访问次数</label>
          </el-col>
        </el-row>

        <el-row style="background-color: #FAFAFA;">
          <el-row v-for="item in apiDetail" :key="item.functionId" style="padding: 0 15px;height: 40px;line-height:40px;border-bottom: 1px solid #DCDFE6;">
            <el-col :span="12" class="text-overflow">
              <span>{{ item.functionName }}</span>
            </el-col>
            <el-col :span="12" class="text-overflow">
              <span>调用{{ item.count }}次</span>
            </el-col>
          </el-row>

        </el-row>
      </div></div>

  </div>
</template>

<script>
import pageService from '@/api/page'
import deviceService from '@/api/device'
import browserService from '@/api/browser'

export default {
  name: 'DataDetail',
  data() {
    return {
      count: 10,
      loading: false,
      deviceInfo: {
        machine_name: '-'
      },
      browserDetail: {

      },
      apiDetail: {
      },
      pageDetail: {},
      pagePluginFunction: [],
      pagePluginFunctionUse: [],
      pagePluginDetail: [],
      total: 0,
      multipleSelection: [],
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
      pageRecordList: [],
      searchParams: {
        browserId: null, // 浏览器主键id
        apiName: null, // api名称
        classId: null, // 插件id
        sysId: null, // 系统主键id
        resourceFileId: null, // 原始文件记录id
        accessStartTime: null, // 页面访问开始时间
        accessEndTime: null, // 页面访问结束时间
        page: 1,
        size: 10,
        sortColumns: '',
        sortDefault: false

      }
    }
  },
  computed: {
    noMore() {
      return this.count >= 20
    },
    disabled() {
      return this.loading || this.noMore
    }
  },

  created() {
    this.deviceinfoId = this.$route.query.deviceinfoId
    this.browserConfigId = this.$route.query.browserConfigId
    this.pageId = this.$route.query.pageId
    this.pageId = this.$route.query.pageId
    this.init()
  },
  methods: {
    collapseShow(id, status) {
      pageService.getPluginFcuntion({
        pageId: this.pageId, pluginRecordId: id, inUse: true
      }).then(res => {
        this.pagePluginFunction = res.data
      })

      pageService.getPluginFcuntion({
        pageId: this.pageId, pluginRecordId: id, inUse: false
      }).then(res => {
        this.pagePluginFunctionUse = res.data
      })
    },
    init() {
      this.getDeviceDetail()
      this.getBrowserDetail()
      this.getApiDetail()
      this.getPagePluginDetail()
      this.getPageDetailById()
    },
    getPageDetailById() {
      pageService.getPageDetailById({
        pageId: this.pageId
      }).then(res => {
        this.pageDetail = res
      })
    },

    getBrowserDetail() {
      browserService.getBrowserDetail({
        browserConfigId: this.browserConfigId
      }).then(res => {
        this.browserDetail = res
      })
    },
    getDeviceDetail() {
      deviceService.getDeviceDetail({
        deviceinfoId: this.deviceinfoId
      }).then(res => {
        this.deviceInfo = res
      })
    },
    getApiDetail() {
      pageService.getPageApiDetail({
        pageId: this.pageId
      }).then(res => {
        this.apiDetail = res
      })
    },
    getPagePluginDetail() {
      pageService.getPagePluginDetail({
        pageId: this.pageId
      }).then(res => {
        this.pagePluginDetail = res
      })
    },
    getPageRecordList() {
      pageService.getPageRecordList(this.searchParams)
        .then(res => {
          this.pageRecordList = res.data
          setTimeout(() => {
            this.total = res.total
          })
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
