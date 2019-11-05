import React, { PureComponent } from 'react'
import { Button, Drawer, Toolbar } from 'react-md'

const drawerStyle = { minWidth: '400px', overflowY: 'auto' }

export class SideMenu extends PureComponent {
  state = { menuOpen: false }

  toggleMenu = () => this.setState({ menuOpen: !this.state.menuOpen })
  closeMenu = () => this.setState({ menuOpen: false })
  onVizChange = menuOpen => this.setState({ menuOpen })

  render() {
    const { menuOpen } = this.state
    const { toggleMenu, closeMenu, onVizChange } = this
    const { toolbarActions, menuPosition, style } = this.props

    return (
      <>
        <Drawer
          id="atlas-ui"
          style={style || drawerStyle}
          visible={menuOpen}
          mobileType={Drawer.DrawerTypes.TEMPORARY}
          tabletType={Drawer.DrawerTypes.TEMPORARY}
          desktopType={Drawer.DrawerTypes.TEMPORARY}
          position={menuPosition || 'right'}
          onVisibilityChange={onVizChange}
          header={
            <Toolbar
              actions={toolbarActions}
              nav={
                <Button icon onClick={closeMenu}>
                  close
                </Button>
              }
            />
          }
        >
          {this.props.children}
        </Drawer>
        {this.props.control({ toggleMenu })}
      </>
    )
  }
}
