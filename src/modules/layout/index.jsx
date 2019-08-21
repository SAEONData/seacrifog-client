import React, { Component } from 'react'
import { NavigationDrawer, Divider } from 'react-md'
import { withRouter } from 'react-router'
import { Switch } from 'react-router-dom'
import NavItemLink from './nav-item-link'

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
        navStyle={{ padding: 0 }}
        miniNavStyle={{ padding: 0 }}
        navItems={navItems.map(navItem =>
          navItem.divider ? (
            <Divider key={navItem.key} style={navItem.style || {}} />
          ) : (
            <NavItemLink
              key={'route-' + navItem.label}
              label={navItem.label}
              to={navItem.to}
              icon={navItem.icon}
              exact
            />
          )
        )}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        toolbarTitle={toolbarTitle || 'Dashboard'}
        defaultVisible={true}
      >
        <Switch key={location.pathname || '/'}>{this.props.children}</Switch>
      </NavigationDrawer>
    )
  }
}

export default withRouter(Navigation)
