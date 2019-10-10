import React, { PureComponent } from 'react'
import { NavigationDrawer } from 'react-md'
import { withRouter } from 'react-router'
import { Switch } from 'react-router-dom'
import NavItemLink from './nav-item-link'
import FundingAcknowledgement from './funding-acknowledgement'

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
    const hideMenu = ['', '/', 'HOME', 'ABOUT', 'ABOUT/', 'CONTACT', 'CONTACT/'].includes(currentPath.toUpperCase())
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
        miniDrawerClassName="sf-drawer"
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        toolbarTitle={currentPath.capitalize() || 'Home'}
        toolbarActions={[
          <FundingAcknowledgement
            mediaType={currentMedia}
            imgPath={'/seacrifog-logo.png'}
            alt="SEACRIFOG logo"
            content={
              <>
                <p>
                  Supporting EU-African Cooperation on Research Infrastructures for Food Security and Greenhouse Gas
                  Observations
                </p>
                <a className="link" target="_blank" rel="noopener noreferrer" href="https://www.seacrifog.eu/">
                  more information
                </a>
              </>
            }
          />,
          <FundingAcknowledgement
            mediaType={currentMedia}
            imgPath={'/sasscal-logo.png'}
            content={
              <>
                <p>South African Science Service Center for Climate Change and Adaptive Land Management</p>
                <a className="link" target="_blank" rel="noopener noreferrer" href="http://www.sasscal.org/">
                  more information
                </a>
              </>
            }
            alt="SASSCAL logo"
          />,
          <FundingAcknowledgement
            mediaType={currentMedia}
            imgPath={'/eu-funding-achnowledgement.jpg'}
            alt="EU funding acknowledgement"
            content={
              <>
                <p>European Commission: Horizon 2020</p>
                <a
                  className="link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://ec.europa.eu/inea/en/horizon-2020"
                >
                  more information
                </a>
              </>
            }
          />
        ]}
        defaultVisible={currentMedia.desktop && !hideMenu ? true : false}
      >
        <Switch key={location.pathname || '/'}>{this.props.children}</Switch>
      </NavigationDrawer>
    )
  }
}

export default withRouter(Navigation)
