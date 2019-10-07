import React, { PureComponent } from 'react'
import OpenLayers from '../../modules/open-layers'
import { Menu, ListFilter } from './ui'
import { cluster as clusterSource } from './sources'
import { cluster as clusterLayer, ahocevarBaseMap } from './layers'
import debounce from '../../lib/debounce'

class DataFilter extends PureComponent {
  state = {
    searchTerm: '',
    selectedItems: []
  }
  constructor(props) {
    super(props)
    this.id = this.props.id
    this.items = this.props.items
    this.state.searchTerm = this.props.searchTerm
  }

  updateSearchTerm = searchTerm => this.setState({ searchTerm })

  toggleItemSelect = item => {
    const { selectedItems } = this.state
    const newList = selectedItems.includes(item.id)
      ? selectedItems.filter(id => (id === item.id ? false : true))
      : [...this.state.selectedItems, item.id]

    this.setState({ selectedItems: newList })
  }

  render() {
    const { updateSearchTerm, toggleItemSelect } = this
    const { searchTerm, selectedItems } = this.state
    const items = this.items
      .filter(item =>
        item.value.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0 || selectedItems.includes(item.id)
          ? true
          : false
      )
      .splice(0, 20)
    return <>{this.props.children({ searchTerm, updateSearchTerm, items, toggleItemSelect, selectedItems })}</>
  }
}

export default class Atlas extends PureComponent {
  state = {
    showThinking: false
  }

  constructor(props) {
    super(props)

    // Data references
    this.sites = this.props.data.sites
    this.networks = this.props.data.networks
    this.variables = this.props.data.variables
    this.protocols = this.props.data.protocols
    this.dataproducts = this.props.data.dataproducts
    this.xrefSitesNetworks = this.props.data.xrefSitesNetworks
    this.xrefNetworksVariables = this.props.data.xrefNetworksVariables
    this.xrefProtocolsVariables = this.props.data.xrefProtocolsVariables

    // OpenLayers related references
    this.clusteredSites = clusterSource(this.props.data.sites)
    this.clusteredSitesLayer = clusterLayer(this.clusteredSites)
    this.ahocevarBaseMap = ahocevarBaseMap

    // The filters
    this.filters = [
      {
        id: 'site-name',
        label: 'Search sites',
        searchTerm: '',
        items: this.sites.map(s => ({ id: s.id, value: s.name }))
      },
      {
        id: 'network-name',
        label: 'Search networks',
        searchTerm: '',
        items: this.networks.map(n => ({ id: n.id, value: n.acronym }))
      }
    ]
  }

  render() {
    const { ahocevarBaseMap, clusteredSitesLayer, filters } = this
    const { showThinking } = this.state
    return (
      <Menu
        showThinking={showThinking}
        filters={filters.map(filter => (
          <DataFilter key={filter.id} {...filter}>
            {({ updateSearchTerm, searchTerm, items, toggleItemSelect, selectedItems }) => (
              <ListFilter
                searchTerm={searchTerm}
                items={items}
                selectedItems={selectedItems}
                toggleItemSelect={toggleItemSelect}
                updateSearchTerm={updateSearchTerm}
                label={filter.label}
              />
            )}
          </DataFilter>
        ))}
      >
        <OpenLayers
          viewOptions={{
            zoom: 3
          }}
          layers={[ahocevarBaseMap, clusteredSitesLayer]}
        />
      </Menu>
    )
  }
}
