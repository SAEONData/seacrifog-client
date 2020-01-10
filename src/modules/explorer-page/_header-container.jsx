import React, { PureComponent } from 'react'

//A simple class that holds some basic state in place of its children.
export default class extends PureComponent {
  state = { collapsed: true, chartType: 'pie' }

  toggleCharts = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  setChartType = chartType => {
    this.setState({ chartType: chartType })
  }
  render() {
    return (
      <this.props.children
        collapsed={this.state.collapsed}
        toggleCharts={this.toggleCharts}
        chartType={this.state.chartType}
        setChartType={this.setChartType}
      />
    )
  }
}
