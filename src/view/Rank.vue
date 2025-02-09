<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { useDataStore } from '@/stores/useDataStore'
import { getCssVar } from 'quasar'
const { total_words, today_words, typing_records, average_wpm, average_accuracy, best_wpm } = useDataStore()

type EChartsOption = echarts.EChartsOption
type ECharts = echarts.ECharts

const main = ref<HTMLElement>()

// 表格
const columns = [
  {
    name: 'wpm',
    label: '打字速度 (wpm)',
    field: 'wpm',
    sortable: true,
    align: 'left'
  },

  {
    name: 'mode',
    label: '打字模式 (计时/限时)',
    field: 'mode',
    format: (val: any) => `${val === 'timed' ? '计时模式' : '限时模式'}`,
    sortable: true
  },
  { name: 'total_words', label: '键入词数 (个)', field: 'total_words', sortable: true },
  {
    name: 'accuracy',
    label: '正确率 (%)',
    field: 'accuracy',
    format: (val: any) => `${val}%`,
    sortable: true
  },
  {
    name: 'timestamp',
    label: '记录时间',
    field: (row: any) => row.timestamp,
    format: (val: any) => `${new Date(val).toLocaleString()}`,
    sortable: true
  }
]

/**
 * wpm折线图
 */
// 获取近 20 次打字的 WPM 数据
function getWpmData() {
  return typing_records
    .slice(-20) // 取最后 20 条记录
    .map((record) => ({
      name: new Intl.DateTimeFormat('zh-CN', {
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(record.timestamp)), // X 轴标签
      value: record.wpm, // Y 轴数据
      mode: record.mode === 'timed' ? '计时模式' : '限时模式'
    }))
}

const wpmChart = ref(null)
let myWpmChart: ECharts | null = null

/**
 * 饼状图
 */
const pieChart = ref(null)
let myPieChart: ECharts | null = null

// 统计两种模式的数量
function getModeData() {
  return [
    {
      name: '计时模式',
      value: typing_records.filter((record) => record.mode === 'timed').length
    },
    {
      name: '限时模式',
      value: typing_records.filter((record) => record.mode === 'fixed_time').length
    }
  ]
}

/**
 * 关系图和分布图
 */
const scatterChart = ref(null)
const barChart = ref(null)
let myScatterChart: ECharts | null = null
let myBarChart: ECharts | null = null

onMounted(() => {
  if (wpmChart.value) {
    myWpmChart = echarts.init(wpmChart.value)
    myPieChart = echarts.init(pieChart.value)
    myScatterChart = echarts.init(scatterChart.value)
    myBarChart = echarts.init(barChart.value)
    renderChart()
  }
})

// 渲染图表
const renderChart = () => {
  const wpmData = getWpmData()
  const color_active = getCssVar('active')
  const color_error = getCssVar('error')
  const color_text = getCssVar('text')
  const color_btn_text = getCssVar('btnText')
  // 折线图
  const option = {
    title: {
      text: 'WPM 变化图',
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const record = params[0].data
        return `${record.mode}</br>${record.value} WPM</br>${record.name}`
      }
    },
    xAxis: {
      type: 'category',
      data: wpmData.map((item) => item.name) // X 轴数据
    },
    yAxis: {
      type: 'value',
      data: wpmData.map((item) => item.value)
    },
    series: [
      {
        name: 'WPM',
        type: 'line',
        data: wpmData, // Y 轴数据
        lineStyle: {
          color: color_active
        },
        itemStyle: {
          color: color_text
        }
      }
    ]
  }

  // 饼状图
  const modeData = getModeData()
  const pieOption = {
    title: {
      text: '打字模式占比',
      left: 'center',
      bottom: 10
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} <br/>{c} 次，占比{d}%' // 提示框内容
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    color: [color_active, color_error],
    series: [
      {
        name: '打字模式',
        type: 'pie',
        radius: ['40%', '70%'], // 内外半径
        avoidLabelOverlap: false,
        padAngle: 5, // 扇形之间的间隔
        itemStyle: {
          borderRadius: 10 // 扇形圆角
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: modeData // 数据
      }
    ]
  }

  // 打字速度与正确率关系图
  const scatterData = typing_records.map((record) => [record.accuracy, record.wpm])
  const scatterOption = {
    title: {
      text: '打字速度与正确率关系图',
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const record = params[0].data
        return `正确率: ${record[0]}%<br>打字速度: ${record[1]} WPM`
      }
    },
    xAxis: {
      name: '正确率 (%)',
      type: 'value',
      min: 0,
      max: 100
    },
    yAxis: {
      name: '打字速度 (WPM)',
      type: 'value'
    },
    series: [
      {
        name: '打字记录',
        type: 'scatter',
        data: scatterData,
        itemStyle: {
          color: color_active
        }
      }
    ]
  }

  // 打字成绩分布图
  const wpmRanges = [
    { range: '0-20', min: 0, max: 20 },
    { range: '20-40', min: 20, max: 40 },
    { range: '40-60', min: 40, max: 60 },
    { range: '60-80', min: 60, max: 80 },
    { range: '80+', min: 80, max: Infinity }
  ]

  const barData = wpmRanges.map((range) => ({
    range: range.range,
    count: typing_records.filter((record) => record.wpm >= range.min && record.wpm < range.max).length
  }))

  const barOption = {
    title: {
      text: '打字成绩分布图',
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const range = params[0].name
        const count = params[0].value
        return `${range}: ${count} 次`
      }
    },
    xAxis: {
      type: 'category',
      data: barData.map((item) => item.range)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '打字成绩分布',
        type: 'bar',
        data: barData.map((item) => item.count),
        itemStyle: {
          color: color_active
        }
      }
    ]
  }

  if (myScatterChart) {
    myScatterChart.setOption(scatterOption)
  }

  if (myBarChart) {
    myBarChart.setOption(barOption)
  }

  if (myWpmChart) {
    myWpmChart.setOption(option)
  }

  if (myPieChart) {
    myPieChart.setOption(pieOption as any)
  }
}
</script>

