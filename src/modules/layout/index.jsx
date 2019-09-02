import React, { Component } from 'react'
import { NavigationDrawer } from 'react-md'
import { withRouter } from 'react-router'
import { Switch } from 'react-router-dom'
import NavItemLink from './nav-item-link'

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function(string) {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = { currentPath: this.getCurrentPath(props) }
    this.navItems = props.navItems
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentPath: this.getCurrentPath(nextProps) })
  }

  getCurrentPath({ location: { pathname } }) {
    return pathname.substring(pathname.lastIndexOf('/') + 1)
  }

  render() {
    const { currentPath } = this.state
    const { location, navItems } = this.props
    const hideMenu = ['', '/', 'HOME', 'ABOUT', 'ABOUT/', 'CONTACT', 'CONTACT/'].includes(currentPath.toUpperCase())
    console.log('hide menu?', hideMenu)
    return (
      <NavigationDrawer
        drawerTitle="SEACRIFOG"
        navStyle={{ padding: 0 }}
        miniNavStyle={{ padding: 0 }}
        navItems={navItems.map(({ divider, subheader, ...navItem }) =>
          divider || subheader ? { divider, subheader, ...navItem } : <NavItemLink key={'route-' + navItem.keyval} {...navItem} />
        )}
        toolbarZDepth={0}
        drawerZDepth={1}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        toolbarTitle={currentPath.capitalize() || 'Home'}
        defaultVisible={NavigationDrawer.getCurrentMedia().desktop && !hideMenu ? true : false}
      >
        <Switch key={location.pathname || '/'}>{this.props.children}</Switch>
      </NavigationDrawer>
    )
  }
}

export default withRouter(Navigation)
