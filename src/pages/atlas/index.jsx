import React, { Component } from 'react'
import DataQuery from '../../modules/data-query'
import { ENTIRE_GRAPH } from '../../graphql/queries'
import FilterState from './filter-state'
import FeatureDetail from './feature-detail'
import {
  Map,
  clusterSource,
  clusterLayer,
  ahocevarBaseMap,
  FeatureSelector,
  SideMenu,
  DropdownSelect
} from '../../modules/atlas'
import sift from 'sift'
import { Button } from 'react-md'

const sideMenuContentStyle = { paddingLeft: '24px', paddingRight: '24px' }

class AtlasController extends Component {
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
    this.clusteredSites = clusterSource(data.sites)
    this.clusteredSitesLayer = clusterLayer(this.clusteredSites, 'sites')
    this.layers = [ahocevarBaseMap, this.clusteredSitesLayer]
  }

  updateMapLayer = ({ source }) => {
    this.clusteredSitesLayer.setSource(source)
  }

  render() {
    const { data, layers } = this

    return (
      <Map
        style={{ display: 'flex', flexDirection: 'column', margin: 0, float: 'right' }}
        className={'md-toolbar-relative'}
        viewOptions={this.viewOptions}
        layers={layers}
      >
        {({ map }) => (
          <FilterState map={map} updateMapLayer={this.updateMapLayer} data={data}>
            {({ updateFilters, refreshFilters, filters, anyActiveFilters }) => (
              <>
                {/* Side Filter */}
                <SideMenu
                  icon={'search'}
                  toolbarActions={[
                    <Button disabled={anyActiveFilters ? false : true} primary onClick={refreshFilters} icon>
                      refresh
                    </Button>
                  ]}
                >
                  <div style={sideMenuContentStyle}>
                    {filters.map(filter => (
                      <DropdownSelect key={filter.id} {...filter} onItemToggle={updateFilters} />
                    ))}
                  </div>
                </SideMenu>

                {/* Feature click panel */}
                <SideMenu style={{ minWidth: '100%', overflowY: 'auto', zIndex: 999 }} icon={'bar_chart'}>
                  <div style={{ padding: 0, height: 'calc(100% - 67px)' }}>
                    <FeatureDetail
                      toolbarActions={[
                        <Button onClick={() => alert('TODO')} icon>
                          save_alt
                        </Button>
                      ]}
                      getFeatureIds={() => {
                        let layer = null
                        map.getLayers().forEach(l => (layer = l.get('id') === 'sites' ? l : layer))
                        return layer
                          .getSource()
                          .getFeatures()
                          .map(feature => feature.get('features'))
                          .flat()
                          .map(feature => feature.get('id'))
                      }}
                      map={map}
                    />
                  </div>
                </SideMenu>

                {/* Feature click panel */}
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
                        <FeatureDetail
                          toolbarActions={[
                            <Button onClick={() => alert('TODO')} icon>
                              save_alt
                            </Button>,
                            <Button onClick={closePanel} icon>
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
                </FeatureSelector>
              </>
            )}
          </FilterState>
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
