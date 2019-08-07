import React, { Component } from 'react'
import { NavigationDrawer } from 'react-md'
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import NavItemLink from './nav-item-link'

const navItems = [
  {
    exact: true,
    label: 'home',
    to: '/',
    icon: 'home'
  }
]

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = { toolbarTitle: this.getCurrentTitle(props) }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ toolbarTitle: this.getCurrentTitle(nextProps) })
  }

  getCurrentTitle({ location: { pathname } }) {
    return pathname.substring(pathname.lastIndexOf('/') + 1)
  }

  render() {
    const { toolbarTitle } = this.state
    const { location } = this.props
    return (
      <NavigationDrawer drawerTitle="SEACRIFOG" navItems={navItems}>
        <Switch key={location.pathname || '/home'}></Switch>
      </NavigationDrawer>
    )
  }
}

export default withRouter(Navigation)
