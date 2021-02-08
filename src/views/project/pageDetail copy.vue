<template>
  <div class="pageDetail">
    <div class="pageTitle-url">
      <label>{{ pageInfo.pageTitle }}</label>
      <label>{{ pageInfo.url }}</label>
    </div>
    <div class="panel">
      <div class="panel-header">
        系统已安装插件({{ total }})
      </div>
      <div class="plugin-list">
        <el-tag
          v-for="item in pluginRecordList"
          :key="item.classId"
          :type="item.selected ? '' : 'info' "
          :effect="item.selected ? 'dark' : 'plain'"
          @click="changePlugin(item)"
        >
          {{ item.name }} ({{ item.pluginFunctionCount }})次
        </el-tag>
        <el-tag
          v-show="pluginRecordList.length < total "
          type="''"
          effect="plain"
          @click="getMore"
        >
          更多...
        </el-tag>
      </div>

      <div v-if="pluginRecordList.length>0" class="panel-content">
        <el-row class="plugin-detail">
          <el-row class="margin-bottom15">
            <el-col :span="8" class="text-overflow">
              <label>插件ID：</label>
              <span>{{ plugin.classId }}</span>
            </el-col>
            <el-col :span="8" class="text-overflow">
              <label>插件路径：</label>
              <span>{{ plugin.directory }}</span>
            </el-col>
            <el-col :span="8" class="text-overflow">
              <label>插件文件名：</label>
              <span>{{ plugin.fileName }}</span>
            </el-col>
          </el-row>
          <el-row class="margin-bottom15">
            <el-col :span="8" class="text-overflow">
              <label>插件大小：</label>
              <span>{{ plugin.fileSize }}</span>
            </el-col>
            <el-col :span="8" class="elColClass">
              <label>浏览插件属性ID：</label>
              <el-tooltip placement="top">
                <div slot="content" class="tooltipContent">{{ plugin.progId }}</div>
                <span class="text-overflow">{{ plugin.progId }}</span>
              </el-tooltip>
            </el-col>
            <el-col :span="8" class="text-overflow">
              <label>id：</label>
              <span>{{ plugin.id }}</span>
            </el-col>
          </el-row>
          <el-row class="margin-bottom15">
            <el-col :span="8" class="text-overflow">
              <label>插件类型ID：</label>
              <span>{{ plugin.typeLib }}</span>
            </el-col>
            <el-col :span="8" class="text-overflow">
              <label>插件版本：</label>
              <span>{{ plugin.version }}</span>
            </el-col>
            <el-col :span="8" class="text-overflow">
              <label>插件类型：</label>
              <span>{{ plugin.type }}</span>
            </el-col>
          </el-row>
          <el-row class="margin-bottom15">
            <el-col :span="8" class="text-overflow">
              <label>是否启用：</label>
              <span>{{ plugin.enabled }}</span>
            </el-col>
            <el-col :span="8" class="text-overflow">
              <label>插件阻止次数：</label>
              <span>{{ plugin.blockCount }}</span>
            </el-col>
            <el-col :span="8" class="text-overflow">
              <label>作者：</label>
              <span>{{ plugin.companyName }}</span>
            </el-col>
          </el-row>
          <el-row class="margin-bottom15">
            <el-col :span="24" @click="getMoreOuterHTML(false)">
              <label>调用代码：</label>
              <span v-show="!moreOuterHTML">{{ plugin.outerHTML.substring(0, 20) }}... <el-button type="text" size="medium" @click="getMoreOuterHTML(true)">展开<i class="el-icon-arrow-down el-icon--right" /></el-button></span>
              <span v-show="moreOuterHTML">{{ plugin.outerHTML }}<el-button type="text" size="medium" @click="getMoreOuterHTML(false)">收起<i class="el-icon-arrow-up el-icon--right" /></el-button></span>
            </el-col>
          </el-row>
        </el-row>
      </div>
      <div class="inUsefunctionList">
        <el-row>
          <label>调用API（{{ pluginFunctionInUseTotal }}）: </label>
          <el-tag
            v-for="(item,index) in inUsefunctionList"
            :key="index"
            type="info"
            effect="dark"
            size="medium"
          >
            {{ item.function_name }} (调用{{ item.count }}次)
          </el-tag>
          <el-button v-show="!morePluginFunction && inUsefunctionList.length < pluginFunctionInUseTotal" type="text" size="medium" @click="getMorePluginFunction(true)">展开<i class="el-icon-arrow-down el-icon--right" /></el-button>
          <el-button v-show="morePluginFunction" type="text" size="medium" @click="getMorePluginFunction(false)">收起<i class="el-icon-arrow-up el-icon--right" /></el-button>
        </el-row>
        <el-row>
          <label>未调用API（{{ pluginFunctionCount - pluginFunctionInUseTotal }}）:</label>
          <el-tag
            v-for="(item,index) in unUsefunctionList"
            :key="index"
            type="info"
            effect="dark"
            size="medium"
          >
            {{ item.function_name }} (调用{{ item.count }}次)
          </el-tag>
          <el-button v-show="!morePluginFunctionUnUse && pluginFunctionCount - pluginFunctionInUseTotal > 0" type="text" size="medium" @click="getMorePluginFunctionUnUse(true)">展开<i class="el-icon-arrow-down el-icon--right" /></el-button>
          <el-button v-show="morePluginFunctionUnUse" type="text" size="medium" @click="getMorePluginFunctionUnUse(false)">收起<i class="el-icon-arrow-up el-icon--right" /></el-button>
        </el-row>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        浏览器特有API({{ pageApiTotal }})
      </div>
      <div class="plugin-list">

        <!-- <label>引用API（{{ pageApiInUseTotal }}）: </label> -->
        <el-tag
          v-for="(item,index) in pageApiList"
          :key="index"
          :type="item.selected ? '' : 'info' "
          :effect="item.selected ? 'dark' : 'plain'"
          size="medium"
          @click="changePageApi(item)"
        >
          {{ item.name }} (出现{{ item.count }}次)
          <i v-show="item.selected" :class="{isDisable: pageApi.index <= 1}" class="el-icon-top" @click="APIRecordChange(pageApi.index - 1)" />
          <i v-show="item.selected" :class="{isDisable: pageApiNameTotal <= pageApi.index}" class="el-icon-bottom" @click="APIRecordChange(pageApi.index + 1)" />
        </el-tag>
        <el-button v-if="pageApiList.length <pageApiTotal" v-show="!morePageFunction" type="text" size="medium" @click="getMorePageFunction(true)">展开<i class="el-icon-arrow-down el-icon--right" /></el-button>
        <el-button v-show="morePageFunction" type="text" size="medium" @click="getMorePageFunction(false)">收起<i class="el-icon-arrow-up el-icon--right" /></el-button>
      </div>
      <div v-if="pageApiList.length>0" class="panel-content">
        <el-row class="plugin-detail">
          <el-row class="margin-bottom15">
            <el-col :span="8" class="text-overflow">
              <label>序号：</label>
              <span>{{ pageApi.index }}</span>
            </el-col>
            <el-col :span="8" class="text-overflow">
              <label>API名称：</label>
              <span>{{ pageApi.name }}</span>
            </el-col>
            <el-col :span="8" class="text-overflow">
              <label>标签：</label>
              <span>{{ pageApi.tag }}</span>
            </el-col>

          </el-row>
          <el-row class="margin-bottom15">
            <el-col :span="8" class="text-overflow">
              <label>id：</label>
              <span>{{ pageApi.id }}</span>
            </el-col>
            <el-col :span="8" class="text-overflow">
              <label>class：</label>
              <span>{{ pageApi.classAttribute }}</span>
            </el-col>

            <el-col :span="8" class="text-overflow">
              <label>行号(格式化后)：</label>
              <span>{{ pageApi.lineNumber }}</span>
            </el-col>

          </el-row>

          <el-row class="margin-bottom15">
            <el-col :span="24" class="elColClass">
              <label>来源文件：</label>
              <span>{{ pageApi.sourceFile }}</span>
            </el-col>
          </el-row>
          <el-row class="margin-bottom15">
            <el-col :span="24">
              <label>调用代码:</label>
              <!-- <span>
                <pre v-highlightjs="pageApi.code"><code class="javascript" />
              </pre></span> -->
              <!-- <span v-highlightjs v-html="queryCodeLight(pageApi.code,pageApi.name)" /> -->
              <span>
                <pre>
                    <code ref="pageApiCode" class="javascript">{{ pageApi.code }}

                    </code>
                </pre>
              </span>
            </el-col>
          </el-row>
          <el-row class="margin-bottom15">
            <el-col :span="16">
              <el-popover
                placement="right-start"
                width="800"
                trigger="click"
              >
                <!-- <span>
                  <pre v-highlightjs="pageApi.context"><code class="javascript" /></pre>
                </span> -->
                <div>
                  <div><span>代码片段</span></div>
                  <pre>
                      <code ref="pageApiCodeContext" class="javascript">{{ pageApi.context }}
                      </code>
                   </pre>
                  <!-- <span v-highlightjs v-html="queryCodeLight(pageApi.context,pageApi.name)" /> -->
                </div>
                <el-link slot="reference" type="primary" @click="showCodeContext">查看代码上下文>></el-link>
              </el-popover>
            </el-col>

            <el-col :span="8">

              <el-button type="text" @click="showFileContent(pageApi.functionId,'javascript')">查看全文</el-button>
              <el-dialog
                title="代码"
                :visible.sync="dialogVisible"
                width="700px"
                :before-close="closeDialog"
              >
                <!-- <span v-highlightjs v-html="fileContent" /> -->
                <el-pagination
                  background
                  :page-size="searchFileContentParams.size"
                  layout="total,prev, pager, next"
                  :total="fileContentTotal"
                  @current-change="(page) => fileContentPageChange(page)"
                />
                <span>
                  <pre>
                    <code ref="pageApiSourceCode" class="javascript">{{ fileContent }}
                    </code>
                </pre>
                </span>

              </el-dialog>
            </el-col>
          </el-row>
        </el-row>
      </div>

    </div>

  </div>
