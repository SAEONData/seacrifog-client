import React, { PureComponent } from 'react'
import UI from './ui'

export default class extends PureComponent {
  state = { searchTerm: '' }

  updateSearchTerm = searchTerm => this.setState({ searchTerm })

  toggleItemSelect = item => {
    const { id, selectedItems, updateFilters } = this.props
    const newList = selectedItems.includes(item.id)
      ? [...selectedItems].filter(id => (id === item.id ? false : true))
      : [...selectedItems, item.id]

    updateFilters({ id, selectedItems: newList })
  }

  render() {
    const { updateSearchTerm, toggleItemSelect } = this
    const { searchTerm } = this.state
    const { selectedItems, items } = this.props
    const filteredItems = [...items]
      .filter(item =>
        item.value.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0 || selectedItems.includes(item.id)
          ? true
          : false
      )
      .sort((a, b) => {
        const aVal = a.value.toUpperCase()
        const bVal = b.value.toUpperCase()
        return aVal >= bVal ? 1 : -1
      })
      .splice(0, 20)
    return (
      <UI
        searchTerm={searchTerm}
        updateSearchTerm={updateSearchTerm}
        items={items}
        filteredItems={filteredItems}
        toggleItemSelect={toggleItemSelect}
        selectedItems={selectedItems}
        {...this.props}
      />
    )
  }
}
