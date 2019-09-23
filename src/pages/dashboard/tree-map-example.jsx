import React, { PureComponent } from 'react'
import EChart from '../../modules/echarts'

export default class extends PureComponent {
  state = {}
  async componentDidMount() {
    const rawData = await new Promise((resolve, reject) => {
      fetch('/chart2.json')
        .then(res => res.text())
        .then(txt => resolve(JSON.parse(txt)))
    })

    function convert(source, target, basePath) {
      for (var key in source) {
        var path = basePath ? basePath + '.' + key : key
        if (key.match(/^\$/)) {
        } else {
          target.children = target.children || []
          var child = {
            name: path
          }
          target.children.push(child)
          convert(source[key], child, path)
        }
      }

      if (!target.children) {
        target.value = source.$count || 1
      } else {
        target.children.push({
          name: basePath,
          value: source.$count
        })
      }
    }

    var data = []

    convert(rawData, data, '')

    const option = {
      title: {
        text: 'Drilldown example',
        subtext: '(I think this is eCharts docs)',
        left: 'leafDepth'
      },
      tooltip: {},
      series: [
        {
          name: 'option',
          type: 'treemap',
          visibleMin: 300,
          data: data.children,
          leafDepth: 2,
          levels: [
            {
              itemStyle: {
                normal: {
                  borderColor: '#555',
                  borderWidth: 4,
                  gapWidth: 4
                }
              }
            },
            {
              colorSaturation: [0.3, 0.6],
              itemStyle: {
                normal: {
                  borderColorSaturation: 0.7,
                  gapWidth: 2,
                  borderWidth: 2
                }
              }
            },
            {
              colorSaturation: [0.3, 0.5],
              itemStyle: {
                normal: {
                  borderColorSaturation: 0.6,
                  gapWidth: 1
                }
              }
            },
            {
              colorSaturation: [0.3, 0.5]
            }
          ]
        }
      ]
    }

    this.setState({ option })
  }
  render() {
    return this.state.option ? <EChart option={this.state.option} /> : 'Loading...'
  }
}
