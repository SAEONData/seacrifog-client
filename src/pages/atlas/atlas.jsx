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
        const [sitesFilter, networksFilter, variablesFilter, protocolsFilter] = this.state.filters
        let selectedSites = new Set(sitesFilter.selectedItems)
        let selectedNetworks = new Set(networksFilter.selectedItems)
        let selectedVariables = new Set(variablesFilter.selectedItems)
        let selectedProtocols = new Set(protocolsFilter.selectedItems)

        /**
         * Filtering is done via indirect relationship to sites
         *  => protocols => variables => networks => sites
         *
         * Work from protocols down to networks
         */
        const xVariableIds = new Set(
          (selectedProtocols.size
            ? this.xrefProtocolsVariables.filter(sift({ protocol_id: { $in: [...selectedProtocols] } }))
            : this.xrefProtocolsVariables
          ).map(x => x.variable_id)
        )

        console.log('xVariableIds', xVariableIds)

        selectedVariables = selectedVariables.size
          ? new Set([...selectedVariables].filter(id => xVariableIds.has(id)))
          : xVariableIds

        console.log('selectedVariables', selectedVariables)

        const xNetworkIds = new Set(
          (selectedVariables.size
            ? this.xrefNetworksVariables.filter(sift({ variable_id: { $in: [...selectedVariables] } }))
            : this.xrefNetworksVariables
          ).map(x => x.network_id)
        )

        console.log('xNetworkIds', xNetworkIds)

        // Get the intersection of selectedNetworks, and networks associated with selected variables
        selectedNetworks = selectedNetworks.size
          ? new Set([...selectedNetworks].filter(id => xNetworkIds.has(id)))
          : xNetworkIds

        console.log('selectedNetworks', selectedNetworks)

        // Get the intersection of selectedNetworks and sites
        const xSiteIds = new Set(
          (selectedNetworks.size
            ? this.xrefSitesNetworks.filter(sift({ network_id: { $in: [...selectedNetworks] } }))
            : selectedVariables.size
            ? []
            : this.xrefSitesNetworks
          ).map(x => x.site_id)
        )

        console.log('xSiteIds', xSiteIds)

        // Get the intersection of selectedSites, and selected networks
        selectedSites = selectedSites.size ? new Set([...selectedSites].filter(id => xSiteIds.has(id))) : xSiteIds

        // Get the new sites to display
        const sites = this.sites.filter(s => selectedSites.has(s.id))

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
