import React, { PureComponent } from 'react'
import DataQuery from '../../modules/data-query'
import { ENTIRE_GRAPH } from '../../graphql/queries'
import { TextField } from 'react-md'
import OpenLayers from '../../modules/open-layers'
import AtlasUI from './ui'
import AtlasLayers from './layers'

export default class extends PureComponent {
  render() {
    return (
      <DataQuery query={ENTIRE_GRAPH} variables={{}}>
        {data => (
          <AtlasLayers {...data}>
            {({ baseMap, clusteredSites, clusteredSitesLayer }) => (
              <AtlasUI
                tools={[
                  <TextField
                    autoComplete="off"
                    key={'site-search'}
                    style={{ width: '100%' }}
                    id="atlas-search-field-sites"
                    label="Search sites"
                    placeholder="(by name)"
                    fullWidth={true}
                  />
                ]}
              >
                <OpenLayers
                  viewOptions={{
                    zoom: 3
                  }}
                  layers={[baseMap, clusteredSitesLayer]}
                />
              </AtlasUI>
            )}
          </AtlasLayers>
        )}
      </DataQuery>
    )
  }
}
