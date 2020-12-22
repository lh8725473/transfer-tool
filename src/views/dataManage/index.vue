<template>
  <div class="dataManage">
    <div class="seach-div">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline" size="mini">
        <el-form-item label="">
          <el-select v-model="searchParams.sfId" clearable placeholder="数据包名" @change="onChange">
            <el-option v-for="item in sourceFileList" :key="item.sfId" :label="item.fileName" :value="item.sfId" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="searchParams.browserId" clearable placeholder="浏览器类型" @change="onChange">
            <el-option v-for="item in browserList" :key="item.browserId" :label="item.browserName" :value="item.browserId" />
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-select v-model="searchParams.siteId" clearable placeholder="网站地址" @change="onChange">
            <el-option v-for="item in siteList" :key="item.siteId" :label="item.host" :value="item.siteId" />
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-select v-model="searchParams.classId" clearable placeholder="插件类型" @change="onChange">
            <el-option v-for="item in pluginList" :key="item.classId" :label="item.fileName" :value="item.classId" />
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-select v-model="searchParams.apiName" clearable placeholder="API类型" @change="onChange">
            <el-option v-for="item in apiList" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>

    </div>
    <el-row class="action-button">
      <el-button type="primary" size="mini" :disabled="multipleSelection.length === 0" @click="deletePageReocrd"><i class="el-icon-delete" /> 删除</el-button>
      <el-button type="primary" size="mini" :disabled="multipleSelection.length === 0" @click="downloadPageRecordById"><i class="el-icon-download" /> 下载</el-button>
      <el-button type="primary" size="mini" :disabled="multipleSelection.length !== 0" @click="downloadPageRecord"><i class="el-icon-download" /> 下载全部</el-button>
    </el-row>
    <div class="table-div">
      <el-table
        :data="pageRecordList"
        style="width: 100%;height: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        />

        <el-table-column
          prop="url"
          label="地址"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-link type="primary" :href="'#/dataDetail?browserConfigId=' + scope.row.browserConfigId + '&deviceinfoId=' + scope.row.deviceinfoId + '&pageId=' + scope.row.pageId">{{ scope.row.url }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="apiCount"
          label="api个数"
        />
        <el-table-column
          prop="assessTime"
          label="页面访问时间"
          show-overflow-tooltip
        />
        <el-table-column
          prop="browser.browserName"
          label="浏览器名称"
          show-overflow-tooltip
        />
        <el-table-column
          prop="pageTitle"
          label="页面标题"
          show-overflow-tooltip
        />
        <el-table-column
          prop="pathName"
          label="页面路径"
          show-overflow-tooltip
        />
        <el-table-column
          prop="pluginCount"
          label="插件访问次数"
        />
        <el-table-column
          prop="pluginTypeCount"
          label="插件个数"
        />
        <el-table-column
          prop="device.deviceSerial"
          label="设备标识"
          show-overflow-tooltip
        />
        <el-table-column
          prop="sys.sysName"
          label="操作系统"
          show-overflow-tooltip
        />
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="pageChange"
      />
    </div>
  </div>
</template>

<script>
import pageService from '@/api/page'
import browserService from '@/api/browser'
import pluginService from '@/api/plugin'
import sourceFileRecordService from '@/api/sourceFileRecord'
import qs from 'qs'
import _ from 'lodash'
export default {
  name: 'DataManage',
  data() {
    return {
      total: 0,
      multipleSelection: [],
      sourceFileList: [],
      browserList: null,
      siteList: null,
      apiList: null,
      pluginList: null,
      pageRecordList: [],
      searchParams: {
        browserId: null, // 浏览器主键id
        apiName: null, // api名称
        classId: null, // 插件id
        sysId: null, // 系统主键id
        sfId: null, // 原始文件记录id
        accessStartTime: null, // 页面访问开始时间
        accessEndTime: null, // 页面访问结束时间
        siteId: null, // 网站id
        page: 1,
        size: 10,
        sortColumns: '',
        sortDefault: false
      }
    }
  },
  created() {
    this.searchParams.sfId = parseInt(this.$route.query.sfId)
    if (!this.searchParams.sfId) {
      this.searchParams.sfId = null
    }
    this.getPageRecordList()
    this.getBrowserList()
    this.getResourceList()
  },
  methods: {
    onChange() {
      console.log(this.searchParams.browserId + 'tttt')
      if (this.searchParams.browserId && this.browserList) {
        if (!this.siteList) {
          pageService.getSite({ borwserId: this.searchParams.browserId })
            .then(res => {
              this.siteList = res
              console.log(this.siteList)
            })
        }
      } else {
        this.siteList = null
        this.pluginList = null
        this.apiList = null
        this.searchParams.browserId = null
        this.searchParams.apiName = null
        this.searchParams.classId = null
        this.searchParams.siteId = null
      }

      if (this.searchParams.siteId && this.siteList) {
        if (!this.pluginList) {
          pluginService.getPlugins({ siteId: this.searchParams.siteId, borwserId: this.searchParams.browserId })
            .then(res => {
              this.pluginList = res
            })
        }
      } else {
        this.pluginList = null
        this.apiList = null
        this.searchParams.apiName = null
        this.searchParams.classId = null
        this.searchParams.siteId = null
      }

      if (this.searchParams.classId && this.pluginList) {
        if (!this.apiList) {
          pageService.getFunctions({ siteId: this.searchParams.siteId, borwserId: this.searchParams.browserId, classId: this.searchParams.classId })
            .then(res => {
              this.apiList = res
            })
        }
      } else {
        console.log('plugin id is null')
        this.apiList = null
        this.searchParams.apiName = null
        this.searchParams.classId = null
      }

      // this.searchParams.resourceFileId=null
    },
    getPageRecordList() {
      pageService.getPageRecordList(this.searchParams)
        .then(res => {
          this.pageRecordList = res.data
          this.total = res.total
        })
    },
    getBrowserList() {
      browserService.getBrowsers()
        .then(res => {
          this.browserList = res
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    pageChange(page) {
      this.searchParams.page = page
      this.getPageRecordList()
    },
    getResourceList() {
      sourceFileRecordService.getSourceFileRecordList({})
        .then(res => {
          this.sourceFileList = res.data
        })
    },
    deletePageReocrd() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const pageIds = []
        _.forEach(this.multipleSelection, element => {
          pageIds.push(element.pageId)
        })
        pageService.pageRecordDelete({
          pageId: pageIds
        })
          .then(res => {
            this.$notify({
              title: '删除成功',
              message: '提示消息',
              type: 'success'
            })
            this.searchParams.page = 1
            this.getPageRecordList()
          })
      }).catch(() => {

      })
    },
    downloadPageRecord() {
      console.log('导出所有的数据')
      const params = qs.stringify({
        token: localStorage.getItem('token'),
        ...this.searchParams
      })
      window.open(process.env.VUE_APP_BASE_API + '/page/exportPageRecord?' + params, '_blank')
      // window.location.href = process.env.VUE_APP_BASE_API + '/data/sourceFIleDownload?sfId=' + this.multipleSelection[0].sfId + '&token=' + localStorage.getItem('token')
    },
    downloadPageRecordById() {
      let pageIds = ''
      console.log('根据id导出记录')
      _.forEach(this.multipleSelection, element => {
        pageIds += element.pageId + ','
      })
      window.open(process.env.VUE_APP_BASE_API + '/page/exportPageRecordById?token=' + localStorage.getItem('token') + '&pageId=' + pageIds, '_blank')
      // window.location.href = process.env.VUE_APP_BASE_API + '/data/sourceFIleDownload?sfId=' + this.multipleSelection[0].sfId + '&token=' + localStorage.getItem('token')
    },
    goCompanyAuth(row) {
      this.$router.push('/admin/authentication/companyAuth?id=' + row.id)
    }
  }
}
</script>

<style lang='scss'>
.dataManage{
  height: 100%;
  padding: 20px 30px;
  .action-button{
    margin-bottom: 10px;
    .upload-demo{
      display: inline-block;
      margin-right: 10px;
    }
  }
}
</style>
