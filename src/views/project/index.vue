<template>
  <div class="packetManage">
    <div class="seach-div">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline" size="mini">
        <el-form-item label="">
          <el-input v-model="searchParams.searchKey" placeholder="应用名称/网站地址" suffix-icon="el-icon-search" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table-div">
      <el-table

        :data="siteRecordList"
        style="width: 100%;height: 100%"
        @selection-change="handleSelectionChange"
        @expand-change="exChange"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table
              border
              :data="scope.row.pageRecordList"
              style="width: 100%;height: 100%"
            >
              <el-table-column
                label="页面标题"
              >
                <template slot-scope="pageScope">
                  <el-link type="primary" @click="showPageDetail(scope.row,pageScope.row)">{{ pageScope.row.pageTitle }}</el-link>
                </template>
              </el-table-column>
              <el-table-column
                label="URL"
                prop="url"
              />
              <el-table-column
                label="页面路径"
                prop="pathName"
              />
              <el-table-column
                label="使用插件数量"
                prop="pluginNum"
              />
              <el-table-column
                label="页面访问次数"
                prop="accessPageNum"
              />
              <el-table-column
                label="访问终端数"
                prop="deviceNum"
              />

            </el-table>

            <div class="pagination">
              <el-pagination
                background
                layout="total,prev, pager, next"
                :total="scope.row.total"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="50"
          align="center"
        />
        <el-table-column
          prop="siteId"
          label="编号"
        />
        <el-table-column
          prop="logo"
          label="应用图标"
        />

        <el-table-column
          prop="domain"
          label="应用名称"
        />
        <el-table-column
          prop="host"
          label="应用地址"
        />
        <el-table-column
          prop="pluginNum"
          label="使用插件个数"
        />
        <el-table-column
          prop="usePluginPageNum"
          label="使用插件网页个数"
        />

        <el-table-column
          prop="pageNum"
          label="页面总数"
        />

        <el-table-column
          prop="accessPageNum"
          label="访问总数"
        />

        <el-table-column
          prop="deviceNum"
          label="访问终端数"
        />

        <el-table-column
          prop="createTime"
          label="更新时间"
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
import adminService from '@/api/admin'
import sourceFileRecordService from '@/api/sourceFileRecord'
import { getProjectList } from '@/api/project'
import { getPageList } from '@/api/project'
import deviceService from '@/api/device'
import _ from 'lodash'
import qs from 'qs'
export default {
  name: 'SiteManage',
  data() {
    return {
      total: 0,
      siteRecordList: [],
      pageRecordList: [],
      searchParams: {
        page: 1,
        size: 10,
        searchKey: null,
        sortDefault: true,
        sortColumn: null
      },
      searchPageParams: {
        page: 1,
        size: 5,
        siteId: null
      }
    }
  },
  created() {
    this.getSiteRecordList()
  },
  methods: {

    getSiteRecordList() {
      getProjectList(this.searchParams)
        .then(res => {
          _.forEach(res.data, (page) => {
            page.pageRecordList = []
            page.total = 0
          })
          this.siteRecordList = res.data
          this.total = res.total
        })
    },

    onSubmit() {
      this.getSiteRecordList()
    },
    exChange(row, expandedRows) {
      if (expandedRows.length > 0) {
        this.searchPageParams.siteId = row.siteId
        getPageList(this.searchPageParams)
          .then(res => {
            row.pageRecordList = res.data
            row.total = res.total
          })
      } else {
        this.searchPageParams.siteId = null
        // this.pageRecordList = []
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    pageChange(page) {
      this.searchParams.page = page
      this.getSiteRecordList()
    },
    handleSizeChange() {
      this.searchParams.page = 1
      // this.searchParams.size = size
      this.getSiteRecordList()
    },

    pageChange2(page) {
      this.searchPageParams.page = page
      this.getPageRecordList()
    },
    handleSizeChange2() {
      this.searchPageParams.page = 1
      // this.searchParams.size = size
      this.getPageRecordList()
    },
    showPageDetail(siteInfo, pageInfo) {
      console.log(pageInfo)
      console.log(siteInfo)
      const params = qs.stringify({
        token: localStorage.getItem('token'),
        siteId: siteInfo.siteId,
        pageTitle: pageInfo.pageTitle,
        pathName: pageInfo.pathName,
        url: pageInfo.url
      })

      const routeData = this.$router.resolve({ path: '/pageDetail?' + params })
      window.open(routeData.href, '_blank')
    }

  }
}
</script>

<style lang='scss'>
.packetManage{
  height: 100%;
  padding: 20px 30px;
  height: 100%;

}
</style>
