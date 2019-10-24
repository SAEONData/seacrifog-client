import React, { PureComponent } from 'react'
import DataQuery from '../../modules/data-query'
import { ENTIRE_GRAPH } from '../../graphql/queries'
import SideMenuFilter from './side-menu-filter'
import { Map, clusterSource, clusterLayer, ahocevarBaseMap } from '../../modules/atlas'
import sift from 'sift'

class AtlasController extends PureComponent {
  constructor(props) {
    super(props)
    const data = {}
    this.data = data

    // Specify the data
    data.sites = props.data.sites
    data.xrefSitesNetworks = props.data.xrefSitesNetworks
    data.networks = props.data.networks.filter(sift({ id: { $in: data.xrefSitesNetworks.map(x => x.network_id) } }))
    data.xrefNetworksVariables = props.data.xrefNetworksVariables.filter(
      sift({ network_id: { $in: data.networks.map(x => x.id) } })
    )
    data.variables = props.data.variables.filter(
      sift({ id: { $in: data.xrefNetworksVariables.map(x => x.variable_id) } })
    )
    data.xrefProtocolsVariables = props.data.xrefProtocolsVariables.filter(
      sift({ variable_id: { $in: data.variables.map(v => v.id) } })
    )
    data.protocols = props.data.protocols.filter(
      sift({ id: { $in: data.xrefProtocolsVariables.map(x => x.protocol_id) } })
    )

    // Create layers
    this.clusteredSites = clusterSource(data.sites)
    this.clusteredSitesLayer = clusterLayer(this.clusteredSites)
    this.layers = [ahocevarBaseMap, this.clusteredSitesLayer]
  }

  updateMapLayer = ({ source }) => {
    this.clusteredSitesLayer.setSource(source)
  }

  render() {
    const { data, layers } = this

    return (
      <Map layers={layers} data={data}>
        {({ map }) => (
          <>
            <SideMenuFilter position={1} map={map} updateMapLayer={this.updateMapLayer} data={data} />
          </>
        )}
      </Map>
    )
  }
}

export default () => (
  <DataQuery query={ENTIRE_GRAPH} variables={{}}>
    {data => <AtlasController data={data} />}
  </DataQuery>
)
