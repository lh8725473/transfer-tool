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
          <el-col :span="8" class="text-overflow">
            <label>唯一标识：</label>
            <span :title="deviceInfo.device_serial">{{ deviceInfo.device_serial }}</span>
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
          <el-col :span="8" class="text-overflow">
            <label>浏览器user agent：</label>
            <span>{{ browserDetail.user_agent }}</span>
          </el-col>
          <el-col :span="8" class="text-overflow">
            <label>浏览器模块版本：</label>
            <span>{{ browserDetail.app_version }}</span>
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
          <el-col :span="8" class="text-overflow">
            <label>URL：</label>
            <span :title="pageDetail.url">{{ pageDetail.url }}</span>
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
          <el-col :span="8" class="text-overflow">
            <label>页面路径：</label>
            <span>{{ pageDetail.path_name }}</span>
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
          <el-row class="margin-bottom15">
            <el-col :span="12" class="text-overflow">
              <label>{{ plugin.systemPlugin.name }}</label>
            </el-col>
          </el-row>
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
            <el-col :span="8" class="text-overflow">
              <label>插件属性ID：</label>
              <span>{{ plugin.systemPlugin.progId }}</span>
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

          <el-row class="margin-bottom15">
            <el-col :span="24" class="text-overflow">
              <label>HTML：</label>
              <code>{{ plugin.outerHTML }}</code>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12" class="text-overflow">
              <label>该插件调用API情况：共使用API数量 {{ plugin.functions.length }}</label>
            </el-col>
          </el-row>
          <el-row v-for="item in plugin.functions" :key="item.functionId">
            <el-col :span="12" class="text-overflow">
              <span>{{ item.functionName }}</span>
            </el-col>
            <el-col :span="12" class="text-overflow">
              <span>调用{{ item.count }}次</span>
            </el-col>
          </el-row>
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
        <el-row v-for="item in apiDetail" :key="item.functionId" class="margin-bottom15">
          <el-col :span="12" class="text-overflow">
            <span>{{ item.name }}</span>
          </el-col>
          <el-col :span="12" class="text-overflow">
            <span>{{ item.count }}</span>
          </el-col>
        </el-row>
      </div>
    </div>
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
      deviceInfo: {
        machine_name: '-'
      },
      browserDetail: {

      },
      apiDetail: {
      },
      pageDetail: {},
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
        pageNum: 1,
        pageSize: 10,
        sortColumns: '',
        sortDefault: false
      }
    }
  },
  created() {
    this.deviceinfoId = this.$route.query.deviceinfoId
    this.browserConfigId = this.$route.query.browserConfigId
    this.pageId = this.$route.query.pageId
    this.init()
  },
  methods: {
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
          }, 3000)
        })
    },
    viewDetail(row) {
      this.$router.push('/admin/authentication/companyAuth?id=' + row.id + '&view=1')
    },
    pageChange(page) {
      this.searchParams.pageNum = page
      this.getPageRecordList()
    },
    onSubmit() {
    },
    goCompanyAuth(row) {
      this.$router.push('/admin/authentication/companyAuth?id=' + row.id)
    }
  }
}
</script>

<style lang='scss'>
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
      }
      font-size: 16px;
      color: #333333;
      margin-bottom: 20px;
    }
  }
  .margin-bottom15{
    margin-bottom: 15px;
  }
  .plugin-row{
    background: #FFFFFF;
    border: 1px solid #E9E9E9;
    border-radius: 2px;
    padding: 10px 15px;
    margin-bottom: 10px;
    background-color: #DCDFE6;
  }
}
</style>
