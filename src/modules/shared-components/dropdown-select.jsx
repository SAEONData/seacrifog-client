import React, { PureComponent } from 'react'
import debounce from '../../lib/debounce'
import { TextField, FontIcon, DropdownMenu, ListItemControl, SelectionControl, List, ListItem } from 'react-md'
import sift from 'sift'

const listItemStyle = {
  backgroundColor: 'rgba(220, 220, 220, 0.5)',
  margin: '2px 0'
}

export class DropdownSelect extends PureComponent {
  state = { searchTerm: '', filteredItems: [], visible: false, listSize: 20 }

  updateSearchTerm = searchTerm => this.setState({ searchTerm, visible: true })

  toggleItemSelect = item => this.props.onItemToggle(item.id)

  render() {
    const { updateSearchTerm, toggleItemSelect, state, props } = this
    const { selectedItems, items, id, label } = props
    const { searchTerm, visible, listSize } = state
    const searchTermUpper = searchTerm.toUpperCase()

    const filteredItems = (searchTerm
      ? [...items].filter(item =>
          item.value.toUpperCase().indexOf(searchTermUpper) >= 0 || selectedItems.includes(item.id) ? true : false
        )
      : [...items]
    )
      .sort((a, b) => {
        const aVal = a.value.toUpperCase()
        const bVal = b.value.toUpperCase()
        return aVal >= bVal ? 1 : -1
      })
      .splice(0, listSize)

    return (
      <>
        <DropdownMenu
          id={`filter-component-${label}-${id}`}
          style={{ width: '100%' }}
          listStyle={{ width: '100%' }}
          defaultVisible={false}
          visible={visible}
          onVisibilityChange={() => this.setState({ visible: !visible })}
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
                      className="add-on-hover"
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

            if (result.length >= 20)
              result.push(
                <ListItem
                  key={'more-items'}
                  onClick={() => this.setState({ listSize: listSize + 20, visible: false })}
                  primaryText={'LOAD MORE...'}
                />
              )
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
            onChange={debounce(val => updateSearchTerm(val))}
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
                style={listItemStyle}
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
