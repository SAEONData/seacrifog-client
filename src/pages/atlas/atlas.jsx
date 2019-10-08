import React, { PureComponent } from 'react'
import { OpenLayers, clusterLayer, clusterSource, ahocevarBaseMap } from '../../modules/map'
import debounce from '../../lib/debounce'
import { clone, mergeLeft } from 'ramda'
import sift from 'sift'
import { SideMenu, FilterView } from './ui'
import { FilterControl } from './controls'

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
    this.state.filters = [
      {
        id: 'filterSites',
        label: 'Search sites',
        searchTerm: '',
        selectedItems: [],
        items: this.sites.map(s => ({ id: s.id, value: s.name }))
      },
      {
        id: 'filterNetworks',
        label: 'Search networks',
        searchTerm: '',
        selectedItems: [],
        items: this.networks.map(n => ({ id: n.id, value: n.acronym }))
      }
    ]
  }

  refreshFilters = () => {
    const filters = clone(this.state.filters).map(f => mergeLeft({ selectedItems: [] }, f))
    this.setState({ filters, showThinking: true }, () => {
      // Set the new clustered data source
      this.clusteredSites = clusterSource(this.props.data.sites)
      this.clusteredSitesLayer.setSource(this.clusteredSites)

      // Stop the thinking spinner
      setTimeout(() => this.setState({ showThinking: false }), 300)
    })
  }

  updateFilters = ({ id, selectedItems }) => {
    const filters = clone(this.state.filters).map(f => (f.id === id ? mergeLeft({ selectedItems }, f) : f))
    this.setState(
      { filters, showThinking: true },
      debounce(() => {
        const [siteFilter, networkFilter] = this.state.filters
        const filterSites = siteFilter.selectedItems
        const filterNetworks = networkFilter.selectedItems
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
        this.clusteredSites = clusterSource(sites)
        this.clusteredSitesLayer.setSource(this.clusteredSites)

        // Stop the thinking spinner
        setTimeout(() => this.setState({ showThinking: false }), 300)
      })
    )
  }

  render() {
    const { ahocevarBaseMap, clusteredSitesLayer, updateFilters, refreshFilters } = this
    const { showThinking, filters } = this.state
    const filtersActive = filters.map(f => f.selectedItems).flat().length > 0 ? true : false
    return (
      <SideMenu
        refreshFilters={refreshFilters}
        showThinking={showThinking}
        filtersActive={filtersActive}
        filters={filters.map(filter => (
          <FilterControl key={filter.id} {...filter} updateFilters={updateFilters}>
            {({ updateSearchTerm, searchTerm, filteredItems, items, toggleItemSelect, selectedItems }) => (
              <FilterView
                searchTerm={searchTerm}
                items={items}
                filteredItems={filteredItems}
                selectedItems={selectedItems}
                toggleItemSelect={toggleItemSelect}
                updateSearchTerm={updateSearchTerm}
                label={filter.label}
              />
            )}
          </FilterControl>
        ))}
      >
        <OpenLayers
          viewOptions={{
            zoom: 3
          }}
          layers={[ahocevarBaseMap, clusteredSitesLayer]}
        />
      </SideMenu>
    )
  }
}
