import React, { Component } from 'react'
import echarts from 'echarts'

// eslint-disable-next-line no-unused-vars
import echartsgl from 'echarts-gl' // This sets up a global GL environment or something

export default class extends Component {
  state = { height: 0 }
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  componentDidMount() {
    this.setState({ height: window.innerHeight - 200 + 'px' })
  }

  async componentDidUpdate() {
    this.chart = echarts.init(this.ref.current)

    // Set the chart option
    this.option = await this.props.option

    // Apply chart option
    this.chart.setOption(this.option)
  }
  render() {
    return <div ref={this.ref} style={{ height: this.state.height }} />
  }
}
