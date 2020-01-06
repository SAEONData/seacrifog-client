import React, { PureComponent } from 'react'

//A simple class that holds some basic state in place of its children.
export default class HeaderCharts extends PureComponent {
  state = { collapsed: true }

  componentWillMount() {
    this.setState({
      collapsed: true
    })
  }
  toggleCharts = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    return <this.props.children collapsed={this.state.collapsed} toggleCharts={this.toggleCharts} />
  }
}
