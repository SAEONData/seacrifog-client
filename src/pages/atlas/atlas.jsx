import React, { PureComponent } from 'react'
import OpenLayers from '../../modules/open-layers'
import { Menu, ListFilter } from './ui'
import { cluster as clusterSource } from './sources'
import { cluster as clusterLayer, ahocevarBaseMap } from './layers'
import debounce from '../../lib/debounce'
import sift from 'sift'

class DataFilter extends PureComponent {
  state = {
    searchTerm: this.props.searchTerm || '',
    selectedItems: []
  }
  constructor(props) {
    super(props)
    this.id = this.props.id
    this.items = this.props.items
  }

  updateSearchTerm = searchTerm => this.setState({ searchTerm })

  toggleItemSelect = item => {
    const { selectedItems } = this.state
    const newList = selectedItems.includes(item.id)
      ? selectedItems.filter(id => (id === item.id ? false : true))
      : [...this.state.selectedItems, item.id]

    this.setState({ selectedItems: newList }, () =>
      this.props.updateMap({ filterId: this.id, selectedIds: this.state.selectedItems })
    )
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
    showThinking: false,
    filterSites: [],
    filterNetworks: []
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
        id: 'filterSites',
        label: 'Search sites',
        searchTerm: '',
        items: this.sites.map(s => ({ id: s.id, value: s.name }))
      },
      {
        id: 'filterNetworks',
        label: 'Search networks',
        searchTerm: '',
        items: this.networks.map(n => ({ id: n.id, value: n.acronym }))
      }
    ]
  }

  updateMap = ({ filterId, selectedIds }) =>
    this.setState(
      { showThinking: true },
      debounce(() =>
        this.setState({ [filterId]: selectedIds }, () => {
          const { filterSites, filterNetworks } = this.state
          const xSiteIds =
            filterNetworks.length > 0
              ? this.xrefSitesNetworks.filter(sift({ network_id: { $in: filterNetworks } })).map(x => x.site_id)
              : []

          // Get the new sites to display
          const sites = this.sites.filter(s => {
            let includeSite = false

            // (1) No search
            if (filterSites.length === 0 && filterNetworks.length === 0) {
              includeSite = true
            }

            // (2 A) Only sites searched
            if (filterSites.length > 0 && filterNetworks.length === 0) {
              if (filterSites.includes(s.id)) includeSite = true
            }

            // (2 B) Only networks searched
            if (filterNetworks.length > 0 && filterSites.length === 0) {
              if (xSiteIds.includes(s.id)) includeSite = true
            }

            // (3) Site and network search term (this could RESET the filter)
            if (filterSites.length > 0 && filterNetworks.length > 0) {
              includeSite = xSiteIds.includes(s.id) && filterSites.includes(s.id) ? true : false
            }

            return includeSite
          })

          // Set the new clustered data source
          this.clusteredSitesLayer.setSource(clusterSource(sites))

          // Stop the thinking spinner
          this.setState({ showThinking: false })
        })
      )
    )

  render() {
    const { ahocevarBaseMap, clusteredSitesLayer, updateMap, filters } = this
    const { showThinking } = this.state
    return (
      <Menu
        showThinking={showThinking}
        filters={filters.map(filter => (
          <DataFilter key={filter.id} {...filter} updateMap={updateMap}>
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
