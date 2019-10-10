import React, { PureComponent } from 'react'
import { clusterSource } from '../../open-layers'
import debounce from '../../../../lib/debounce'
import { clone, mergeLeft } from 'ramda'
import SideMenu from '../../ui/side-menu'
import SelectListFilter from './select-list-filter'
import { Button } from 'react-md'

export default class extends PureComponent {
  state = {
    showThinking: false,
    filterSites: [],
    filterNetworks: []
  }

  constructor(props) {
    super(props)

    // Just for easier reference
    this.map = this.props.map
    this.sites = this.props.data.sites
    this.networks = this.props.data.networks
    this.variables = this.props.data.variables
    this.protocols = this.props.data.protocols
    this.xrefSitesNetworks = this.props.data.xrefSitesNetworks
    this.xrefNetworksVariables = this.props.data.xrefNetworksVariables
    this.xrefProtocolsVariables = this.props.data.xrefProtocolsVariables

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

  refreshFilters = () =>
    this.setState(
      { filters: clone(this.state.filters).map(f => mergeLeft({ selectedItems: [] }, f)), showThinking: true },
      () => {
        this.props.updateMapLayer({ source: clusterSource(this.sites) })
        this.setState({ showThinking: false })
      }
    )

  updateFilters = ({ id, selectedItems }) =>
    this.setState(
      {
        filters: clone(this.state.filters).map(f => (f.id === id ? mergeLeft({ selectedItems }, f) : f)),
        showThinking: true
      },
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
        this.props.updateMapLayer({ source: clusterSource(sites) })
        this.setState({ showThinking: false })
      })
    )

  render() {
    const { updateFilters, refreshFilters } = this
    const { showThinking, filters } = this.state
    const filtersActive = filters.map(f => f.selectedItems).flat().length > 0 ? true : false
    return (
      <SideMenu
        position={this.props.position}
        icon={'search'}
        toolbarActions={
          <Button disabled={filtersActive ? false : true} primary onClick={refreshFilters} icon>
            refresh
          </Button>
        }
        showThinking={showThinking}
        items={filters.map(filter => (
          <SelectListFilter key={filter.id} {...filter} updateFilters={updateFilters} />
        ))}
      />
    )
  }
}
