import React, { PureComponent } from 'react'
import sift from 'sift'
import { Button } from 'react-md'
import { OlReact, SingleFeatureSelector } from '@saeon/atlas'
import { clusterLayer, ahocevarBaseMap } from '../../modules/atlas/layers'
import { clusterSource } from '../../modules/atlas/sources'
import { clusterStyle1, clusterStyle2 } from '../../modules/atlas/styles'
import { GlobalStateContext } from '../../global-state'
import { SideMenu } from '../../modules/shared-components'
import { ExplorerSideMenuFilter } from '../../modules/explorer-page'
import ApplySitesFilter from './_apply-sites-filter'
import FeatureDetail from './_feature-detail'
import downloadMapData from './_download'
import getFeatureIds from './_feature-ids'

const buttonStyle = disabled => ({
  marginLeft: '10px',
  color: disabled ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,1)'
})

export default class extends PureComponent {
  constructor(props) {
    super(props)

    // Specify the data
    const data = {}
    this.data = data
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
    this.clusteredSites = clusterSource({ data: data.sites, locAttribute: 'xyz' })
    this.clusteredSitesLayer = clusterLayer({
      source: this.clusteredSites,
      id: 'sites',
      style: clusterStyle1
    })
    this.layers = [ahocevarBaseMap(), this.clusteredSitesLayer]
  }

  render() {
    const { layers, data } = this
    const {
      sites,
      networks,
      variables,
      protocols,
      xrefSitesNetworks,
      xrefNetworksVariables,
      xrefProtocolsVariables
    } = data

    return (
      <GlobalStateContext.Consumer>
        {({ updateGlobalState, selectedSites, selectedNetworks, selectedVariables, selectedProtocols }) => (
          <OlReact style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} layers={layers}>
            {({ map }) => (
              <ApplySitesFilter
                sites={sites}
                selectedSites={selectedSites}
                selectedNetworks={selectedNetworks}
                selectedVariables={selectedVariables}
                selectedProtocols={selectedProtocols}
                xrefSitesNetworks={xrefSitesNetworks}
                xrefNetworksVariables={xrefNetworksVariables}
                xrefProtocolsVariables={xrefProtocolsVariables}
                updateMapLayer={({ source }) => this.clusteredSitesLayer.setSource(source)}
              >
                {/* Side Filter menu */}
                <SideMenu
                  toolbarActions={[
                    <Button
                      key={0}
                      disabled={
                        selectedSites.length ||
                        selectedNetworks.length ||
                        selectedVariables.length ||
                        selectedProtocols.length
                          ? false
                          : true
                      }
                      primary
                      onClick={() =>
                        updateGlobalState({
                          selectedSites: [],
                          selectedNetworks: [],
                          selectedVariables: [],
                          selectedProtocols: []
                        })
                      }
                      icon
                    >
                      refresh
                    </Button>
                  ]}
                  control={({ toggleMenu }) => (
                    <Button
                      style={{ position: 'absolute', top: 0, right: 0, margin: '10px', zIndex: 1 }}
                      swapTheming
                      primary
                      icon
                      onClick={toggleMenu}
                    >
                      filter_list
                    </Button>
                  )}
                >
                  <ExplorerSideMenuFilter
                    sites={sites}
                    networks={networks}
                    variables={variables}
                    protocols={protocols}
                  />
                </SideMenu>

                {/* Feature click panel, all shown features, WITH menu */}
                <SideMenu
                  style={{ minWidth: '100%', overflowY: 'auto', zIndex: 999 }}
                  control={({ toggleMenu }) => (
                    <Button
                      swapTheming
                      primary
                      style={{ position: 'absolute', top: 50, right: 0, margin: '10px', zIndex: 1 }}
                      icon
                      onClick={toggleMenu}
                    >
                      bar_chart
                    </Button>
                  )}
                >
                  <div style={{ padding: 0, height: 'calc(100% - 67px)' }}>
                    <FeatureDetail toolbarActions={[]} getFeatureIds={() => getFeatureIds({ map })} map={map} />
                  </div>
                </SideMenu>

                {/* Feature click panel (individual feature, no menu) */}
                <SingleFeatureSelector unselectedStyle={clusterStyle1} selectedStyle={clusterStyle2} map={map}>
                  {({ selectedFeature, unselectFeature }) =>
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
                        <FeatureDetail
                          toolbarActions={[
                            <Button
                              key={0}
                              tooltipLabel={'Download data for selected features'}
                              disabled={selectedFeature.get('features').length > 500 ? true : false}
                              onClick={async () =>
                                downloadMapData({
                                  ids: selectedFeature.get('features').map(feature => feature.get('id'))
                                })
                              }
                              icon
                              style={buttonStyle(selectedFeature.get('features').length > 500 ? true : false)}
                            >
                              save_alt
                            </Button>,
                            <Button key={1} onClick={unselectFeature} icon>
                              close
                            </Button>
                          ]}
                          getFeatureIds={() => selectedFeature.get('features').map(feature => feature.get('id'))}
                        />
                      </div>
                    ) : (
                      ''
                    )
                  }
                </SingleFeatureSelector>
              </ApplySitesFilter>
            )}
          </OlReact>
        )}
      </GlobalStateContext.Consumer>
    )
  }
}
