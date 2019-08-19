import React, { Component } from 'react'
import { NavigationDrawer, Divider } from 'react-md'
import { withRouter } from 'react-router'
import { Switch } from 'react-router-dom'
import NavItemLink from './nav-item-link'

const buildNavItemLinks = (navItems, parent = false) =>
  navItems.map(item =>
    item.divider ? (
      <Divider key={item.key} style={item.style || {}} />
    ) : (
      <NavItemLink
        key={'route-' + item.label}
        nestedItems={
          item.nestedItems && item.nestedItems.length > 0
            ? buildNavItemLinks(item.nestedItems, true)
            : null
        }
        hasParent={parent}
        label={item.label}
        to={item.to}
        icon={item.icon}
        exact
      />
    )
  )

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
        navItems={buildNavItemLinks(navItems)}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        toolbarTitle={toolbarTitle || 'Dashboard'}
      >
        <Switch key={location.pathname || '/'}>
          {this.props.children}
        </Switch>
      </NavigationDrawer>
    )
  }
}

export default withRouter(Navigation)
