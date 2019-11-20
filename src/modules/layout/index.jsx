import React, { PureComponent } from 'react'
import { NavigationDrawer } from 'react-md'
import { withRouter } from 'react-router'
import { Switch } from 'react-router-dom'
import NavItemLink from './nav-item-link'

class Navigation extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { currentPath: this.getCurrentPath(props) }
    this.navItems = props.navItems
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentPath: this.getCurrentPath(nextProps) })
  }

  getCurrentPath({ location: { pathname } }) {
    return pathname
      .substring(pathname.indexOf('/') + 1)
      .split('/')
      .map(p => p.capitalize())
      .join('/')
  }

  render() {
    const { currentPath } = this.state
    const { location, navItems } = this.props
    const currentMedia = NavigationDrawer.getCurrentMedia()
    return (
      <NavigationDrawer
        id="app-navigation-drawer"
        drawerTitle={'BETA 0.1'}
        navItems={navItems.map(({ divider, subheader, ...navItem }) =>
          divider || subheader ? (
            { divider, subheader, ...navItem }
          ) : (
            <NavItemLink key={'route-' + navItem.keyval} {...navItem} />
          )
        )}
        contentStyle={{ position: 'relative' }}
        toolbarZDepth={0}
        toolbarStyle={{ backgroundColor: '#fff', borderBottom: '1px solid rgba(0,0,0,0.1)' }}
        toolbarThemeType="themed"
        toolbarClassName="sf-toolbar"
        drawerZDepth={0}
        drawerStyle={{ borderRight: '1px solid rgba(0, 0, 0, 0.1)' }}
        drawerClassName="sf-drawer"
        miniDrawerStyle={{ borderRight: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: 'none' }}
        miniDrawerClassName="sf-drawer"
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
        desktopDrawerType={
          ['', 'HOME', 'ABOUT', 'CONTACT'].includes(currentPath.replace('/', '').toUpperCase())
            ? NavigationDrawer.DrawerTypes.TEMPORARY
            : NavigationDrawer.DrawerTypes.PERSISTENT_MINI
        }
        drawerTransitionDuration={500}
        toolbarActions={[
          <h3
            style={{
              position: 'absolute',
              width: '100%',
              textAlign: 'center',
              lineHeight: '64px',
              margin: 0,
              display: currentMedia.mobile ? 'none' : 'inherit'
            }}
          >
            Carbon Observation Platform Explorer
          </h3>,
          <img
            style={{
              height: 'auto',
              width: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              float: 'right',
              margin: 0,
              padding: '8px 16px'
            }}
            src="/seacrifog-logo.png"
            alt="SEACRIFOG logo"
          />
        ]}
        toolbarTitle={currentPath.capitalize() || 'Home'}
        defaultVisible={false}
      >
        <Switch key={location.pathname || '/'}>{this.props.children}</Switch>
      </NavigationDrawer>
    )
  }
}

export default withRouter(Navigation)