</template>
<script>
import { getProjectPluginByPage, getProjectPluginFunction, getProjectPageFunction, getPageBySiteId, getPluginById } from '@/api/project'
import { getProjectPluginFunctionCount, getPageApiRecord, getPageCSSRecord, getProjectPageCSS, getLocalFileContent } from '@/api/project'
import _ from 'lodash'

export default {
  name: 'PluginManage',
  data() {
    return {
      dialogVisible: false,
      moreOuterHTML: false,
      morePluginFunction: false,
      morePluginFunctionUnUse: false,

      morePageFunction: false,
      morePageCSS: false,

      total: 0,
      pluginFunctionInUseTotal: 0, // 插件调用api总数
      pluginFunctionunUseTotal: 0, // 插件未调用api总数
      pluginFunctionCount: 0,

      pageApiTotal: 0, // 页面api总数
      pageCSSTotal: 0, // 页面css总数

      pageApiNameTotal: 0, // 页面api引用总记录数
      pageCSSNameTotal: 0, // 页面CSS引用总记录数

      plugin: {
        outerHTML: ''
      }, // 插件详情
      pageApi: {}, // 页面api详情
      pageCSS: {}, // 页面CSS详情
      pageInfo: {}, // 页面详情

      pluginRecordList: [],
      inUsefunctionList: [],
      unUsefunctionList: [],

      pageApiList: [], // 页面特有api 调用列表
      pageCSSList: [], // 页面特有api 调用列表

      fileContent: '', // 原始文件记录
      fileContentTotal: 0, // 原始文件总行数
      searchParams: {
        page: 1,
        size: 2,
        siteId: null,
        pathName: null
      },
      searchPluginFunctionParams: { // 查询api调用未调用参数
        page: 1,
        size: 5,
        siteId: null,
        pathName: null,
        classid: '',
        type: 'inUse'
      },
      searchPluginFunctionUnUseParams: { // 查询api调用未调用参数
        page: 1,
        size: 5,
        siteId: null,
        pathName: null,
        classid: '',
        type: 'unUse'
      },
      searchPageApiRecordParams: {
        page: 1,
        size: 1,
        siteId: null,
        pathName: null,
        name: ''
      },
      searchPageCSSRecordParams: {
        page: 1,
        size: 1,
        siteId: null,
        pathName: null,
        name: ''
      },

      searchFileContentParams: {
        page: 1,
        size: 50,
        recordId: null,
        fileType: null
      }
    }
  },
  created() {
    this.searchParams.siteId = this.$route.query.siteId
    this.searchParams.pathName = this.$route.query.pathName

    this.searchPageApiRecordParams.siteId = this.$route.query.siteId
    this.searchPageApiRecordParams.pathName = this.$route.query.pathName

    this.searchPageCSSRecordParams.siteId = this.$route.query.siteId
    this.searchPageCSSRecordParams.pathName = this.$route.query.pathName

    this.searchPluginFunctionParams.siteId = this.$route.query.siteId
    this.searchPluginFunctionParams.pathName = this.$route.query.pathName

    this.searchPluginFunctionUnUseParams.siteId = this.$route.query.siteId
    this.searchPluginFunctionUnUseParams.pathName = this.$route.query.pathName

    this.getPageBySiteId()
    this.getPagePlugin()
    this.getPageApiList()
    this.getPageCSSList()
  },
  mounted() {
    // 开启代码高亮

    this.$nextTick(() => {
      hljs.initHighlightingOnLoad()
      hljs.initLineNumbersOnLoad()
    })
  },

  methods: {
    getPageBySiteId() {
      getPageBySiteId({ siteId: this.searchParams.siteId, pathName: this.searchParams.pathName })
        .then(res => {
          this.pageInfo = res
        })
    },
    changePlugin(row) {
      _.forEach(this.pluginRecordList, item => {
        item.selected = false
      })
      row.selected = true
      this.searchParams.classid = row.classId
      this.searchPluginFunctionParams.classid = row.classId
      this.searchPluginFunctionUnUseParams.classid = row.classId

      this.moreOuterHTML = false
      this.morePluginFunction = false
      this.morePluginFunctionUnUse = false

      this.searchPluginFunctionParams.size = 5
      // this.searchPluginFunctionUnUseParams.page = 1
      this.getPluginInfo() // 获取插件详细信息
      this.getProjectPluginFunctionCount() // 获取插件所有api个数
      getProjectPluginFunction(this.searchPluginFunctionParams) // 查询插件使用api记录
        .then(res2 => {
          if (res2 != null) {
            this.inUsefunctionList = res2.data
            this.unUsefunctionList = []

            this.pluginFunctionInUseTotal = res2.total
            this.pluginFunctionUnUseTotal = this.pluginFunctionCount - this.pluginFunctionInUseTotal
          }
        })
    },
    getPagePlugin() {
      getProjectPluginByPage(this.searchParams)
        .then(res => {
          this.total = res.total
          _.forEach(res.data, item => {
            item.selected = false
          })
          res.data[0].selected = true
          this.pluginRecordList = res.data
          if (this.pluginRecordList.length > 0) {
            this.searchParams.classid = this.pluginRecordList[0].classId
            this.searchPluginFunctionParams.classid = this.pluginRecordList[0].classId
            this.searchPluginFunctionUnUseParams.classid = this.pluginRecordList[0].classId

            this.getPluginInfo()
            this.getProjectPluginFunctionCount()
            getProjectPluginFunction(this.searchPluginFunctionParams)
              .then(res2 => {
                this.inUsefunctionList = res2.data
                this.pluginFunctionInUseTotal = res2.total
                this.pluginFunctionUnUseTotal = this.pluginFunctionCount - this.pluginFunctionInUseTotal
              })
          }
        })
    },
    getMore() {
      this.searchParams.page++
      getProjectPluginByPage(this.searchParams)
        .then(res => {
          _.forEach(res.data, item => {
            item.selected = false
            this.pluginRecordList.push(item)
          })
          this.total = res.total
        })
    },

    getMorePluginFunction(flag) {
      this.searchPluginFunctionParams.type = 'inUse'
      if (flag) {
        this.searchPluginFunctionParams.size = 999
      } else {
        this.searchPluginFunctionParams.size = 5
      }
      this.morePluginFunction = flag
      getProjectPluginFunction(this.searchPluginFunctionParams)
        .then(res => {
          this.inUsefunctionList = res.data
        })
    },

    getMorePluginFunctionUnUse(flag) {
      this.searchPluginFunctionUnUseParams.type = 'unUse'
      if (flag) {
        this.searchPluginFunctionUnUseParams.size = 999
        getProjectPluginFunction(this.searchPluginFunctionUnUseParams)
          .then(res => {
            this.unUsefunctionList = res.data
          })
      } else {
        this.unUsefunctionList = []
      }
      this.morePluginFunctionUnUse = flag
    },
    getPageApiList() {
      getProjectPageFunction(this.searchParams)
        .then(res => {
          _.forEach(res.data, item => {
            item.selected = false
          })

          this.pageApiList = res.data
          this.pageApiTotal = res.total
          if (this.pageApiList.length > 0) {
            this.pageApiList[0].selected = true
            this.getPageApiInfo() // 获取页面api详情信息
          }
        })
    },
    getPageCSSList() {
      getProjectPageCSS(this.searchParams)
        .then(res => {
          _.forEach(res.data, item => {
            item.selected = false
          })
          // res.data[0].selected = true
          this.pageCSSList = res.data
          this.pageCSSTotal = res.total
          if (this.pageCSSList.length > 0) {
            this.pageCSSList[0].selected = true
            this.getPageCSSInfo() // 获取页面CSS详情信息
          }
        })
    },

    getMorePageFunction(flag) {
      if (flag) {
        this.searchParams.size = 999
      } else {
        this.searchParams.size = 2
      }
      this.morePageFunction = flag
      let flag2 = false
      getProjectPageFunction(this.searchParams)
        .then(res => {
          _.forEach(res.data, item => {
            if (item.name === this.pageApi.name) {
              item.selected = true
              flag2 = true
            } else {
              item.selected = false
            }
          })

          this.pageApiList = res.data

          this.pageApiTotal = res.total
          if (!flag2) {
            this.pageApiList[0].selected = true
            this.getPageApiInfo()
          }
        })
    },

    getMorePageCSS(flag) {
      if (flag) {
        this.searchParams.size = 999
      } else {
        this.searchParams.size = 2
      }
      this.morePageCSS = flag
      let flag2 = false
      getProjectPageCSS(this.searchParams)
        .then(res => {
          _.forEach(res.data, item => {
            if (item.name === this.pageCSS.name) {
              item.selected = true
              flag2 = true
            } else {
              item.selected = false
            }
          })

          this.pageCSSList = res.data

          this.pageCSSTotal = res.total
          if (!flag2) {
            this.pageCSSList[0].selected = true
            this.getPageCSSInfo()
          }
        })
    },

    getPluginInfo() {
      getPluginById(this.searchParams)
        .then(res => {
          this.plugin = res
        })
    },
    showPluginFunctionUnUse() {
      this.searchParams.type = 'unUse'
      getProjectPluginFunction(this.searchParams)
        .then(res => {
          this.unUsefunctionList = res
        })
      // this.searchParams.type = 'inUse'
    },
    getProjectPluginFunctionCount() {
      getProjectPluginFunctionCount(this.searchParams)
        .then(res => {
          this.pluginFunctionCount = res.count
        })
    },
    getMoreOuterHTML(flag) {
      this.moreOuterHTML = flag
    },
    // 选择不同api
    changePageApi(row) {
      if (row.name !== this.pageApi.name) {
        this.searchPageApiRecordParams.page = 1
        _.forEach(this.pageApiList, item => {
          item.selected = false
        })
        row.selected = true
        this.searchPageApiRecordParams.name = row.name
        getPageApiRecord(this.searchPageApiRecordParams)
          .then(res => {
            this.pageApi = res.data[0]
            this.pageApi.index = 1
            this.pageApiNameTotal = res.total
          })
      }
    },

    // 选择不同CSS
    changePageCSS(row) {
      if (row.name !== this.pageCSS.name) {
        this.searchPageCSSRecordParams.page = 1

        _.forEach(this.pageCSSList, item => {
          item.selected = false
        })
        row.selected = true
        this.searchPageCSSRecordParams.name = row.name
        getPageCSSRecord(this.searchPageCSSRecordParams)
          .then(res => {
            this.pageCSS = res.data[0]
            this.pageCSS.index = 1
            this.pageCSSNameTotal = res.total
          })
      }
    },

    // 第一次加载时默认选中第一个api
    getPageApiInfo() {
      this.searchPageApiRecordParams.name = this.pageApiList[0].name
      getPageApiRecord(this.searchPageApiRecordParams)
        .then(res => {
          this.pageApi = res.data[0]
          this.pageApi.index = 1
          this.pageApiNameTotal = res.total
          // this.pageApi.code = '>>>>>>1a\nb2<<<<<<'// this.pageApi.code.split('\n').join('\n')
          // this.pageApi.context = this.pageApi.context  // .split('\\n').join('\n') // ['function a(){', "alert('111111')}"].join('\n')
          this.$nextTick(() => {
            hljs.highlightBlock(this.$refs.pageApiCode)
            hljs.lineNumbersBlock(this.$refs.pageApiCode, {
              startFrom: this.pageApi.lineNumber
            })
          })
        })
    },
    showCodeContext() {
      this.$nextTick(() => {
        hljs.highlightBlock(this.$refs.pageApiCodeContext)
        hljs.lineNumbersBlock(this.$refs.pageApiCodeContext, {
          startFrom: this.pageApi.lineNumber - 10
        })
      })
    },

    // 第一次加载时默认选中第一个CSS
    getPageCSSInfo() {
      this.searchPageCSSRecordParams.name = this.pageCSSList[0].name
      getPageCSSRecord(this.searchPageCSSRecordParams)
        .then(res => {
          this.pageCSS = res.data[0]
          this.pageCSS.index = 1
          this.pageCSSNameTotal = res.total
        })
    },
    // page api
    pageChange(page) {
      this.searchPageApiRecordParams.page = page
      getPageApiRecord(this.searchPageApiRecordParams)
        .then(res => {
          this.pageApi = res.data[0]
          this.pageApiNameTotal = res.total
        })
    },

    APIRecordChange(index) {
      if (this.pageApiNameTotal < index) {
        return
      }
      // const oldIndex = this.pageApi.index
      this.searchPageApiRecordParams.page = index
      getPageApiRecord(this.searchPageApiRecordParams)
        .then(res => {
          this.pageApi = res.data[0]
          this.pageApi.index = index
          this.pageApiNameTotal = res.total
        })
    },

    // page css
    pageChangeCSS(page) {
      this.searchPageCSSRecordParams.page = page
      getPageCSSRecord(this.searchPageCSSRecordParams)
        .then(res => {
          this.pageCSS = res.data[0]
          this.pageCSS.index = 1
          this.pageCSSNameTotal = res.total
        })
    },

    CSSRecordChange(index) {
      if (this.pageCSSNameTotal < this.index) {
        return
      }

      this.searchPageCSSRecordParams.page = index
      getPageCSSRecord(this.searchPageCSSRecordParams)
        .then(res => {
          this.pageCSS = res.data[0]
          this.pageCSS.index = index
          this.pageCSSNameTotal = res.total
        })
    },
    queryCodeLight(code, queryName) {
      try {
        const strReturn = code.replace(new RegExp(queryName, 'g'), `<span style="background:#faee38;color:black">` + queryName + `</span>`)
        return strReturn
      } catch {
        return code
      }
    },

    // 打开dialog
    showFileContent(recordid, fileType) {
      this.dialogVisible = true
      this.searchFileContentParams.recordId = recordid
      this.searchFileContentParams.fileType = fileType
      getLocalFileContent(this.searchFileContentParams)
        .then(res => {
          const startLine = ((this.searchFileContentParams.page - 1) * this.searchFileContentParams.size) + 1
          this.fileContentTotal = res.total
          this.fileContent = res.data.join('\n').replace('<', '&lt;').replace('/>', '/&gt;')
          this.$nextTick(() => {
            this.$refs.pageApiSourceCode.innerHTML = this.fileContent
            hljs.highlightBlock(this.$refs.pageApiSourceCode)
            hljs.lineNumbersBlock(this.$refs.pageApiSourceCode, {
              startFrom: startLine
            })
          })
        })
    },
    // 关闭dialog
    closeDialog() {
      this.dialogVisible = false
      this.searchFileContentParams.page = 1
      this.searchFileContentParams.fileType = ''
      this.fileContent = ''
      this.fileContentTotal = 0
    },
    // 翻页
    fileContentPageChange(page) {
      this.searchFileContentParams.page = page
      this.showFileContent(this.searchFileContentParams.recordId, this.searchFileContentParams.fileType)
    },

    // 导出原始文件

    exportSourceCode(recordId, fileType) {
      // const params = qs.stringify({
      //   token: ,

      // })
      // console.log(this.searchFileContentParams)

      window.open(process.env.VUE_APP_BASE_API + '/project/downloadSourceCode?token=' + localStorage.getItem('token') + '&recordId=' + recordId + '&fileType=' + fileType, '_blank')
    }

  }

}
</script>

