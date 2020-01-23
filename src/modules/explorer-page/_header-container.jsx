import React, { PureComponent, Component } from 'react'

//A simple class that holds some basic state in place of its children.
export default class extends Component {
  state = { collapsed: true }

  toggleCharts = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  componentDidMount() {
    console.log('headerContainer mounted')
  }
  componentDidUpdate() {
    console.log('headerContainer updated')
  }
  render() {
    // console.log('RENDERING HEADER CONTAINER')
    return <this.props.children collapsed={this.state.collapsed} toggleCharts={this.toggleCharts} />
  }
}
