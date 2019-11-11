import { PureComponent } from 'react'
import { clusterSource } from '@saeon/atlas'
import { mergeLeft } from 'ramda'

export default class extends PureComponent {
  state = {
    filterSites: [],
    filterNetworks: []
  }

  constructor(props) {
    super(props)

    const { data, map, selectedNetwork, selectedVariable, selectedProtocol } = props

    const {
      sites,
      networks,
      variables,
      protocols,
      xrefSitesNetworks,
      xrefNetworksVariables,
      xrefProtocolsVariables
    } = data

    // Just for easier reference
    this.map = map
    this.sites = sites
    this.networks = networks
    this.variables = variables
    this.protocols = protocols
    this.xrefSitesNetworks = xrefSitesNetworks
    this.xrefNetworksVariables = xrefNetworksVariables
    this.xrefProtocolsVariables = xrefProtocolsVariables

    console.log(selectedNetwork, selectedProtocol, selectedVariable)

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
        selectedItems: selectedNetwork ? [selectedNetwork.id] : [],
        items: this.networks.map(n => ({ id: n.id, value: n.acronym }))
      },
      {
        id: 'filterVariables',
        label: 'Search variables',
        selectedItems: selectedVariable ? [selectedVariable.id] : [],
        items: this.variables.map(v => ({ id: v.id, value: v.name }))
      },
      {
        id: 'filterProtocols',
        label: 'Search protocols',
        selectedItems: selectedProtocol ? [selectedProtocol.id] : [],
        items: this.protocols.map(p => ({ id: p.id, value: p.title }))
      }
    ]
  }

  componentDidMount() {
    this.applySiteFilter()
  }

  applySiteFilter = () => {
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
    this.props.updateMapLayer({ source: clusterSource({ data: sites, locAttribute: 'xyz' }) })
  }

  refreshFilters = () =>
    this.setState({ filters: [...this.state.filters].map(f => mergeLeft({ selectedItems: [] }, f)) }, () => {
      this.props.updateMapLayer({ source: clusterSource({ data: this.sites, locAttribute: 'xyz' }) })
      this.props.updateForm({
        selectedNetwork: null,
        selectedProtocol: null,
        selectedVariable: null
      })
    })

  updateFilters = ({ id, selectedItems }) => {
    const { selectedProtocol, selectedVariable, updateForm } = this.props

    // Check if selectedVariable is removed
    if (id === 'selectedVariables') {
      const vId = selectedVariable ? selectedVariable.id : null
      if (!selectedItems.includes(vId)) updateForm({ selectedVariable: null })
    }
    // Check if selectedProtocol is removed
    if (id === 'selectedProtocols') {
      const vId = selectedProtocol ? selectedProtocol.id : null
      if (!selectedItems.includes(vId)) updateForm({ selectedProtocol: null })
    }

    this.setState(
      {
        filters: [...this.state.filters].map(f => (f.id === id ? mergeLeft({ selectedItems }, f) : f))
      },
      this.applySiteFilter
    )
  }

  render() {
    const { updateFilters, refreshFilters } = this
    const { filters } = this.state
    const anyActiveFilters = filters.map(f => f.selectedItems).flat().length > 0 ? true : false
    return this.props.children({ updateFilters, refreshFilters, filters, anyActiveFilters })
  }
}
