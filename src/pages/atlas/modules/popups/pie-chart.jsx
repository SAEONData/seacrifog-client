import React, { PureComponent } from 'react'
import EChart from '../../../../modules/echarts'

export default class extends PureComponent {
  state = Object.fromEntries(this.props.data.map(({ name }) => [name, null]))

  setSelectedSlice = event => {}

  getFilteredData = ({ dataset, name }) => dataset

  render() {
    const { data, deviceSize } = this.props
    const { getFilteredData } = this

    return (
      <EChart
        // onEvents={{
        //   pieselectchanged: this.setSelectedSlice
        // }}
        option={{
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} site(s) ({d}%)'
          },

          legend: {
            show: deviceSize.mobile ? false : true,
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
            roseType: 'area',
            minShowLabelAngle: 5,
            radius: [`${i * 40}%`, `${i * 40 + 10}%`],
            center: [deviceSize.mobile ? '50%' : '65%', '50%'],
            data: getFilteredData({ dataset, name }),
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
        }}
      />
    )
  }
}
