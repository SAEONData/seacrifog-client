import React from 'react'
import DataQuery from '../../modules/data-query'
import { SITES_MIN } from '../../graphql/queries'
import { Map } from '@saeon/atlas'
import { ahocevarBaseMap, geoJsonLayer } from '../../modules/atlas/layers'
import { dotStyle1 } from '../../modules/atlas/styles'

export default () => (
  <DataQuery query={SITES_MIN} variables={{}}>
    {({ sites }) => (
      <Map
        style={{ height: '100%' }}
        layers={[
          ahocevarBaseMap(),
          geoJsonLayer({
            geoJson: {
              type: 'GeometryCollection',
              geometries: sites.reduce((sites, site) => (site.xyz ? [...sites, JSON.parse(site.xyz)] : [...sites]), [])
            },
            style: dotStyle1()
          })
        ]}
      />
    )}
  </DataQuery>
)
