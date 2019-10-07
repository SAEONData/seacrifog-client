import React, { PureComponent } from 'react'
import { Button, Drawer, Toolbar, CircularProgress } from 'react-md'

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
    const { filters, showThinking } = this.props

    return (
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
        <Drawer
          id="atlas-ui"
          style={{ zIndex: 999, minWidth: '400px' }}
          visible={menuOpen}
          mobileType={Drawer.DrawerTypes.TEMPORARY}
          tabletType={Drawer.DrawerTypes.TEMPORARY}
          desktopType={Drawer.DrawerTypes.TEMPORARY}
          position={'right'}
          onVisibilityChange={onVizChange}
          header={
            <Toolbar
              actions={[
                <CircularProgress
                  id="map-calculation-progress"
                  key="map-calc-progress"
                  style={showThinking ? { position: 'relative', top: '12px', right: '12px' } : { visibility: 'hidden' }}
                />
              ]}
              nav={
                <Button icon onClick={closeMenu}>
                  close
                </Button>
              }
            />
          }
          children={
            <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
              <Button icon>edit</Button>
              <Button icon>picture_as_pdf</Button>
              <Button icon>get_app</Button>
              {filters}
            </div>
          }
        />
        {this.props.children}
        <Button style={{ position: 'absolute', top: 10, right: 10 }} icon onClick={openMenu}>
          menu
        </Button>
      </div>
    )
  }
}
