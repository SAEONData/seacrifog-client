import React from 'react'
import { DropdownSelect } from '../../modules/shared-components'

export default ({ label, items, relatedItems, fieldName, displayValue, updateForm, ...fields }) => (
  <>
    <DropdownSelect
      label={label}
      truncateLength={60}
      //The full list of selectable items taken as an array of keyValuePairs [{k1,v1}, {k2,v2}, {k3:v3}] where value must be a string(for now)
      items={items.map(item => ({
        id: item.id,
        value: item.id.toString() + ' - ' + item[displayValue]
      }))}
      selectedItems={Object.entries(relatedItems).map(item => item[1].id) || []} //The list of already selected items from items taken as an array of integers(id/key of item)
      onItemToggle={id => {
        const originalFields = fields //a value to compare the changes to.(Possibly pointless since JS assignment makes a reference not a copy)
        //IF dataproduct isnt in relatedItems:
        if (
          Object.entries(relatedItems)
            .map(item => item[1].id)
            .includes(id)
        ) {
          //TOGGLE DESELECT:
          for (var i = 0; i < relatedItems.length; i++) {
            //filter out the ID of the item clicked
            if (relatedItems[i].id === id) {
              fields[fieldName] = originalFields[fieldName].filter(r => r.id !== id)
            }
          }
        } else {
          //TOGGLE SELECT:
          fields[fieldName].push({ id: id }) //add the newly selected item to the list of related items
        }
        updateForm({ [fieldName]: fields[fieldName] })
      }}
    />
  </>
)
