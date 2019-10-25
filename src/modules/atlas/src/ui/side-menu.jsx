import React, { PureComponent } from 'react'
import { Button, Drawer, Toolbar, LinearProgress } from 'react-md'
import { mergeLeft } from 'ramda'

const menuButtonStyle = { display: 'flex', float: 'right', margin: '10px', zIndex: 1 }
const LinearProgressStyle = { height: '1px', margin: 0 }
const drawerStyle = { minWidth: '400px', overflowY: 'auto' }
const drawerItemsStyle = { paddingLeft: '24px', paddingRight: '24px' }

export default class extends PureComponent {
  state = { menuOpen: false }

  openMenu = () => this.setState({ menuOpen: true })
  closeMenu = () => this.setState({ menuOpen: false })
  onVizChange = menuOpen => this.setState({ menuOpen })

  render() {
    const { menuOpen } = this.state
    const { openMenu, closeMenu, onVizChange } = this
    const { items, thinking, icon, toolbarActions, menuPosition, buttonSytle, itemsStyle, style } = this.props

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
          <LinearProgress
            id="map-calculation-progress"
            key="map-calc-progress"
            style={thinking ? LinearProgressStyle : mergeLeft({ visibility: 'hidden' }, LinearProgressStyle)}
          />
          <div style={itemsStyle || drawerItemsStyle}>{items}</div>
        </Drawer>
        <Button swapTheming primary style={buttonSytle || menuButtonStyle} icon onClick={openMenu}>
          {icon}
        </Button>
      </>
    )
  }
}
