import React, { Component } from 'react'
import { NavigationDrawer } from 'react-md'
import { withRouter } from 'react-router'
import { Switch } from 'react-router-dom'
import NavItemLink from './nav-item-link'

const buildNavItemLinks = (navItems, parent = false) =>
  navItems.map(route => (
    <NavItemLink
      key={'route-' + route.label}
      nestedItems={
        route.nestedItems && route.nestedItems.length > 0
          ? buildNavItemLinks(route.nestedItems, true)
          : null
      }
      hasParent={parent}
      label={route.label}
      to={route.to}
      icon={route.icon}
      exact
    />
  ))

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = { toolbarTitle: this.getCurrentTitle(props) }
    this.navItems = props.navItems
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ toolbarTitle: this.getCurrentTitle(nextProps) })
  }

  getCurrentTitle({ location: { pathname } }) {
    return pathname.substring(pathname.lastIndexOf('/') + 1)
  }

  render() {
    const { toolbarTitle } = this.state
    const { location, navItems } = this.props
    return (
      <NavigationDrawer
        drawerTitle="SEACRIFOG"
        navItems={buildNavItemLinks(navItems)}
        toolbarTitle={toolbarTitle || 'Home'}
      >
        <Switch key={location.pathname || '/home'}>
          {this.props.children}
        </Switch>
      </NavigationDrawer>
    )
  }
}

export default withRouter(Navigation)
