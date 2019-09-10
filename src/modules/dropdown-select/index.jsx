import React, { Component } from 'react'
import { SelectionControl, ListItem, DropdownMenu, TextField, ListItemControl } from 'react-md'

export default class DropdownList extends Component {
  state = {}
  constructor(props) {
    super(props)
  }
  render() {
    const { searchTerm, menuItems, placeholder, updateForm } = this.props
    return (
      <DropdownMenu
        id="variables-search-menu"
        style={{ width: '100%' }}
        menuItems={menuItems.map(item => (
          <ListItemControl
            key={`variable-${item.id}`}
            secondaryText={
              <>
                {'desc 1'}
                <br />
                {'desc 2'}
              </>
            }
            threeLines
            primaryAction={
              <SelectionControl
                id={`variable-toggle-${item.id}`}
                label={'title'}
                name={'title'}
                type="checkbox"
                labelBefore
                checked={true}
                onChange={() => alert('hi')}
              />
            }
          />
        ))}
        anchor={{
          x: DropdownMenu.HorizontalAnchors.INNER_LEFT,
          y: DropdownMenu.VerticalAnchors.BOTTOM
        }}
        position={DropdownMenu.Positions.BELOW}
      >
        <TextField
          id="variables-search-text"
          label={placeholder}
          autoComplete="off"
          value={searchTerm}
          placeholder={`By ${Object.keys(menuItems[0]).join(', ')}`}
          onChange={val => console.log('hi')}
        />
      </DropdownMenu>
    )
  }
}
