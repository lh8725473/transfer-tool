<template>
  <div class="dataManage">
    <div class="seach-div">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline" size="mini">
        <el-form-item label="企业名称">
          <el-input v-model="searchParams.user" placeholder="企业名称" />
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="searchParams.auditStatus" placeholder="请选择">
            <el-option v-for="item in auditStatusList" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row class="action-button">
      <el-button type="primary" size="mini" :disabled="multipleSelection.length !== 1"><i class="el-icon-delete" /> 删除</el-button>
      <el-button type="primary" size="mini" :disabled="multipleSelection.length !== 1"><i class="el-icon-download" /> 下载</el-button>
    </el-row>
    <div class="table-div">
      <el-table
        :data="pageRecordList"
        style="width: 100%;height: 100%"
      >
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

export default {
  name: 'DataManage',
  data() {
    return {
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
  created() {
    this.getPageRecordList()
  },
  methods: {
    getPageRecordList() {
      pageService.getPageRecordList(this.searchParams)
        .then(res => {
          this.pageRecordList = res.data
          this.total = res.total
        })
    },
    viewDetail(row) {
      this.$router.push('/admin/authentication/companyAuth?id=' + row.id + '&view=1')
    },
    pageChange(page) {
      this.searchParams.page = page
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
