<template>
  <div class="packetManage">
    <div class="seach-div">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline" size="mini">
        <el-form-item label="">
          <el-input v-model="searchParams.searchKey" placeholder="文件名/设备标识" suffix-icon="el-icon-search" />
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="searchParams.userId" placeholder="上传人员">
            <el-option v-for="item in userList" :key="item.userId" :label="item.userName" :value="item.userId" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="searchParams.deviceSerial" placeholder="设备地址">
            <el-option v-for="item in deviceList" :key="item.deviceId" :label="item.deviceSerial" :value="item.deviceSerial" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="searchParams.startTime"
            type="date"
            placeholder="开始日期"
          />
        </el-form-item>
        <el-form-item label="-">
          <el-date-picker
            v-model="searchParams.endTime"
            type="date"
            placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row class="action-button">
      <el-upload
        class="upload-demo"
        :action="uploadUrl"
        :show-file-list="false"
        :on-success="handleSuccess"
      >
        <el-button size="mini" type="primary"><i class="el-icon-upload2" /> 上传</el-button>
      </el-upload>
      <el-button type="primary" size="mini" :disabled="multipleSelection.length !== 1" @click="downLoad"><i class="el-icon-download" /> 下载</el-button>
      <el-button type="primary" size="mini" :disabled="multipleSelection.length !== 1" @click="deleteFile"><i class="el-icon-delete" /> 删除</el-button>
    </el-row>
    <div class="table-div">
      <el-table
        :data="sourceFileRecordList"
        style="width: 100%;height: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
        />
        <el-table-column
          prop="sfId"
          label="编号"
        />
        <el-table-column
          prop="fileName"
          label="文件名"
        >
          <template slot-scope="scope">
            <el-link type="primary" :href="'#/dataManage?sfId=' + scope.row.sfId">{{ scope.row.fileName }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="数据状态"
        >
          <template slot-scope="scope">
            {{ scope.row.status | fileRecordStatusFormat }}
          </template>
        </el-table-column>
        <el-table-column
          prop="fileSize"
          label="数据大小"
        />
        <el-table-column
          prop="userName"
          label="上传人员"
        />
        <el-table-column
          prop="createTime"
          label="上传时间"
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
import adminService from '@/api/admin'
import sourceFileRecordService from '@/api/sourceFileRecord'
import { getUser } from '@/api/user'
import deviceService from '@/api/device'

export default {
  name: 'PacketManage',
  data() {
    return {
      total: 0,
      uploadUrl: this.$uploadUrl + localStorage.getItem('token'),
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
      sourceFileRecordList: [],
      searchParams: {
        page: 1,
        size: 10,
        searchKey: null,
        userId: null,
        startTime: null,
        endTime: null
      },
      userList: [],
      deviceList: []
    }
  },
  created() {
    this.getUser()
    this.getDevice()
    this.getSourceFileRecordList()
  },
  methods: {
    getUser() {
      getUser()
        .then(res => {
          this.userList = res.data
        })
    },
    getSourceFileRecordList() {
      sourceFileRecordService.getSourceFileRecordList(this.searchParams)
        .then(res => {
          this.sourceFileRecordList = res.data
          this.total = res.total
        })
    },
    getDevice() {
      deviceService.getDevice()
        .then(res => {
          this.deviceList = res
        })
    },
    viewDetail(row) {
      this.$router.push('/admin/authentication/companyAuth?id=' + row.id + '&view=1')
    },
    pageChange(page) {
      this.searchParams.page = page
      this.getSourceFileRecordList()
    },
    onSubmit() {
      this.getSourceFileRecordList()
    },
    goCompanyAuth(row) {
      this.$router.push('/admin/authentication/companyAuth?id=' + row.id)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSuccess(res, file) {
      if (res.data[0].status === 1) {
        this.searchParams.page = 1
        this.getSourceFileRecordList()
        this.$notify({
          title: '成功',
          message: '上传成功',
          type: 'success'
        })
      } else {
        this.$notify({
          title: '上传失败',
          message: res.data[0].uploadMessage,
          type: 'error'
        })
      }
    },
    downLoad() {
      window.open(process.env.VUE_APP_BASE_API + '/data/sourceFileDownload?sfId=' + this.multipleSelection[0].sfId + '&token=' + localStorage.getItem('token'), '_blank')
      // window.location.href = process.env.VUE_APP_BASE_API + '/data/sourceFIleDownload?sfId=' + this.multipleSelection[0].sfId + '&token=' + localStorage.getItem('token')
    },
    deleteFile() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sourceFileRecordService.sourceFileDelete({
          sfId: this.multipleSelection[0].sfId
        })
          .then(res => {
            this.$notify({
              title: '删除成功',
              message: '提示消息',
              type: 'success'
            })
            this.searchParams.page = 1
            this.getSourceFileRecordList()
          })
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang='scss'>
.packetManage{
  height: 100%;
  padding: 20px 30px;
  height: 100%;
  .action-button{
    margin-bottom: 10px;
    .upload-demo{
      display: inline-block;
      margin-right: 10px;
    }
  }
}
</style>
