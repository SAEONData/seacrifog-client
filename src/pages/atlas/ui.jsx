import React, { PureComponent } from 'react'
import { Button, Drawer, Toolbar } from 'react-md'

export default class extends PureComponent {
  state = { menuOpen: false }

  openMenu = () => this.setState({ menuOpen: true })
  closeMenu = () => this.setState({ menuOpen: false })
  onVizChange = menuOpen => this.setState({ menuOpen })

  render() {
    const { menuOpen } = this.state
    const { openMenu, closeMenu, onVizChange } = this
    const { tools } = this.props

    return (
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
        <Drawer
          id="atlas-ui"
          style={{ zIndex: 999, minWidth: '400px' }}
          navStyle={{ paddingLeft: '30px', paddingRight: '30px' }}
          visible={menuOpen}
          mobileType={Drawer.DrawerTypes.TEMPORARY}
          tabletType={Drawer.DrawerTypes.TEMPORARY}
          desktopType={Drawer.DrawerTypes.TEMPORARY}
          position={'right'}
          onVisibilityChange={onVizChange}
          header={
            <Toolbar
              nav={
                <Button icon onClick={closeMenu}>
                  close
                </Button>
              }
            />
          }
          navItems={tools.map(t => t)}
        />
        {this.props.children}
        <Button style={{ position: 'absolute', top: 10, right: 10 }} icon onClick={openMenu}>
          menu
        </Button>
      </div>
    )
  }
}
