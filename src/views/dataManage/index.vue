<template>
  <div class="dataManage">
    <div class="seach-div">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline" size="mini">
        <el-form-item label="">
          <el-select v-model="searchParams.sfId" clearable placeholder="数据包名" @change="onChange(1)">
            <el-option v-for="item in sourceFileList" :key="item.sfId" :label="item.fileName" :value="item.sfId" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="searchParams.browserId" clearable placeholder="浏览器类型" @change="onChange(2)">
            <el-option v-for="item in browserList" :key="item.browserId" :label="item.browserName" :value="item.browserId" />
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-select v-model="searchParams.siteId" clearable placeholder="网站地址" @change="onChange(3)">
            <el-option v-for="item in siteList" :key="item.siteId" :label="item.host" :value="item.siteId" />
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-select v-model="searchParams.classId" clearable placeholder="插件类型" @change="onChange(4)">
            <el-option v-for="item in pluginList" :key="item.classId" :label="item.fileName" :value="item.classId" />
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-select v-model="searchParams.apiName" clearable placeholder="API类型" @change="onChange(5)">
            <el-option v-for="item in apiList" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>

        <!-- <el-form-item>
          <el-button type="primary" @click="getPageRecordList">查询</el-button>
        </el-form-item> -->
      </el-form>

    </div>
    <el-row class="action-button">
      <el-button type="primary" size="mini" :disabled="multipleSelection.length === 0" @click="deletePageReocrd"><i class="el-icon-delete" /> 删除</el-button>
      <el-button type="primary" size="mini" :disabled="multipleSelection.length === 0" @click="downloadPageRecordById"><i class="el-icon-download" /> 下载</el-button>
      <el-button type="primary" size="mini" :disabled="multipleSelection.length !== 0" @click="centerDialogVisible = true"><i class="el-icon-download" /> 下载全部</el-button>
      <el-dialog
        title="批量下载"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      >
        <p>记录条数：{{ total }}</p>
        <p>数据包名：{{ sourceFileName }}</p>
        <p>浏览器类型：{{ browserName }}</p>
        <p>网站地址：{{ host }}</p>
        <p>插件类型：{{ pluginName }}</p>
        <p>API类型：{{ searchParams.apiName }}</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="downloadPageRecord">确 定</el-button>
        </span>
      </el-dialog>
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
          prop="pluginTypeCount"
          label="插件个数"
        />
        <el-table-column
          prop="pluginCount"
          label="插件访问次数"
        />

        <el-table-column
          prop="apiCount"
          label="API个数"
        />
        <el-table-column
          prop="assessTime"
          label="页面访问时间"
          show-overflow-tooltip
        />
        <el-table-column
          prop="browserConfig.browser_name"
          label="浏览器名称"
          show-overflow-tooltip
        />
        <el-table-column
          prop="browserConfig.version"
          label="浏览器版本"
          show-overflow-tooltip
        />

        <el-table-column
          prop="deviceConfig.device_serial"
          label="设备标识"
          show-overflow-tooltip
        />
        <el-table-column
          prop="deviceConfig.sys_name"
          label="操作系统"
          show-overflow-tooltip
        />
        <el-table-column
          prop="deviceConfig.version"
          label="操作系统版本"
          show-overflow-tooltip
        />
        <el-table-column
          prop="deviceConfig.os_platform"
          label="操作系统平台"
          show-overflow-tooltip
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
  </div>
</template>

<script>
import pageService from '@/api/page'
import browserService from '@/api/browser'
import pluginService from '@/api/plugin'
import sourceFileRecordService from '@/api/sourceFileRecord'
import qs from 'qs'
import _ from 'lodash'
import dayjs from 'dayjs'
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
        timeStamp: null,
        page: 1,
        size: 10,
        sortColumns: '',
        sortDefault: false
      },

      centerDialogVisible: false,
      sourceFileName: '',
      browserName: '',
      host: '',
      pluginName: ''

    }
  },
  created() {
    this.searchParams.sfId = parseInt(this.$route.query.sfId)
    if (!this.searchParams.sfId) {
      this.searchParams.sfId = null
    } else {
      this.getBrowserList()
    }

    this.getPageRecordList()
    this.getResourceList()
  },
  methods: {
    onChange(index) {
      this.searchParams.page = 1
      let obj = {}
      if (index === 1) {
        // 需要置空所有的级联数据
        this.browserList = null
        this.siteList = null
        this.pluginService = null
        this.apiList = null
        this.searchParams.browserId = ''
        this.searchParams.siteId = ''
        this.searchParams.classId = ''
        this.searchParams.apiName = ''
        this.pluginName = ''
        this.browserName = ''
        this.host = ''
        this.sourceFileName = ''
        if (this.searchParams.sfId) {
          obj = this.sourceFileList.find((item) => {
            return item.sfId === this.searchParams.sfId
          })
          if (obj) {
            this.sourceFileName = obj.fileName
          }

          browserService.getBrowsers({ sfId: this.searchParams.sfId })
            .then(res => {
              this.browserList = res
            })
        }
      }

      if (index === 2) {
        this.siteList = null
        this.pluginService = null
        this.apiList = null
        this.searchParams.siteId = ''
        this.searchParams.classId = ''
        this.searchParams.apiName = ''
        this.pluginName = ''
        this.browserName = ''
        this.host = ''
        if (this.searchParams.browserId) {
          obj = this.browserList.find((item) => {
            return item.browserId === this.searchParams.browserId
          })
          if (obj) {
            this.browserName = obj.browserName
          }

          pageService.getSite({ sfId: this.searchParams.sfId, browserId: this.searchParams.browserId })
            .then(res => {
              this.siteList = res
            })
        }
      }

      if (index === 3) {
        this.pluginService = null
        this.apiList = null
        this.searchParams.classId = ''
        this.searchParams.apiName = ''
        this.pluginName = ''
        if (this.searchParams.siteId) {
          obj = this.siteList.find((item) => {
            return item.siteId === this.searchParams.siteId
          })
          if (obj) {
            this.host = obj.host
          }

          pluginService.getPlugins({ sfId: this.searchParams.sfId, browserId: this.searchParams.browserId, siteId: this.searchParams.siteId })
            .then(res => {
              this.pluginList = res
            })
          pageService.getFunctions({ sfId: this.searchParams.sfId, browserId: this.searchParams.browserId, siteId: this.searchParams.siteId })
            .then(res => {
              this.apiList = res
            })
        }
      }
      if (index === 4) {
        this.pluginName = ''
        obj = this.pluginList.find((item) => {
          return item.classId === this.searchParams.classId
        })
        if (obj) {
          this.pluginName = obj.name
        }
      }
      this.getPageRecordList()
    },

    getPageRecordList() {
      pageService.getPageRecordList(this.searchParams)
        .then(res => {
          this.pageRecordList = res.data
          this.total = res.total
        })
    },
    getBrowserList() {
      if (this.searchParams.sfId) {
        browserService.getBrowsers({ sfId: this.searchParams.sfId })
          .then(res => {
            this.browserList = res
          })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    pageChange(page) {
      this.searchParams.page = page
      this.getPageRecordList()
    },
    handleSizeChange() {
      this.searchParams.page = 1
      // this.searchParams.size = size
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
      pageService.checkDownloadStatus()
        .then(res => {
          this.centerDialogVisible = false
          this.searchParams.timeStamp = dayjs().valueOf()
          const params = qs.stringify({
            token: localStorage.getItem('token'),
            ...this.searchParams
          })
          console.log(params)
          window.open(process.env.VUE_APP_BASE_API + '/page/exportPageRecord?' + params, '_blank')
        })

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
