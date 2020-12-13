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
import echarts from 'echarts'

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
      chart: null,
      colors: ['#5793f3', '#d14a61', '#675bba']
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
    initChart(radius, pieDataName, pieData) {
      this.chart = echarts.init(this.$el)
      var option = {
        color: this.colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          top: '10%',
          right: '20%'
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
            data: ['2020-02-24', '2020-02-25', '2020-02-26', '2020-02-27', '2020-02-28', '2020-02-29', '2020-03-01']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '因子1(%)',
            position: 'left',
            axisLine: {
              lineStyle: {
                color: this.colors[0]
              }
            },
            axisLabel: {
              formatter: '{value} '
            }
          },
          {
            type: 'value',
            name: '因子2(%)',
            position: 'right',
            axisLine: {
              lineStyle: {
                color: this.colors[1]
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
            name: '因子1',
            type: 'line',
            smooth: true,
            data: [124, 165, 61, 126, 142, 122, 132]
          },
          {
            name: '因子2',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: [132, 115, 148, 108, 126, 125, 149]
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
