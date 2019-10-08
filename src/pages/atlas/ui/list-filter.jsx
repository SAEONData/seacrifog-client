import React, { PureComponent } from 'react'
import { TextField, FontIcon, DropdownMenu, ListItemControl, SelectionControl, List, ListItem } from 'react-md'
import sift from 'sift'

export default class extends PureComponent {
  render() {
    const {
      id,
      items,
      filteredItems,
      label,
      searchTerm,
      updateSearchTerm,
      toggleItemSelect,
      selectedItems
    } = this.props
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
          menuItems={(() => {
            const result =
              filteredItems.length > 0
                ? filteredItems.map(item => (
                    <ListItemControl
                      key={item.id}
                      primaryAction={
                        <SelectionControl
                          id={`filter-select-option-${item.id}-${item.label}`}
                          name={'filter-select-option'}
                          onChange={() => toggleItemSelect(item)}
                          type={'checkbox'}
                          label={(item.value || '(UNKNOWN)').truncate(25).toUpperCase()}
                          checked={selectedItems.includes(item.id) ? true : false}
                          labelBefore
                        />
                      }
                    />
                  ))
                : 'No search result'

            if (result.length >= 20) result.push('...')
            return result
          })()}
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
          {items
            .filter(sift({ id: { $in: selectedItems } }))
            .sort((a, b) => {
              const aVal = a.value.toUpperCase()
              const bVal = b.value.toUpperCase()
              return aVal >= bVal ? 1 : -1
            })
            .map(item => (
              <ListItem
                key={item.id}
                onClick={() => toggleItemSelect(item)}
                rightIcon={<FontIcon>close</FontIcon>}
                primaryText={(item.value || '(UNKNOWN)').truncate(25).toUpperCase()}
              />
            ))}
        </List>
      </>
    )
  }
}
