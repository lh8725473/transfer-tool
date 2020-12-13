<template>
  <div class="packetManage">
    <div class="seach-div">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline" size="mini">
        <el-form-item label="">
          <el-input v-model="searchParams.user" placeholder="文件名/设备标识" suffix-icon="el-icon-search" />
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="searchParams.auditStatus" placeholder="上传人员">
            <el-option v-for="item in auditStatusList" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="searchParams.auditStatus" placeholder="设备地址">
            <el-option v-for="item in auditStatusList" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="searchParams.value1"
            type="date"
            placeholder="开始日期"
          />
        </el-form-item>
        <el-form-item label="-">
          <el-date-picker
            v-model="searchParams.value1"
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
        action="/api/data/offlineUpload?token=9C63UtYKf51nTJyos0NpK04DZqSuGmtA"
        :show-file-list="false"
        :on-success="handleSuccess"
      >
        <el-button size="mini" type="primary">点击上传</el-button>
      </el-upload>
      <el-button type="primary" size="mini" :disabled="multipleSelection.length !== 1">下载</el-button>
      <el-button type="primary" size="mini" :disabled="multipleSelection.length !== 1">删除</el-button>
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
        />
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

export default {
  name: 'PacketManage',
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
      sourceFileRecordList: [],
      searchParams: {
        page: 1,
        size: 10
      }
    }
  },
  created() {
    this.getSourceFileRecordList()
  },
  methods: {
    getSourceFileRecordList() {
      sourceFileRecordService.getSourceFileRecordList(this.searchParams)
        .then(res => {
          this.sourceFileRecordList = res.data
          this.total = res.total
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
    },
    goCompanyAuth(row) {
      this.$router.push('/admin/authentication/companyAuth?id=' + row.id)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSuccess(res, file) {
      console.log(res)
      console.log(file)
    }
  }
}
</script>

<style lang='scss'>
.packetManage{
  height: 100%;
  padding: 20px 30px;
  height: 100%;
  // .seach-div{
  //   height: 50px;
  // }
  .action-button{
    margin-bottom: 10px;
    .upload-demo{
      display: inline-block;
      margin-right: 10px;
    }
  }
  .table-div{
    height: calc(100% - 120px);
    border: 1px solid #DCDFE6;
  }
  .pagination{
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 150px;
  }
}
</style>
