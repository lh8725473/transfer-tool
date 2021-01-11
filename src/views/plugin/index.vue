<template>
  <div class="pluginManage">
    <div class="seach-div">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline" size="mini">
        <el-form-item label="">
          <el-input v-model="searchParams.searchKey" placeholder="插件名称" suffix-icon="el-icon-search" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="browser-search">
      <label>浏览器类型：</label>
      <div class="browser-list">
        <div class="all-browser" :class="{'actived': searchParams.bvId === ''}" @click="changebrowser('')">
          <div>全部</div>
        </div>
        <div v-for="browserVersion in browserVersionList" :class="{'actived': searchParams.bvId === browserVersion.bv_id}" @click="changebrowser(browserVersion.bv_id)" :key="browserVersion.bv_id" class="browser-item">
          <el-image
            style="width: 30px; height: 30px"
            :src="browserVersion.logo"
            fit="fill"
          />
          <div class="text-overflow" :title="browserVersion.browser_alias + browserVersion.version">{{ browserVersion.browser_alias }} {{ browserVersion.version }}</div>
        </div>
      </div>
    </div>

    <div class="table-div">
      <el-table
        border
        :data="pluginRecordList"
        highlight-current-row
        style="width: 100%;height: 100%"
        @selection-change="handleSelectionChange"
      >

        <el-table-column
          type="selection"
          width="50"
          align="center"
        />
        <el-table-column
          width="360"
          label="编号"
        >
          <template slot-scope="pluginScope">
            <el-link type="primary" @click="showPluginDetail(pluginScope.row)">{{ pluginScope.row.classId }}</el-link>
          </template>

        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="插件名称"
        />

        <el-table-column
          prop="siteCount"
          align="center"
          label="使用插件应用数"
        />
        <el-table-column
          prop="deviceCount"
          align="center"
          label="使用插件终端数"
        />
        <el-table-column
          prop="fileName"
          align="center"
          label="插件类型"
        />
        <el-table-column
          prop="version"
          align="center"
          label="插件版本"
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

import pluginService from '@/api/plugin'
import browserService from '@/api/browser'
import _ from 'lodash'
import qs from 'qs'
export default {
  name: 'PluginManage',
  data() {
    return {
      total: 0,
      browserTotal: 0,
      pluginRecordList: [],
      browserVersionList: [],
      pageRecordList: [],
      searchParamsBrowser: {
        page: 1,
        size: 10
      },
      searchParams: {
        page: 1,
        size: 10,
        searchKey: null,
        sortDefault: true,
        sortColumn: null,
        bvId: ''
      }
    }
  },
  created() {
    this.getBrowserVersion()
    this.getPluginRecordList()
  },
  methods: {
    changebrowser(bvId) {
      this.searchParams.page = 1
      this.searchParams.bvId = bvId
      this.getPluginRecordList()
    },
    getBrowserVersion() {
      browserService.getBrowserVersion(this.searchParamsBrowser)
        .then(res => {
          this.browserVersionList = res.data
          this.browserTotal = res.total
        })
    },
    getPluginRecordList() {
      pluginService.getAllPlugin(this.searchParams)
        .then(res => {
          this.pluginRecordList = res.data
          this.total = res.total
        })
    },

    onSubmit() {
      this.getPluginRecordList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    pageChange(page) {
      this.searchParams.page = page
      this.getPluginRecordList()
    },
    handleSizeChange() {
      this.searchParams.page = 1
      // this.searchParams.size = size
      this.getPluginRecordList()
    },
    showPluginDetail(pluginInfo) {
      const params = qs.stringify({
        token: localStorage.getItem('token'),
        classid: pluginInfo.classId,
        version: pluginInfo.version
      })
      // window.open(process.env.VUE_APP_BASE_API + '/pluginDetail?' + params, '_blank')

      const routeData = this.$router.resolve({ path: '/pluginDetail?' + params })
      window.open(routeData.href, '_blank')
    }

  }
}
</script>

<style lang='scss'>
.pluginManage{
  height: 100%;
  padding: 20px 30px;
  height: 100%;
  .browser-search{
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .browser-list{
    display: flex;
    text-align: center;
    .all-browser{
      display: flex;
      align-items: center;
      margin-right: 15px;
      cursor: pointer;
      &.actived{
        color: #409EFF;
      }
      &:hover{
        color: #409EFF;
      }
    }
    .browser-item{
      cursor: pointer;
      margin-right: 15px;
      max-width: 100px;
      &.actived{
        color: #409EFF;
      }
      &:hover{
        color: #409EFF;
      }
    }
  }

}
</style>
