<template>
  <div class="dataDetail">
    <div class="pageTitle-url">
      <label>{{ pageDetail.page_title }}</label>
      <label>{{ pageDetail.url }}</label>
    </div>
    <div class="panel">
      <div class="panel-header">
        系统已安装插件({{ total }})
      </div>
      <div class="plugin-list">
        <el-tag
          v-for="item in pagePluginDetail"
          :key="item.classId"
          :type="item.selected ? '' : 'info' "
          :effect="item.selected ? 'dark' : 'plain'"
          @click="changePlugin(item)"
        >
          {{ item.name }} ({{ item.pluginFunctionCount }})次
        </el-tag>
        <el-tag
          v-show="pagePluginDetail.length < total "
          type="''"
          effect="plain"
          @click="getMore"
        >
          更多...
        </el-tag>
      </div>

      <div v-if="pagePluginDetail.length>0" class="panel-content">
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
            {{ item.name }} (调用{{ item.count }}次)
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
  </div>
</template>

<script>
import pageService from '@/api/page'
import deviceService from '@/api/device'
import browserService from '@/api/browser'
import _ from 'lodash'
export default {
  name: 'DataDetail',
  data() {
    return {
      total: 0,
      pluginFunctionInUseTotal: 0,
      pluginFunctionCount: 0,
      pageApiInUseTotal: 0, // 页面api调用总数
      pageApiTotal: 0, // 页面api总数

      loading: false,
      plugin: {},
      searchPluginParams: {
        page: 1,
        size: 5,
        pageId: null,
        classid: '',
        type: 'all'
      },
      searchPluginFunctionParams: {
        page: 1,
        size: 5,
        pageId: '',
        classid: '',
        type: 'inUse'
      },
      searchPluginFunctionUnUseParams: {
        page: 1,
        size: 5,
        pageId: '',
        classid: '',
        type: 'unUse'
      },
      searchPageFunctionInUseParams: { // 查询页面api未调用参数
        page: 1,
        size: 5,
        siteId: null,
        type: ''
      },
      searchPageFunctionUnUseParams: { // 查询页面api调用参数
        page: 0,
        size: 5,
        siteId: null,
        type: 'unUse'
      },
      deviceInfo: {
        machine_name: '-'
      },
      browserDetail: {

      },
      apiDetail: {
      },
      pageDetail: {},
      inUsefunctionList: [],
      unUsefunctionList: [],
      pagePluginDetail: [],
      pageApiInUseList: [], // 页面特有api 调用列表
      pageApiUnUseList: [], // 页面特有api 未调用列表
      multipleSelection: [],
      moreOuterHTML: false,
      morePluginFunction: false,
      morePluginFunctionUnUse: false,

      morePageFunction: false,
      morePageFunctionUnUse: false,

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
  created() {
    this.deviceinfoId = this.$route.query.deviceinfoId
    this.browserConfigId = this.$route.query.browserConfigId
    this.pageId = this.$route.query.pageId
    this.searchPluginParams.pageId = this.$route.query.pageId
    this.searchPluginFunctionParams.pageId = this.$route.query.pageId
    this.searchPluginFunctionUnUseParams.pageId = this.$route.query.pageId
    this.searchPageFunctionInUseParams.pageId = this.$route.query.pageId
    this.searchPageFunctionUnUseParams.pageId = this.$route.query.pageId
    this.init()
  },
  methods: {
    getMore() {
      this.searchPluginParams.page++
      pageService.getPagePluginDetail(
        this.searchPluginParams
      ).then(res => {
        _.forEach(res.data, item => {
          item.selected = false
          this.pagePluginDetail.push(item)
        })
        this.total = res.total
      })
    },
    changePlugin(row) {
      _.forEach(this.pagePluginDetail, item => {
        item.selected = false
      })
      row.selected = true
      this.plugin = row

      this.searchPluginFunctionParams.classid = row.classId
      this.searchPluginFunctionUnUseParams.classid = row.classId

      this.moreOuterHTML = false
      this.morePluginFunction = false
      this.morePluginFunctionUnUse = false

      this.morePageFunction = false
      this.morePageFunctionUnUse = false
      this.searchPluginFunctionParams.size = 5

      this.getPagePluginFunctionCount()
      this.searchPluginFunctionParams.type = 'inUse'
      pageService.getPluginFcuntion(this.searchPluginFunctionParams)
        .then(res2 => {
          this.inUsefunctionList = res2.data
          this.unUsefunctionList = []
          this.pluginFunctionInUseTotal = res2.total
        })
    },
    init() {
      this.getDeviceDetail()
      this.getBrowserDetail()
      this.getPageApiTotal()
      this.getPagePluginDetail()
      this.getPageDetailById()
      this.getPageApiList()
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
    getPagePluginDetail() {
      pageService.getPagePluginDetail(
        this.searchPluginParams
      ).then(res => {
        _.forEach(res.data, item => {
          item.selected = false
        })
        res.data[0].selected = true
        this.pagePluginDetail = res.data
        this.total = res.total
        if (this.pagePluginDetail.length > 0) {
          this.plugin = this.pagePluginDetail[0]
          this.searchPluginParams.classid = this.pagePluginDetail[0].classId
          this.searchPluginFunctionParams.classid = this.pagePluginDetail[0].classId
          this.searchPluginFunctionUnUseParams.classid = this.pagePluginDetail[0].classId
          this.getPagePluginFunctionCount()
          this.searchPluginFunctionParams.type = 'inUse'
          pageService.getPluginFcuntion(this.searchPluginFunctionParams)
            .then(res2 => {
              this.inUsefunctionList = res2.data
              this.pluginFunctionInUseTotal = res2.total
            })
        }
      })
    },
    getPagePluginFunctionCount() {
      pageService.getPluginFcuntion(
        this.searchPluginParams
      ).then(res => {
        this.pluginFunctionCount = res.total
      })
    },
    getMoreOuterHTML(flag) {
      this.moreOuterHTML = flag
    },
    getMorePluginFunction(flag) {
      this.searchPluginFunctionParams.type = 'inUse'
      if (flag) {
        this.searchPluginFunctionParams.size = 999
      } else {
        this.searchPluginFunctionParams.size = 5
      }
      this.morePluginFunction = flag
      pageService.getPluginFcuntion(this.searchPluginFunctionParams)
        .then(res2 => {
          this.inUsefunctionList = res2.data
        })
    },

    getMorePluginFunctionUnUse(flag) {
      this.searchPluginFunctionUnUseParams.type = 'unUse'
      if (flag) {
        this.searchPluginFunctionUnUseParams.size = 999
        pageService.getPluginFcuntion(this.searchPluginFunctionUnUseParams)
          .then(res2 => {
            this.unUsefunctionList = res2.data
          })
      } else {
        this.unUsefunctionList = []
      }
      this.morePluginFunctionUnUse = flag

      // this.searchPluginFunctionUnUseParams.page++
      // this.searchPluginFunctionUnUseParams.size = this.pluginFunctionCount - this.pluginFunctionInUseTotal
    },
    getPageApiTotal() {
      this.searchPageFunctionInUseParams.type = 'all'
      pageService.getPageApiDetail(this.searchPageFunctionInUseParams)
        .then(res => {
          this.pageApiTotal = res.total
          this.getPageApiList()
        })
    },
    getPageApiList() {
      this.searchPageFunctionInUseParams.type = 'inUse'
      pageService.getPageApiDetail(this.searchPageFunctionInUseParams)
        .then(res => {
          this.pageApiInUseList = res.data
          this.pageApiInUseTotal = res.total
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
      pageService.getPageApiDetail(this.searchPageFunctionInUseParams)
        .then(res => {
          this.pageApiInUseList = res.data
          this.pageApiInUseTotal = res.total
        })
    },

    getMorePageFunctionUnUse(flag) {
      this.searchPageFunctionUnUseParams.type = 'unUse'
      if (flag) {
        this.searchPageFunctionUnUseParams.size = 999
        pageService.getPageApiDetail(this.searchPageFunctionUnUseParams)
          .then(res => {
            this.pageApiUnUseList = res.data
          })
      } else {
        this.pageApiUnUseList = []
      }
      this.morePageFunctionUnUse = flag

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

.dataDetail{
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
        margin-top: 10px;
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
    margin-bottom: 8px;
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
