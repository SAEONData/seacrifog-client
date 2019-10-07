import React, { PureComponent } from 'react'
import { TextField, FontIcon, DropdownMenu, ListItemControl, SelectionControl, List, ListItem } from 'react-md'
import sift from 'sift'

export default class extends PureComponent {
  render() {
    const { id, items, label, searchTerm, updateSearchTerm, toggleItemSelect, selectedItems } = this.props
    return (
      <>
        <DropdownMenu
          id={`filter-component-${label}-${id}`}
          style={{ width: '100%' }}
          listStyle={{ width: '100%' }}
          anchor={{
            x: DropdownMenu.HorizontalAnchors.INNER_LEFT,
            y: DropdownMenu.VerticalAnchors.BOTTOM
          }}
          position={DropdownMenu.Positions.BELOW}
          menuItems={
            items.length > 0
              ? items.map(item => (
                  <ListItemControl
                    key={item.id}
                    primaryAction={
                      <SelectionControl
                        id={`filter-select-option-${item.id}-${item.label}`}
                        name={'filter-select-option'}
                        onChange={() => toggleItemSelect(item)}
                        type={'checkbox'}
                        label={item.value.truncate(30)}
                        checked={selectedItems.includes(item.id) ? true : false}
                        labelBefore
                      />
                    }
                  />
                ))
              : 'No search result'
          }
        >
          <TextField
            id={`atlas-filter-${id}`}
            key={id}
            autoComplete="off"
            style={{ width: '100%' }}
            leftIcon={<FontIcon>search</FontIcon>}
            label={label}
            onChange={val => updateSearchTerm(val)}
            fullWidth={true}
            value={searchTerm}
          />
        </DropdownMenu>
        <List>
          {items.filter(sift({ id: { $in: selectedItems } })).map(item => (
            <ListItem
              key={item.id}
              onClick={() => toggleItemSelect(item)}
              rightIcon={<FontIcon>close</FontIcon>}
              primaryText={item.value.truncate(30)}
            />
          ))}
        </List>
      </>
    )
  }
}
