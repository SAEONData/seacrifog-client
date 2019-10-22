import React, { Component } from 'react'
import echarts from 'echarts'

export default class extends Component {
  state = { height: 0 }
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.onEvents = this.props.onEvents || {}
    this.option = this.props.option
  }

  componentDidMount() {
    this.setState({ height: window.innerHeight - 200 + 'px' })
  }

  async componentDidUpdate() {
    this.chart = echarts.init(this.ref.current)

    // Apply chart option
    this.chart.setOption(this.option)

    // Register any event handlers
    Object.keys(this.onEvents).forEach(ev => {
      this.chart.on(ev, this.onEvents[ev])
    })
  }
  render() {
    return <div ref={this.ref} style={{ height: this.state.height }} />
  }
}
