<template>
  <div class="packetManage">
    <div class="seach-div">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline" size="mini">
        <el-form-item label="">
          <el-input v-model="searchParams.searchKey" clearable placeholder="应用名称/网站地址" suffix-icon="el-icon-search" @change="onSubmit" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table-div">
      <el-table
        ref="exTable"
        :data="siteRecordList"
        row-key="siteId"
        :expand-row-keys="expandRowKeys"
        style="width: 100%;height: 100%"
        @selection-change="handleSelectionChange"
        @expand-change="exChange"
        @cell-click="cellClick"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table
              border
              header-row-class-name="child-header"
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
              >
                <template slot-scope="pageScope">
                  <el-link type="primary" @click="showHostDetail(pageScope.row.url)">{{ pageScope.row.url }}</el-link>
                </template>
              </el-table-column>

              <el-table-column
                label="页面路径"
                prop="pathName"
              />
              <el-table-column
                label="插件数量"
                prop="pluginNum"
              />
              <el-table-column
                prop="functionNum"
                label="特有API数"
              />
              <el-table-column
                label="访问次数"
                prop="accessPageNum"
              />
              <el-table-column
                label="终端数"
                prop="deviceNum"
              />

            </el-table>

            <div class="pagination">
              <el-pagination
                background
                :page-size="5"
                layout="total,prev, pager, next"
                :total="scope.row.total"
                @current-change="(page) => pageChange2(page, scope.row)"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="50"
          align="center"
        />
        <!-- <el-table-column
          prop="siteId"
          label="编号"
        /> -->
        <el-table-column

          label="应用图标"
        >
          <template slot-scope="scope">

            <el-image
              style="width: 60px; height: 50px"
              :src="scope.row.logo"
              fit="fill"
            />
          </template></el-table-column>

        <el-table-column
          prop="domain"
          label="应用名称"
        />
        <el-table-column
          prop="host"
          label="应用地址"
        >
          <template slot-scope="siteScope">
            <el-link type="primary" @click="showHostDetail(siteScope.row.protocol +'://'+siteScope.row.host)">{{ siteScope.row.host }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="pluginNum"
          label="插件个数"
        >
          <template slot="header" slot-scope="scope">
            <div class="sort-header" @click="changeSort(scope.column.property)">
              插件个数
              <span
                v-show="searchParams.sortColumn !== scope.column.property"
              >
                <i class="el-icon-bottom" />
              </span>
              <span
                v-show="searchParams.sortColumn === scope.column.property"
              >
                <i v-show="!searchParams.sortDefault" class="el-icon-top actived" />
                <i v-show="searchParams.sortDefault" class="el-icon-bottom actived" />
              </span>
            </div>
          </template>
          <template slot-scope="pageScope">
            <el-link type="primary" @click="goProjectPlugin(pageScope.row)">{{ pageScope.row.pluginNum }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="functionNum"
          label="特有API数"
        />

        <el-table-column
          prop="pageNum"
          label="页面总数"
        />

        <el-table-column
          prop="accessPageNum"
          label="访问总数"
        >
          <template slot="header" slot-scope="scope">
            <div class="sort-header" @click="changeSort(scope.column.property)">
              访问总数
              <span
                v-show="searchParams.sortColumn !== scope.column.property"
              >
                <i class="el-icon-bottom" />
              </span>
              <span
                v-show="searchParams.sortColumn === scope.column.property"
              >
                <i v-show="!searchParams.sortDefault" class="el-icon-top actived" />
                <i v-show="searchParams.sortDefault" class="el-icon-bottom actived" />
              </span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="deviceNum"
          label="终端数"
        >
          <template slot="header" slot-scope="scope">
            <div class="sort-header" @click="changeSort(scope.column.property)">
              终端数
              <span
                v-show="searchParams.sortColumn !== scope.column.property"
              >
                <i class="el-icon-bottom" />
              </span>
              <span
                v-show="searchParams.sortColumn === scope.column.property"
              >
                <i v-show="!searchParams.sortDefault" class="el-icon-top actived" />
                <i v-show="searchParams.sortDefault" class="el-icon-bottom actived" />
              </span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="createTime"
          label="导入时间"
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
      expandRowKeys: [],
      searchParams: {
        page: 1,
        size: 10,
        searchKey: null,
        sortDefault: true,
        sortColumn: 'deviceNum'
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
    cellClick(row, column, cell, event) {
      console.log(row)
      console.log(column)
      console.log(cell)
      console.log(event)
    },
    goProjectPlugin(row) {
      const params = qs.stringify({
        siteId: row.siteId,
        domain: row.domain
      })

      const routeData = this.$router.resolve({ path: '/projectPlugin?' + params })
      window.open(routeData.href, '_blank')
    },
    changeSort(prop) {
      if (this.searchParams.sortColumn === prop) {
        this.searchParams.sortDefault = !this.searchParams.sortDefault
      } else {
        this.searchParams.sortColumn = prop
        this.searchParams.sortDefault = true
      }
      this.searchParams.page = 1
      this.getSiteRecordList()
    },
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
        this.expandRowKeys = [row.siteId]
      } else {
        this.expandRowKeys = []
      }
      console.log('exChange')
      console.log(expandedRows)
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
      // _.forEach(expandedRows, expandedRow => {
      //   if (expandedRow.siteId !== row.siteId) {
      //     this.$refs.exTable.toggleRowExpansion(expandedRow, false)
      //   }
      // })
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

    pageChange2(page, row) {
      console.log(page)
      console.log(row)
      this.searchPageParams.page = page
      this.searchPageParams.siteId = row.siteId
      getPageList(this.searchPageParams)
        .then(res => {
          row.pageRecordList = res.data
          row.total = res.total
        })
    },
    handleSizeChange2() {
      this.searchPageParams.page = 1
      // this.searchParams.size = size
      this.getPageRecordList()
    },
    showPageDetail(siteInfo, pageInfo) {
      const params = qs.stringify({
        token: localStorage.getItem('token'),
        siteId: siteInfo.siteId,
        pathName: pageInfo.pathName
      })

      const routeData = this.$router.resolve({ path: '/pageDetail?' + params })
      window.open(routeData.href, '_blank')
    },

    showHostDetail(url) {
      window.open(url, '_blank')
    }

  }
}
</script>

<style lang='scss'>
.packetManage{
  height: 100%;
  padding: 20px 30px;
  background-color: #eef0f7;
  height: 100%;

}
.child-header th{
  background-color: #E5E7EE !important;
  font-weight: bold !important;
  color: #555555 !important;
}
.el-table th>.cell{
  font-weight: bold !important;
  color: #555555 !important;
}
.sort-header{
  cursor: pointer;
  .el-icon-top, .el-icon-bottom{
    &.actived{
      color: #3680F9;
    }
  }
}

</style>
