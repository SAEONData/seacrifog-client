import React, { PureComponent } from 'react'
import DataQuery from '../../modules/data-query'
import { ENTIRE_GRAPH, SITES } from '../../graphql/queries'
import { pickBy } from 'ramda'
import SideMenuFilter from './side-menu-filter'
import {
  Map,
  clusterSource,
  clusterLayer,
  ahocevarBaseMap,
  FeatureSelector,
  FeaturePanel,
  PieChart
} from '../../modules/atlas'
import sift from 'sift'
import echartsTheme from '../../lib/echarts-theme'
import { Button, NavigationDrawer } from 'react-md'

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
      <Map className={'md-toolbar-relative'} viewOptions={this.viewOptions} layers={layers}>
        {({ map }) => (
          <>
            <SideMenuFilter position={1} map={map} updateMapLayer={this.updateMapLayer} data={data} />
            <FeatureSelector map={map}>
              {({ selectedFeature, closePanel }) =>
                selectedFeature ? (
                  <div
                    style={{
                      zIndex: 1,
                      position: 'absolute',
                      margin: '12px 0 12px 12px',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 64,
                      display: selectedFeature ? 'inherit' : 'none',
                      opacity: 0.8
                    }}
                  >
                    <DataQuery
                      query={SITES}
                      variables={{ ids: selectedFeature.get('features').map(feature => feature.get('id')) }}
                    >
                      {({ sites }) => (
                        <FeaturePanel
                          title={selectedFeature.get('features').length + ' Sites selected'}
                          footerActions={<div style={{ margin: 0, lineHeight: '24px' }}>Apache ECharts v4.3</div>}
                          toolbarActions={[
                            <Button onClick={() => alert('TODO')} icon>
                              share
                            </Button>,
                            <Button onClick={() => alert('TODO')} icon>
                              picture_as_pdf
                            </Button>,
                            <Button onClick={() => alert('TODO')} icon>
                              save_alt
                            </Button>,
                            <Button onClick={closePanel} icon>
                              close
                            </Button>
                          ]}
                        >
                          <PieChart
                            a={'Sites'}
                            theme={echartsTheme}
                            deviceSize={pickBy(
                              (v, k) => ['mobile', 'tablet', 'desktop'].includes(k),
                              NavigationDrawer.getCurrentMedia()
                            )}
                            sets={['Networks', 'Variables']}
                            data={sites}
                          />
                        </FeaturePanel>
                      )}
                    </DataQuery>
                  </div>
                ) : (
                  ''
                )
              }
            </FeatureSelector>
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
