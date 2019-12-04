import React from 'react'
import DataQuery from '../../modules/data-query'
import { SITES_MIN } from '../../graphql/queries'
import { Map, ahocevarBaseMap } from '@saeon/atlas'
import { Vector as VectorLayer } from 'ol/layer.js'
import { Vector as VectorSource } from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON.js'
import { Fill, Style, Circle as CircleStyle } from 'ol/style.js'

const SitesMap = ({ geoJson }) => (
  <Map
    style={{ height: '100%' }}
    layers={[
      ahocevarBaseMap(),
      new VectorLayer({
        source: new VectorSource({
          features: new GeoJSON().readFeatures(geoJson)
        }),
        style: new Style({
          image: new CircleStyle({
            radius: 1,
            fill: new Fill({ color: '#212b61' }),
            stroke: null
          })
        })
      })
    ]}
  />
)

export default () => (
  <DataQuery query={SITES_MIN} variables={{}}>
    {({ sites }) => {
      const geoJson = {
        type: 'GeometryCollection',
        geometries: sites.reduce((sites, site) => (site.xyz ? [...sites, JSON.parse(site.xyz)] : [...sites]), [])
      }
      return <SitesMap geoJson={geoJson} />
    }}
  </DataQuery>
)
