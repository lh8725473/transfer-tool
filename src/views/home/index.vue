<!--
 * @Description:
 * @version:
 * @Author: whimzhu
 * @Date: 2020-12-05 14:15:33
 * @LastEditors: whimzhu
 * @LastEditTime: 2020-12-07 09:51:02
-->
<template>
  <div id="home-wrap">
    <div class="home-main-wrap">
      <div class="home-main-items">
        <!-- <div class="home-main-item date">
          <div class="icon" />
          <div class="infos-wrap">
            <div class="num">10:21</div>
            <div class="text">2020-11-23</div>
          </div>
        </div> -->
        <div class="home-main-item">
          <div class="icon">
            <div class="icon-div">
              <div class="icon-box icon-box1">
                <svg-icon icon-class="shebei" />
              </div>
            </div>
          </div>
          <div class="infos-wrap">
            <div class="num">{{ countInfo.deviceCount }}</div>
            <div class="text">接入终端数量</div>
          </div>
        </div>
        <div class="home-main-item">
          <div class="icon">
            <div class="icon-div">
              <div class="icon-box icon-box2">
                <svg-icon icon-class="shuju" />
              </div>
            </div>
          </div>
          <div class="infos-wrap">
            <el-link type="primary" class="num" @click="resourceRecordLink">{{ countInfo.sourceFileCount }}</el-link>
            <div class="text">数据包数量</div>
          </div>
        </div>
        <div class="home-main-item">
          <div class="icon">
            <div class="icon-div">
              <div class="icon-box icon-box3">
                <svg-icon icon-class="wangzhan" />
              </div>
            </div>
          </div>
          <div class="infos-wrap">
            <el-link type="primary" class="num" @click="pageRecordLink">{{ countInfo.pageCount }}</el-link>
            <div class="text">网站访问次数</div>
          </div>
        </div>
      </div>
      <div class="home-main-echarts">
        <h2>服务器接收数据情况</h2>
        <home-chart
          ref="home-chart"
          width="100%"
          height="100%"
        />
      </div>
    </div>
    <div class="home-side-wrap">
      <div class="title">
        <h2>数据处理记录</h2>
        <el-select
          v-model="searchDate"
          placeholder="请选择范围"
          size="mini"
          @change="getSourceReocrd"
        >
          <el-option
            label="近15天"
            value="15"
          />
          <el-option
            label="近7天"
            value="7"
          />
          <el-option
            label="近3天"
            value="3"
          />
        </el-select>
      </div>
      <div class="con-wrap">
        <div v-for="record in sourceRecordList" :key="record.sfId" class="con">
          <div class="con-left">
            <div class="con-left-one">
              <div class="text-01">{{ record.fileName }}</div>
              <div class="text-02">{{ record.userName }}</div>
            </div>
            <div class="con-left-two">{{ record.createTime }}</div>
          </div>
          <div class="con-right">{{ record.status | fileRecordStatusFormat }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import homeService from '@/api/home'
import homeChart from '@/components/Echarts/HomeChart'
import sourceFileRecordService from '@/api/sourceFileRecord'
import dayjs from 'dayjs'
import _ from 'lodash'

export default {
  name: 'Home',
  components: {
    homeChart
  },
  data() {
    return {

      searchParams: {
        startTime: null,
        endTime: null
      },
      searchDate: '15',
      countInfo: {},
      sourceRecordList: []
    }
  },
  created() {
    this.getHomeCountInfo()
    this.getSourceReocrd()
  },
  mounted() {
    // 把你所需要数据赋值给data中的pieChart对象，过程省略，然后获取对象中的三个键值

    homeService.getChartInfo()
      .then(res => {
        const dateTime = []
        const yData1 = []
        const yData2 = []
        _.forEach(res, element => {
          dateTime.push(element.date_time)
          yData1.push(element.device_totalnum)
          yData2.push(element.page_totalnum)
        })

        // 数据渲染饼状图
        console.log(dateTime)
        console.log(yData1)
        console.log(yData2)
        this.$refs['home-chart'].initChart(dateTime, yData1, yData2)
      })
  },
  methods: {
    getHomeCountInfo() {
      homeService.getCountInfo()
        .then(res => {
          this.countInfo = res
        })
    },
    getSourceReocrd() {
      const now = dayjs()
      const startTime = now.subtract(this.searchDate, 'day')

      this.searchParams.startTime = dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
      this.searchParams.endTime = dayjs(now).format('YYYY-MM-DD HH:mm:ss')
      sourceFileRecordService.getSourceFileRecordList(this.searchParams)
        .then(res => {
          this.sourceRecordList = res.data
        })
    },
    pageRecordLink() {
      this.$router.push('/dataManage')
      this.loading = false
    },
    resourceRecordLink() {
      this.$router.push('/packetManage')
      this.loading = false
    }

  }

}
</script>

<style lang='scss'>
#home-wrap {
  width: 100%;
  flex: 1;
  display: flex;
  .home-main-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #f7f7f9;
    .home-main-items {
      flex: 1;
      display: flex;
      margin-bottom: 20px;
      .home-main-item {
        flex: 1;
        height: 172px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #edeef2;
        background-color: #fff;
        margin-left: 20px;
        border-radius: 5px;
        padding: 0 10px;
        &:first-child{
          margin-left: 0;
        }
        .icon {
          flex: 2;
          display: flex;
          justify-content: center;
          .icon-div{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            background: rgba(82, 181, 138, 0.1);
            box-shadow: 0px 2px 5px 0px rgba(67, 129, 230, 0.05);
            border-radius: 50%;
            .icon-box{
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 33px;
              color: #ffffff;
              width: 62px;
              height: 62px;
              border-radius: 50%;
            }
            .icon-box1{
              background: #558AD9;
            }
            .icon-box2{
              background: #52B58A;
            }
            .icon-box3{
              background: #A6606B;
            }
          }
        }
        .infos-wrap {
          flex: 3;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          .num {
            font-size: 32px;
          }
          .text {
            font-size: 14px;
          }
        }
        &.date {
          width: 220px;
          flex: none;
          margin-left: 0;
          background-color: #4978bc;
          border: 2px solid #4978bc;
          color: #fff;
          .num {
            font-size: 28px;
          }
        }
      }
    }
    .home-main-echarts {
      flex: 3;
      margin: 0 0 20px 0;
      padding: 10px 20px;
      background-color: #fff;
      border: 2px solid #edeef2;
      h2 {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        padding-left: 10px;
        position: relative;
        left: 0;
        &::before {
          content: '';
          width: 3px;
          height: 100%;
          background-color: #4978bc;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }
  .home-side-wrap {
    width: 350px;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0 0 0;
      h2 {
        height: 18px;
        line-height: 18px;
        font-size: 14px;
        padding-left: 10px;
        position: relative;
        left: 0;
        &::before {
          content: '';
          width: 3px;
          height: 100%;
          background-color: #4978bc;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
      .el-select {
        width: 140px;
      }
    }
    .con-wrap {
      flex: 1;
      overflow: auto;
      .con {
        display: flex;
        justify-content: space-between;
        padding: 10px 20px;
        background-color: #fafafc;
        border: 1px solid #edeff1;
        border-radius: 5px;
        margin-bottom: 10px;
        .con-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          .con-left-one {
            display: flex;
            .text-01 {
              flex: 1;
              height: 24px;
              line-height: 24px;
              font-size: 12px;
              font-weight: bold;
            }
            .text-02 {
              flex: 1;
              height: 24px;
              line-height: 24px;
              font-size: 12px;
              font-weight: bold;
            }
          }
          .con-left-two {
            height: 24px;
            line-height: 24px;
            font-size: 12px;
            color:#A3A3A3;
          }
        }
        .con-right {
          width: 80px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      }
    }
  }
}
</style>
