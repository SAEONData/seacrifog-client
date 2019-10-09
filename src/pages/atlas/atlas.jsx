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

    /**
     * Cascading data references:
     * Since the point of the map is to identify 'sites',
     * only include networks/variables/protocols that can resolve to sites
     */
    this.sites = this.props.data.sites
    this.xrefSitesNetworks = this.props.data.xrefSitesNetworks
    this.networks = this.props.data.networks.filter(
      sift({ id: { $in: this.xrefSitesNetworks.map(x => x.network_id) } })
    )
    this.xrefNetworksVariables = this.props.data.xrefNetworksVariables.filter(
      sift({ network_id: { $in: this.networks.map(x => x.id) } })
    )
    this.variables = this.props.data.variables.filter(
      sift({ id: { $in: this.xrefNetworksVariables.map(x => x.variable_id) } })
    )
    this.xrefProtocolsVariables = this.props.data.xrefProtocolsVariables.filter(
      sift({ variable_id: { $in: this.variables.map(v => v.id) } })
    )
    this.protocols = this.props.data.protocols.filter(
      sift({ id: { $in: this.xrefProtocolsVariables.map(x => x.protocol_id) } })
    )

    // OpenLayers related references
    this.clusteredSites = clusterSource(this.props.data.sites)
    this.clusteredSitesLayer = clusterLayer(this.clusteredSites)
    this.ahocevarBaseMap = ahocevarBaseMap

    // The filters
    this.state.filters = [
      {
        id: 'filterSites',
        label: 'Search sites',
        selectedItems: [],
        items: this.sites.map(s => ({ id: s.id, value: s.name }))
      },
      {
        id: 'filterNetworks',
        label: 'Search networks',
        selectedItems: [],
        items: this.networks.map(n => ({ id: n.id, value: n.acronym }))
      },
      {
        id: 'filterVariables',
        label: 'Search variables',
        selectedItems: [],
        items: this.variables.map(v => ({ id: v.id, value: v.name }))
      },
      {
        id: 'filterProtocols',
        label: 'Search protocols',
        selectedItems: [],
        items: this.protocols.map(p => ({ id: p.id, value: p.title }))
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
        // Get the selected items of each filter
        let sites
        const [sitesFilter, networksFilter, variablesFilter, protocolsFilter] = this.state.filters
        const selectedSites = sitesFilter.selectedItems
        const selectedNetworks = networksFilter.selectedItems
        const selectedVariables = variablesFilter.selectedItems
        const selectedProtocols = protocolsFilter.selectedItems

        // Start with sites - if there are site IDs, filter on these
        sites = selectedSites.length ? this.sites.filter(s => selectedSites.includes(s.id)) : this.sites

        // Next, if a network search exists, filter on that
        if (selectedNetworks.length) {
          const ids = this.xrefSitesNetworks.filter(x => selectedNetworks.includes(x.network_id)).map(x => x.site_id)

          sites = ids.length ? sites.filter(s => ids.includes(s.id)) : sites
        }

        // Next, if a variable search exists, filter on that
        if (selectedVariables.length) {
          const networkIds = this.xrefNetworksVariables
            .filter(x => selectedVariables.includes(x.variable_id))
            .map(x => x.network_id)

          const ids = this.xrefSitesNetworks.filter(x => networkIds.includes(x.network_id)).map(x => x.site_id)
          sites = ids.length ? sites.filter(s => ids.includes(s.id)) : sites
        }

        // Next, if a protocol search exists, filter on that
        if (selectedProtocols.length) {
          const variableIds = this.xrefProtocolsVariables
            .filter(x => selectedProtocols.includes(x.protocol_id))
            .map(x => x.variable_id)

          const networkIds = this.xrefNetworksVariables
            .filter(x => variableIds.includes(x.variable_id))
            .map(x => x.network_id)

          const ids = this.xrefSitesNetworks.filter(x => networkIds.includes(x.network_id)).map(x => x.site_id)
          sites = ids.length ? sites.filter(s => ids.includes(s.id)) : sites
        }

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
