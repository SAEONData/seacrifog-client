import React, { PureComponent } from 'react'
import { OpenLayers, clusterLayer, clusterSource, openStreetLayers, ahocevarBaseMap } from '../lib/open-layers'
import Filter from './modules/filter'
import Popups from './modules/popups'

export default class extends PureComponent {
  constructor(props) {
    super(props)

    // Create layers
    this.clusteredSites = clusterSource(this.props.data.sites)
    this.clusteredSitesLayer = clusterLayer(this.clusteredSites)
    this.ahocevarBaseMap = ahocevarBaseMap
    this.openStreetLayers = openStreetLayers
  }

  updateMapLayer = ({ source }) => {
    this.clusteredSitesLayer.setSource(source)
  }

  render() {
    const { clusteredSitesLayer, updateMapLayer, ahocevarBaseMap } = this

    return (
      <OpenLayers
        viewOptions={{
          zoom: 3
        }}
        layers={[ahocevarBaseMap, clusteredSitesLayer]}
        render={({ map }) => (
          <>
            {/* Side menus */}
            <Filter
              position={1}
              map={map}
              updateMapLayer={updateMapLayer}
              data={{
                sites: this.props.data.sites,
                xrefSitesNetworks: this.props.data.xrefSitesNetworks,
                networks: this.props.data.networks,
                xrefNetworksVariables: this.props.data.xrefNetworksVariables,
                variables: this.props.data.variables,
                xrefProtocolsVariables: this.props.data.xrefProtocolsVariables,
                protocols: this.props.data.protocols
              }}
            />

            {/* No UI */}
            <Popups map={map} />
          </>
        )}
      />
    )
  }
}
