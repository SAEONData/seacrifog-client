import React, { PureComponent } from 'react'
import FilterState from './filter-state'
import FeatureDetail from './feature-detail'
import { Map, clusterSource, clusterLayer, ahocevarBaseMap, SingleFeatureSelector } from '@saeon/atlas'
import { SideMenu, DropdownSelect } from '../../modules/shared-components'
import sift from 'sift'
import { Button } from 'react-md'

const sideMenuContentStyle = { paddingLeft: '24px', paddingRight: '24px' }

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
    this.clusteredSitesLayer = clusterLayer(this.clusteredSites, 'sites')
    this.layers = [ahocevarBaseMap(), this.clusteredSitesLayer]
  }

  render() {
    const { data, layers } = this
    const { selectedNetwork, selectedProtocol, selectedVariable, updateForm } = this.props

    return (
      <Map style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} layers={layers}>
        {({ map }) => (
          <FilterState
            map={map}
            updateMapLayer={({ source }) => this.clusteredSitesLayer.setSource(source)}
            data={data}
            updateForm={updateForm}
            selectedNetwork={selectedNetwork}
            selectedVariable={selectedVariable}
            selectedProtocol={selectedProtocol}
          >
            {({ updateFilters, refreshFilters, filters, anyActiveFilters }) => (
              <>
                {/* Side Filter */}
                <SideMenu
                  toolbarActions={[
                    <Button disabled={anyActiveFilters ? false : true} primary onClick={refreshFilters} icon>
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
                      search
                    </Button>
                  )}
                >
                  <div style={sideMenuContentStyle}>
                    {filters.map(filter => (
                      <DropdownSelect key={filter.id} {...filter} onItemToggle={updateFilters} />
                    ))}
                  </div>
                </SideMenu>

                {/* Feature click panel */}
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
                <SingleFeatureSelector map={map}>
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
                            <Button onClick={() => alert('TODO')} icon>
                              save_alt
                            </Button>,
                            <Button onClick={unselectFeature} icon>
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
              </>
            )}
          </FilterState>
        )}
      </Map>
    )
  }
}
