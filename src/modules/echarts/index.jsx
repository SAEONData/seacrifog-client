import React, { Component } from 'react'
import echarts from 'echarts'
// import shineTheme from './themes/shine'
import macaronsTheme from './themes/macarons'

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
    this.chart = echarts.init(this.ref.current, macaronsTheme)

    // Set the chart option
    this.option = await this.props.option

    // Apply chart option
    this.chart.setOption(this.option)
  }
  render() {
    return <div ref={this.ref} style={{ height: this.state.height }} />
  }
}
