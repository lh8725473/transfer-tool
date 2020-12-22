const pieOption = {
  title: {
    text: '',
    x: 'center',
    y: 'top',
    textStyle: {
      fontSize: 20
    }
  },
  legend: {
    orient: 'horizontal',
    top: 'bottom'
  },
  tooltip: {
    trigger: 'item'
  },
  series: [{
    type: 'pie',
    center: ['50%', '50%'],
    radius: ['50%', '75%'],
    avoidLabelOverlap: true,
    label: {
      formatter: '{b}: {d}%',
      position: 'outside'
    },
    data: [
    ]
  }]
}

const barOption = {
  title: {
    // text: '省氢能产量排行',
    // x: 'center',
    // y: 'top',
    // textStyle: {
    //   fontSize: 20
    // }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  legend: {
    orient: 'horizontal',
    // data: ['绿氢', '非绿氢'],
    left: '170px',
    top: '28px'
  },
  grid: {
    left: '5%',
    right: '3%',
    bottom: '0%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    // data: ['山西', '陕西', '四川', '湖北', '广西', '山东', '湖南', '北京', '上海', '江苏'],
    axisPointer: {
      type: 'shadow'
    },
    splitLine: {
      show: false
    }
  }],
  yAxis: [
    {
      type: 'value',
      name: 'X: 地区/ Y: 产量（万吨）',
      nameTextStyle: {
        color: '#666666'
      },
      splitLine: {
        show: false
      }
      // min: 0,
      // max: 250,
      // interval: 50,
      // axisLabel: {
      //   formatter: '{value} ml'
      // }
    }
  ],
  series: [
    // {
    //   name: '绿氢',
    //   type: 'bar',
    //   data: [100, 200, 300, 150, 90, 70, 40, 110, 130, 140]
    // },
    // {
    //   name: '非绿氢',
    //   type: 'bar',
    //   data: [120, 210, 330, 140, 50, 30, 80, 190, 90, 40]
    // }
  ]
}

export default {
  pieOption,
  barOption
}
