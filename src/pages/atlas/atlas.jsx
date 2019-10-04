import React, { PureComponent } from 'react'
import OpenLayers from '../../modules/open-layers'
import UI from './ui'
import { cluster as clusterSource } from './sources'
import { cluster as clusterLayer, ahocevarBaseMap } from './layers'
import debounce from '../../lib/debounce'
import sift from 'sift'

export default class Atlas extends PureComponent {
  state = {
    showThinking: false,
    filters: [
      {
        id: 'site-name',
        label: 'Search sites',
        value: ''
      },
      {
        id: 'network-name',
        label: 'Search networks',
        value: ''
      }
    ]
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
  }

  /**
   * The outcome of this filter is a list of sites to display
   *  => (1) Get site IDs
   */
  filterFunction = filter =>
    this.setState(
      {
        showThinking: true,
        filters: this.state.filters.map(f => (f.id === filter.id ? filter : Object.assign({}, f)))
      },
      debounce(() => {
        // TODO - Get filter requirements HERE!
        const [siteFilter, networkFilter] = this.state.filters

        const networkSearchTerm = networkFilter.value.toUpperCase()
        let networkIds = []

        const siteSearchTerm = siteFilter.value.toUpperCase()
        let xSiteIds = []
        let sites = []

        // Get the ID of networks to include in the site-search'
        if (networkFilter.value) {
          networkIds = this.networks
            .filter(n => {
              let includeNetwork = false
              if (n.title.toUpperCase().indexOf(networkSearchTerm) >= 0) includeNetwork = true // Search by title
              if (n.acronym.toUpperCase().indexOf(networkSearchTerm) >= 0) includeNetwork = true // Search by acronym
              return includeNetwork
            })
            .map(n => n.id)
        }

        // With reference xrefSitesNetworks the network IDs, get a list of site IDs to include in the site-search
        if (networkIds.length >= 0) {
          xSiteIds = this.xrefSitesNetworks.filter(sift({ network_id: { $in: networkIds } })).map(x => x.site_id)
        }

        // Get a list of site IDs to render
        sites = this.sites.filter(s => {
          let includeSite = false
          if (networkSearchTerm && !siteSearchTerm) if (xSiteIds.includes(s.id)) includeSite = true
          if (!networkSearchTerm && siteSearchTerm)
            if (s.name.toUpperCase().indexOf(siteSearchTerm) >= 0) includeSite = true
          if (networkSearchTerm && siteSearchTerm)
            if (xSiteIds.includes(s.id) && s.name.toUpperCase().indexOf(siteSearchTerm) >= 0) includeSite = true
          if (!networkSearchTerm && !siteSearchTerm) includeSite = true
          return includeSite
        })

        // Set the new clustered data source
        this.clusteredSitesLayer.setSource(clusterSource(sites))

        // Stop the thinking spinner
        this.setState({ showThinking: false })
      })
    )

  render() {
    const { ahocevarBaseMap, clusteredSitesLayer, filterFunction } = this
    const { filters, showThinking } = this.state
    return (
      <UI showThinking={showThinking} filterFunction={filterFunction} filters={filters}>
        <OpenLayers
          viewOptions={{
            zoom: 3
          }}
          layers={[ahocevarBaseMap, clusteredSitesLayer]}
        />
      </UI>
    )
  }
}
