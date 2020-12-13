<template>
  <div class="authenticationCompany">
    <div class="seach-div">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline" size="small">
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
    <div class="table-div">
      <el-table
        :data="companyAuthList"
        border
        style="width: 100%;height: 100%"
      >
        <el-table-column
          prop="companyName"
          label="企业名称"
        />
        <el-table-column
          prop="unifiedCode"
          label="信用代码"
        />
        <el-table-column
          prop="addr"
          label="地址"
        />
        <el-table-column
          prop="website"
          label="公司官网"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
        />
        <el-table-column
          prop="auditStatus"
          label="状态"
        >
          <template slot-scope="scope">
            {{ scope.row.auditStatus | companyAuditStatusFormat }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewDetail(scope.row)">查看</el-button>
            <el-button v-show="scope.row.auditStatus === 1" type="text" size="small" @click="goCompanyAuth(scope.row)">审核</el-button>
          </template>
        </el-table-column>
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

export default {
  name: 'AuthenticationCompany',
  data() {
    return {
      total: 0,
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
      companyAuthList: [],
      searchParams: {
        pageNum: 1,
        pageSize: 10,
        sortColumns: '',
        sortDefault: false
      }
    }
  },
  created() {
    // this.getCompanyAuthList()
  },
  methods: {
    getCompanyAuthList() {
      adminService.getCompanyAuthList(this.searchParams)
        .then(res => {
          this.companyAuthList = res.array
          this.total = res.total
        })
    },
    viewDetail(row) {
      this.$router.push('/admin/authentication/companyAuth?id=' + row.id + '&view=1')
    },
    pageChange(page) {
      this.searchParams.pageNum = page
      this.getCompanyAuthList()
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
.authenticationCompany{
  height: 100%;
  padding: 20px 30px;
  .seach-div{
    height: 60px;
  }
  .table-div{
    height: calc(100% - 100px);
  }
  .pagination{
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
