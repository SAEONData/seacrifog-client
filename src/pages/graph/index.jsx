import React, { Component } from 'react'
import { Grid, Cell } from 'react-md'
import echarts from 'echarts'

class Chart extends Component {
  state = { height: 600 }
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.data = null
  }
  async componentDidUpdate() {
    const { innerWidth: width, innerHeight: height } = window
    this.state.height = height
    if (!this.data)
      this.data = await new Promise((resolve, reject) =>
        fetch('http://localhost:3001/chart.json')
          .then(result => result.text())
          .then(text => resolve(JSON.parse(text)))
          .catch(err => reject(err))
      )
    this.chart = echarts.init(this.ref.current)
    // specify chart configuration item and data
    const option = {
      legend: {
        data: ['HTMLElement', 'WebGL', 'SVG', 'CSS', 'Other']
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          animation: false,
          label: {
            normal: {
              position: 'right',
              formatter: '{b}'
            }
          },
          draggable: true,
          data: this.data.nodes.map(function(node, idx) {
            node.id = idx
            return node
          }),
          categories: this.data.categories,
          force: {
            // initLayout: 'circular',
            // repulsion: 20,
            edgeLength: 50,
            repulsion: 40,
            gravity: 0.1
          },
          edges: this.data.links
        }
      ]
    }
    this.chart.setOption(option)
  }
  render() {
    return <div ref={this.ref} style={{ height: 700 }} />
  }
}

export default () => (
  <Grid>
    <Cell phoneSize={6} tabletSize={8} size={12}>
      <Chart />
    </Cell>
  </Grid>
)
