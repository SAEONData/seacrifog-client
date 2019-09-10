import React, { Component } from 'react'
import { NavigationDrawer } from 'react-md'
import { withRouter } from 'react-router'
import { Switch } from 'react-router-dom'
import NavItemLink from './nav-item-link'

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
    return (
      <NavigationDrawer
        drawerTitle="SEACRIFOG"
        navItems={navItems.map(({ divider, subheader, ...navItem }) =>
          divider || subheader ? { divider, subheader, ...navItem } : <NavItemLink key={'route-' + navItem.keyval} {...navItem} />
        )}
        toolbarZDepth={0}
        drawerZDepth={0}
        miniDrawerStyle={{ borderRight: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: 'none' }}
        drawerStyle={{ borderRight: '1px solid rgba(0, 0, 0, 0.1)' }}
        toolbarStyle={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
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
