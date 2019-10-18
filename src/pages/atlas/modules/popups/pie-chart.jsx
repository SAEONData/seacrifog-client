import React, { PureComponent } from 'react'
import EChart from '../../../../modules/echarts'

export default class extends PureComponent {
  state = {
    selectedSlice: 'none'
  }

  setSelectedSlice = event => {
    const selected = event.selected
    console.log(event)
    let selectedSlice = 'none'
    Object.keys(selected).forEach(key => {
      if (selected[key]) selectedSlice = key
    })
    this.setState({ selectedSlice })
  }

  render() {
    const { data } = this.props

    const radii = {
      0: [0, '20%'],
      1: ['50%', '65%']
    }

    return (
      <EChart
        // onEvents={{
        //   pieselectchanged: this.setSelectedSlice
        // }}
        option={{
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} sites ({d}%)'
          },

          series: data.map((data, i) => ({
            name: 'series' + i,
            selectedMode: 'single',
            type: 'pie',
            radius: radii[i],
            data: data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.2)'
              }
            }
          }))
        }}
      />
    )
  }
}
