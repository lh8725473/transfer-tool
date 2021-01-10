<template>
  <div class="dataManage">
    <!-- <div class="seach-div">
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

         <el-form-item>
          <el-button type="primary" @click="getPageRecordList">查询</el-button>
        </el-form-item>
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
        <p>插件类型：{{ pluginName }}</p>f
        <p>API类型：{{ searchParams.apiName }}</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="downloadPageRecord">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>  -->
    <div class="table-div">
      <el-table
        :data="deviceList"
        style="width: 100%;height: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          header-align="center"
          align="center"
          :index="indexMethod"
        />
        <el-table-column
          prop="machine_name"
          label="计算机名称"
          show-overflow-tooltip
        />

        <el-table-column
          prop="device_serial"
          label="设备序列号"
          show-overflow-tooltip
        />

        <el-table-column
          prop="ip_address"
          label="IP地址"
          show-overflow-tooltip
        />
        <el-table-column
          prop="device_user_name"
          label="用户名"
        />
        <el-table-column
          prop="os_service_pack"
          label="服务包"
          show-overflow-tooltip
        />
        <el-table-column
          prop="sys_name"
          label="操作系统"
          show-overflow-tooltip
        />
        <el-table-column
          prop="version"
          label="操作系统版本"
          show-overflow-tooltip
        />
        <el-table-column
          prop="os_platform"
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
        :page-sizes="[10, 20, 50,100]"
        @current-change="pageChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
import deviceService from '@/api/device'
import qs from 'qs'
import _ from 'lodash'

export default {
  name: 'DataManage',
  data() {
    return {
      total: 0,
      multipleSelection: [],
      deviceList: [],
      searchParams: {
        page: 1,
        size: 10,
        sortColumns: '',
        sortDefault: false
      }

    }
  },
  created() {
    this.getDeviceList()
  },
  methods: {

    getDeviceList() {
      deviceService.getDeviceList(this.searchParams)
        .then(res => {
          this.deviceList = res.data
          this.total = res.total
        })
    },
    handleSizeChange() {
      this.searchParams.page = 1
      // this.searchParams.size = size
      this.getDeviceList()
    },
    pageChange(page) {
      this.searchParams.page = page
      this.getDeviceList()
    },
    indexMethod(index) {
      const currentPage = this.searchParams.page // 当前页码
      const pageSize = this.searchParams.size // 每页条数
      return (index + 1) + (currentPage - 1) * pageSize // 返回表格序号
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
