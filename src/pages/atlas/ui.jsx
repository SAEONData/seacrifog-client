import React, { PureComponent } from 'react'
import { Button, Drawer, Toolbar, TextField, FontIcon, LinearProgress } from 'react-md'
import { mergeLeft } from 'ramda'

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
    const { filters, filter, showThinking } = this.props

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
          navItems={[
            <LinearProgress
              id="map-calculation-progress"
              key="map-calc-progress"
              style={showThinking ? { margin: 0 } : { visibility: 'hidden', margin: 0 }}
            />
          ].concat(
            filters.map((f, i) => (
              <TextField
                id="atlas-search-field-sites"
                key={i}
                autoComplete="off"
                style={{ width: '100%' }}
                leftIcon={<FontIcon>search</FontIcon>}
                label={f.label}
                value={f.value}
                onChange={value => filter(mergeLeft({ value }, f))}
                fullWidth={true}
              />
            ))
          )}
        />
        {this.props.children}
        <Button style={{ position: 'absolute', top: 10, right: 10 }} icon onClick={openMenu}>
          menu
        </Button>
      </div>
    )
  }
}
