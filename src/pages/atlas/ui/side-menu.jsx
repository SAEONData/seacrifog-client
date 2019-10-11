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
    const { items, thinking } = this.props
    let top
    switch (this.props.position) {
      case 1:
        top = 10
        break
      case 2:
        top = 60
        break
      case 3:
        top = 110
        break
      default:
        top = 10
        break
    }
    return (
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
        <Drawer
          id="atlas-ui"
          style={{
            zIndex: 999,
            minWidth: '400px',
            overflowY: 'auto'
          }}
          visible={menuOpen}
          mobileType={Drawer.DrawerTypes.TEMPORARY}
          tabletType={Drawer.DrawerTypes.TEMPORARY}
          desktopType={Drawer.DrawerTypes.TEMPORARY}
          position={'right'}
          onVisibilityChange={onVizChange}
          header={
            <Toolbar
              actions={this.props.toolbarActions}
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
                style={thinking ? { height: '1px', margin: 0 } : { height: '1px', visibility: 'hidden', margin: 0 }}
              />
              <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>{items}</div>
            </>
          }
        />
        <Button swapTheming primary style={{ float: 'right', top, right: 10, zIndex: 997 }} icon onClick={openMenu}>
          {this.props.icon}
        </Button>
      </div>
    )
  }
}
