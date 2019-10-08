import React, { PureComponent } from 'react'
import { Button, Drawer, Toolbar, LinearProgress } from 'react-md'

export default class extends PureComponent {
  state = {
    menuOpen: false
  }

  openMenu = () => this.setState({ menuOpen: true })
  closeMenu = () => this.setState({ menuOpen: false })
  onVizChange = menuOpen => this.setState({ menuOpen })

  render() {
    const { menuOpen } = this.state
    const { openMenu, closeMenu, onVizChange } = this
    const { filters, showThinking, refreshFilters, filtersActive } = this.props

    return (
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
        <Drawer
          id="atlas-ui"
          style={{ zIndex: 999, minWidth: '400px', overflowY: 'auto' }}
          visible={menuOpen}
          mobileType={Drawer.DrawerTypes.TEMPORARY}
          tabletType={Drawer.DrawerTypes.TEMPORARY}
          desktopType={Drawer.DrawerTypes.TEMPORARY}
          position={'right'}
          onVisibilityChange={onVizChange}
          header={
            <Toolbar
              actions={[
                <Button disabled={filtersActive ? false : true} primary onClick={refreshFilters} icon>
                  refresh
                </Button>
              ]}
              nav={
                <Button icon onClick={closeMenu}>
                  close
                </Button>
              }
            />
          }
          children={
            <>
              <LinearProgress
                id="map-calculation-progress"
                key="map-calc-progress"
                style={showThinking ? { height: '1px', margin: 0 } : { height: '1px', visibility: 'hidden', margin: 0 }}
              />
              <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>{filters}</div>
            </>
          }
        />
        {this.props.children}
        <Button swapTheming primary style={{ position: 'absolute', top: 10, right: 10 }} icon onClick={openMenu}>
          search
        </Button>
      </div>
    )
  }
}
