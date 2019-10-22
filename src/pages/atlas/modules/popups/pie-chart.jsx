import React, { PureComponent } from 'react'
import ECharts from 'echarts-for-react'
import theme from './echarts-theme'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = Object.fromEntries(this.props.data.map(({ name }) => [name, {}]))
  }

  onPieSelectChange = e => {
    const seriesName = e.seriesId
    this.setState({ [seriesName]: e })
  }

  filterDataset = ({ dataset, name }) => {
    const selectFilter = this.state[name]
    // console.log(selectFilter, dataset)
    return dataset
  }

  setOption = ({ deviceSize, data }) => {
    const x = [{}, {}]
    const data1 = {}
    const data2 = {}
    for (const set of data) {
      for (const item1 of set.networks) {
        if (!data1[item1.acronym]) data1[item1.acronym] = new Set()
        data1[item1.acronym].add(set.id)
        for (const item2 of item1.variables) {
          if (!data2[item2.name]) data2[item2.name] = new Set()
          data2[item2.name].add(set.id)
        }
      }
    }

    const sets = [
      {
        name: 'Networks',
        dataset: Object.entries(data1)
          .map(([name, set]) => ({ name, value: set.size, selected: false }))
          .sort((a, b) => (a.value >= b.value ? -1 : 1))
      },
      {
        name: 'Variables',
        dataset: Object.entries(data2)
          .map(([name, set]) => ({ name, value: set.size, selected: false }))
          .sort((a, b) => (a.value >= b.value ? -1 : 1))
      }
    ]

    return {
      tooltip: {
        trigger: 'item',
        formatter: `{a}<br/>{b}<br />{c} ${this.props.a}`
      },

      legend: {
        show: deviceSize.mobile ? false : true,
        type: 'scroll',
        icon: 'circle',
        orient: 'vertical',
        x: 'left'
      },

      series: sets.map((set, i) => ({
        id: set.name,
        name: set.name,
        selectedMode: 'single',
        type: 'pie',
        roseType: 'area',
        minShowLabelAngle: 5,
        radius: [`${i * 40}%`, `${i * 40 + 10}%`],
        center: [deviceSize.mobile ? '50%' : '65%', '50%'],
        data: this.filterDataset(set),
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.2)'
          }
        },
        labelLine: {
          show: deviceSize.mobile ? false : true,
          smooth: true,
          lineStyle: {
            type: 'dotted',
            opacity: 0.5
          }
        },
        label: {
          show: deviceSize.mobile ? false : true,
          align: 'right',
          fontWeight: 'lighter',
          fontSize: 12,
          fontFamily: 'monospace'
        },
        seriesLayoutBy: 'row'
      }))
    }
  }

  render() {
    return (
      <ECharts
        style={{ height: '100%' }}
        notMerge={true}
        lazyUpdate={true}
        theme={theme}
        onEvents={{
          pieselectchanged: this.onPieSelectChange
        }}
        option={this.setOption(this.props)}
      />
    )
  }
}
