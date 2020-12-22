<!--
 * @Description:
 * @version:
 * @Author: whimzhu
 * @Date: 2020-12-05 15:41:50
 * @LastEditors: whimzhu
 * @LastEditTime: 2020-12-05 16:35:49
-->
<template>
  <div
    :class="className"
    :style="{width: width, height: height}"
  />
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }

  },
  data() {
    return {
      chart: null
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart(dateTime, yData1, yData2) {
      this.chart = window.echarts.init(this.$el, 'hybigdata')
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          top: '8%',
          right: '5%',
          left: '5%'
        },
        toolbox: {
          feature: {
            dataView: { show: false, readOnly: false },
            restore: { show: false },
            saveAsImage: { show: false }
          }
        },
        legend: {
          data: ['item1', 'item2', 'item3'],
          bottom: 0
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: dateTime
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '接入设备数',
            nameTextStyle: {
              color: '#666666'
            },
            position: 'left',
            axisLine: {
              lineStyle: {
              }
            },
            axisLabel: {
              formatter: '{value} '
            }
          },
          {
            type: 'value',
            name: '访问网站次数',
            nameTextStyle: {
              color: '#666666'
            },
            position: 'right',
            axisLine: {
              lineStyle: {
              }
            },
            axisLabel: {
              formatter: '{value} '
            }
          }
          // {
          //   type: 'value',
          //   name: '因子3(%)',
          //   position: 'right',
          //   offset: 90,
          //   axisLine: {
          //     lineStyle: {
          //       color: this.colors[2]
          //     }
          //   },
          //   axisLabel: {
          //     formatter: '{value} '
          //   }
          // }
        ],
        series: [
          {
            name: '接入设备数',
            type: 'line',
            smooth: true,
            data: yData1
          },
          {
            name: '访问网站次数',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: yData2
          }
          // {
          //   name: '因子3',
          //   type: 'line',
          //   smooth: true,
          //   yAxisIndex: 2,
          //   data: [158, 118, 99, 123, 117, 122, 125]
          // }
        ]
      }
      this.chart.setOption(option)
    }
  }
}
</script>
