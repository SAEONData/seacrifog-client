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
    const { series1, series2 } = this.props

    return (
      <EChart
        onEvents={{
          pieselectchanged: this.setSelectedSlice
        }}
        option={{
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} sites ({d}%)'
          },

          series: [
            {
              name: 'Networks',
              selectedMode: 'single',
              type: 'pie',
              radius: [0, '20%'],
              data: series1,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.2)'
                }
              }
            },

            {
              name: 'Variables',
              selectedMode: 'single',
              type: 'pie',
              radius: ['50%', '65%'],
              data: series2,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.2)'
                }
              }
            }
          ]
        }}
      />
    )
  }
}