<style lang='scss'>
.tooltipContent{
    width: 300px;
  }

.pageDetail{
  height: 100%;
  padding: 20px 30px;
  .pageTitle-url{
    background: #ecf1f8;
    padding: 15px;
    margin-bottom: 20px;
  }
  .plugin-detail{
    padding: 15px 0;
  }
  .panel{
    margin-bottom: 20px;
    background: #FFFFFF;
    border: 1px solid #E9E9E9;
    border-radius: 2px;
    padding: 20px 30px;
    .panel-header{
      &::before{
        content: '';
        width: 3px;
        background-color: #558AD9;
        display: inline-block;
        height: 16px;
        position: relative;
        top: 2px;
        margin-right: 8px;
      }
      font-size: 16px;
      color: #333333;
      margin: 0 -30px;
      padding: 0 30px;
      border-bottom: 1px solid #E5E7EE;
      padding-bottom: 20px;
    }
    .plugin-list{
      background: #ecf1f8;
      margin: 0 -30px;
      padding: 10px 30px;
      padding-bottom: 0;
      .el-tag{
        cursor: pointer;
        margin-right: 10px;
        margin-bottom: 10px;
        &.el-tag--dark{
          box-shadow: 0px 2px 5px 0px rgba(54, 128, 249, 0.43);
        }
      }
    }
    .panel-content{
      label{
        font-weight: bold;
        color: #666666;
        font-size: 14px;
      }
      span{
        font-size: 14px;
        flex:1;
        display: inline-block;
      }

    }
  }
  .margin-bottom15{
    margin-bottom: 15px;
  }
  .elColClass{
    display: flex;
  }
  .plugin-row{
    background: #FFFFFF;
    border: 1px solid #E9E9E9;
    border-radius: 2px;
    margin-bottom: 10px;
    background-color: #DCDFE6;
  }
  .functionList{
    .el-tag{
      margin-right: 8px;
      margin-bottom: 5px;
    }
  }
  .page-api-recordList{
    .page-api-recordList-inUse{
      margin-top: 10px;
      margin-bottom: 10px;
      .el-tag{
        margin-right: 8px;
        margin-bottom: 5px;
      }
    }
    .page-api-recordList-unUse{
      .el-tag{
        margin-right: 8px;
        margin-bottom: 5px;
      }
    }
  }
  .el-tag--dark.el-tag--info{
    background-color: #ebf2fe;
    border-color: #ebf2fe;
    color: #333333;
    margin-right: 8px;
  }

  .inUsefunctionList{
    label{
      font-weight: bold;
      color: #666666;
      font-size: 14px;
    }
     .el-row{
       margin-top: 20px;
    }
  }
  .page-api-recordList-inUse{
    label{
      font-weight: bold;
      color: #666666;
      font-size: 14px;
    }
  }
  .page-api-recordList-unUse{
    label{
      font-weight: bold;
      color: #666666;
      font-size: 14px;
    }
  }
  .isDisable{
    color: #c0c4cc;
    cursor: not-allowed;
  }
   .isDisableCSS{
    color: #c0c4cc;
    cursor: not-allowed;
  }

}
</style>