<template>
  <div class="container q-pa-lg column">
    <div class="top row">
      <q-card class="card shadow-hover">
        <q-card-section class="column">
          <span class="title">{{ total_words }}<span class="unit">个</span></span>
          <span class="subtitle">总打字词数</span>
        </q-card-section>
      </q-card>
      <q-card class="card shadow-hover">
        <q-card-section class="column">
          <span class="title">{{ today_words }}<span class="unit">个</span></span>
          <span class="subtitle">今日打字词数</span>
        </q-card-section>
      </q-card>
      <q-card class="card shadow-hover">
        <q-card-section class="column">
          <span class="title">{{ average_wpm }}<span class="unit">WPM</span></span>
          <span class="subtitle">平均打字速度</span>
        </q-card-section>
      </q-card>
      <q-card class="card shadow-hover">
        <q-card-section class="column">
          <span class="title">{{ average_accuracy }}<span class="unit">%</span></span>
          <span class="subtitle">平均正确率</span>
        </q-card-section>
      </q-card>
      <q-card class="card shadow-hover">
        <q-card-section class="column">
          <span class="title">{{ best_wpm }}<span class="unit">WPM</span></span>
          <span class="subtitle">最佳记录</span>
        </q-card-section>
      </q-card>
    </div>
    <div class="row charts">
      <q-card class="wpm-card shadow-hover">
        <div ref="wpmChart" class="wpm-chart"></div>
      </q-card>
      <q-card class="wpm-card shadow-hover">
        <div ref="pieChart" class="wpm-chart"></div>
      </q-card>
    </div>
    <!-- 关系图和分布图 -->
    <div class="row charts">
      <q-card class="wpm-card shadow-hover">
        <div ref="scatterChart" class="wpm-chart"></div>
      </q-card>
      <q-card class="wpm-card shadow-hover">
        <div ref="barChart" class="wpm-chart"></div>
      </q-card>
    </div>

    <q-card class="table-card shadow-hover">
      <q-table
        :rows-per-page-options="[10, 20, 50, 0]"
        card-class="table"
        title="打字记录"
        :rows="typing_records"
        :columns="columns as any"
        row-key="name"
      />
    </q-card>
  </div>
</template>

<style lang="scss" scoped>
.container {
  gap: 10vh;

  .top {
    flex-wrap: nowrap;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;

    .card {
      min-width: 200px;
      width: 17vw;
      height: 150px;
      border-radius: 20px;

      background-color: $bg;
      color: $text;
      // background-color: $active;
      // color: $btnText;

      .column {
        justify-content: center;
        align-items: center;
        height: 100%;

        .title {
          font-size: 30px;
          font-weight: bold;
        }
        .subtitle {
          font-size: 14px;
        }
        .unit {
          font-size: 16px;
          margin-left: 10px;
        }
      }
    }
  }

  .table-card {
    align-items: flex-start;
    border-radius: 20px;
    width: 100%;

    .table {
      background-color: $bg;
      color: $text;
    }
  }

  .shadow-hover {
    transition: box-shadow 0.25s;
    box-shadow:
      0 3px 5px -1px rgba(0, 0, 0, 0.2),
      0 6px 10px rgba(0, 0, 0, 0.14),
      0 1px 18px rgba(0, 0, 0, 0.12);
    &:hover {
      box-shadow:
        0 6px 6px -3px rgba(0, 0, 0, 0.2),
        0 10px 14px 1px rgba(0, 0, 0, 0.14),
        0 4px 18px 3px rgba(0, 0, 0, 0.12);
    }
  }

  .charts {
    justify-content: space-between;

    .wpm-card {
      width: 47.5%;
      border-radius: 20px;
      background-color: $bg;
      color: $text;

      .wpm-chart {
        height: 400px;
      }
    }
  }
}
</style>
