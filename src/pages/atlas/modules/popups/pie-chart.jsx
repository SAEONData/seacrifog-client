import React, { PureComponent } from 'react'
import EChart from '../../../../modules/echarts'
import { mergeLeft } from 'ramda'

export default class extends PureComponent {
  state = this.props.data.map(({ name }) => name).reduce((acc, curr) => mergeLeft(acc, { [curr]: null }), {})

  setSelectedSlice = event => {}

  getFilteredData = ({ dataset, name }) => dataset

  render() {
    const { data } = this.props
    const { getFilteredData } = this

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

          legend: {
            type: 'scroll',
            icon: 'circle',
            orient: 'vertical',
            x: 'left',
            data: data.map(data => data.dataset.map(({ name }) => ({ name }))).flat()
          },

          series: data.map(({ dataset, name }, i) => ({
            name: name,
            selectedMode: 'single',
            type: 'pie',
            minShowLabelAngle: 5,
            radius: [`${i * 40}%`, `${i * 40 + 10}%`],
            data: getFilteredData({ dataset, name }),
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.2)'
              }
            },
            labelLine: {
              show: true,
              smooth: true,
              lineStyle: {
                type: 'dotted',
                opacity: 0.5
              }
            },
            label: {
              show: true,
              align: 'right',
              fontWeight: 'lighter',
              fontSize: 11,
              fontFamily: 'monospace'
            },
            seriesLayoutBy: 'row'
          }))
        }}
      />
    )
  }
}
