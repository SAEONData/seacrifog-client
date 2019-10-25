import React, { PureComponent } from 'react'
import ECharts from 'echarts-for-react'

export default class extends PureComponent {
  state = {}
  constructor(props) {
    super(props)

    // State contains information on what has been clicked
    this.state.filters = this.props.sets.map(name => '')
  }

  onPieSelectChange = e => {
    const filters = [...this.state.filters]
    const i = this.props.sets.indexOf(e.seriesId)
    const selectedName = e.name && e.selected[e.name] ? e.name : ''
    filters[i] = selectedName
    this.setState({ filters })
  }

  filterDataset = i => {
    const filters = this.state.filters
    const set1Filter = filters[0]
    const set2Filter = filters[1]

    const x = [{}, {}]
    for (const set of this.props.data) {
      for (const item1 of set.networks) {
        if (item1.acronym.indexOf(set1Filter) >= 0) {
          if (!x[0][item1.acronym]) x[0][item1.acronym] = new Set()
          x[0][item1.acronym].add(set.id)

          let foundItem2 = false
          for (const item2 of item1.variables) {
            if (item2.name.indexOf(set2Filter) >= 0) {
              if (!x[1][item2.name]) x[1][item2.name] = new Set()
              x[1][item2.name].add(set.id)
              foundItem2 = true
            }
          }

          if (!foundItem2) x[0][item1.acronym].delete(set.id)
        }
      }
    }

    return Object.entries(x[i])
      .map(([name, set]) => ({ name, value: set.size, selected: name === filters[i] ? true : false }))
      .filter(({ value }) => value > 0)
      .sort((a, b) => (a.value >= b.value ? -1 : 1))
  }

  setOption = ({ deviceSize }) => {
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

      series: this.props.sets.map((set, i) => ({
        id: set,
        name: set,
        selectedMode: 'single',
        selectedOffset: 0,
        type: 'pie',
        roseType: 'area',
        minShowLabelAngle: 5,
        radius: [`${i * 40}%`, `${i * 40 + 10}%`],
        center: [deviceSize.mobile ? '50%' : '65%', '50%'],
        data: this.filterDataset(i),
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
        lazyUpdate={false}
        theme={this.props.theme || ''}
        onEvents={{
          pieselectchanged: this.onPieSelectChange
        }}
        option={this.setOption(this.props)}
      />
    )
  }
}
