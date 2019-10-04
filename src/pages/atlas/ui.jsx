import React, { PureComponent } from 'react'
import {
  Button,
  Drawer,
  Toolbar,
  TextField,
  FontIcon,
  CircularProgress,
  DropdownMenu,
  ListItemControl,
  List,
  ListItem,
  SelectionControl
} from 'react-md'
import { mergeLeft } from 'ramda'

class SelectionList extends React.PureComponent {
  render() {
    const { filter, filterFunction } = this.props
    return (
      <>
        <DropdownMenu
          style={{ width: '100%' }}
          listStyle={{ width: '100%' }}
          anchor={{
            x: DropdownMenu.HorizontalAnchors.INNER_LEFT,
            y: DropdownMenu.VerticalAnchors.BOTTOM
          }}
          position={DropdownMenu.Positions.BELOW}
          menuItems={[
            <ListItemControl
              primaryAction={<SelectionControl type={'checkbox'} label="hi there" checked={true} labelBefore />}
            />
          ]}
        >
          <TextField
            id={`atlas-filter-${filter.id}`}
            key={filter.id}
            autoComplete="off"
            style={{ width: '100%' }}
            leftIcon={<FontIcon>search</FontIcon>}
            label={filter.label}
            fullWidth={true}
            value={filter.value}
            onChange={value => filterFunction(mergeLeft({ value }, filter))}
          />
        </DropdownMenu>
        {/* <List>
          <ListItem rightIcon={<FontIcon>close</FontIcon>} primaryText={'hi'} />
        </List> */}
      </>
    )
  }
}

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
    const { filters, filterFunction, showThinking } = this.props

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
              {filters.map(filter => (
                <SelectionList filterFunction={filterFunction} filter={filter} />
              ))}
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
