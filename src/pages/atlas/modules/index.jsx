import React, { PureComponent } from 'react'
import { OpenLayers, clusterLayer, clusterSource, ahocevarBaseMap } from '../open-layers'
import Filter from './filter'
import Reporting from './reporting'
import Info from './info'
import Popups from './popups'
import sift from 'sift'

export default class extends PureComponent {
  constructor(props) {
    super(props)

    // Get the data
    this.sites = props.data.sites
    this.xrefSitesNetworks = props.data.xrefSitesNetworks
    this.networks = props.data.networks.filter(sift({ id: { $in: this.xrefSitesNetworks.map(x => x.network_id) } }))
    this.xrefNetworksVariables = props.data.xrefNetworksVariables.filter(
      sift({ network_id: { $in: this.networks.map(x => x.id) } })
    )
    this.variables = props.data.variables.filter(
      sift({ id: { $in: this.xrefNetworksVariables.map(x => x.variable_id) } })
    )
    this.xrefProtocolsVariables = props.data.xrefProtocolsVariables.filter(
      sift({ variable_id: { $in: this.variables.map(v => v.id) } })
    )
    this.protocols = props.data.protocols.filter(
      sift({ id: { $in: this.xrefProtocolsVariables.map(x => x.protocol_id) } })
    )

    // Create layers
    this.clusteredSites = clusterSource(this.sites)
    this.clusteredSitesLayer = clusterLayer(this.clusteredSites)
    this.ahocevarBaseMap = ahocevarBaseMap
  }

  updateMapLayer = ({ source }) => {
    this.clusteredSitesLayer.setSource(source)
  }

  render() {
    const { ahocevarBaseMap, clusteredSitesLayer, updateMapLayer } = this

    return (
      <OpenLayers
        viewOptions={{
          zoom: 3
        }}
        layers={[ahocevarBaseMap, clusteredSitesLayer]}
        render={({ map }) => (
          <>
            {/* Side menus */}
            <Info position={1} />
            <Filter
              position={2}
              map={map}
              updateMapLayer={updateMapLayer}
              data={{
                sites: this.sites,
                xrefSitesNetworks: this.xrefSitesNetworks,
                networks: this.networks,
                xrefNetworksVariables: this.xrefNetworksVariables,
                variables: this.variables,
                xrefProtocolsVariables: this.xrefProtocolsVariables,
                protocols: this.protocols
              }}
            />
            <Reporting position={3} />

            {/* No UI */}
            <Popups map={map} />
          </>
        )}
      />
    )
  }
}
