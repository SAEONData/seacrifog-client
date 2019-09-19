import React from 'react'
import OpenLayers from '../../modules/open-layers'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import { OSM, Vector as VectorSource } from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON.js'
import { Fill, Stroke, Style } from 'ol/style.js'

export default ({ geoJson }) => {
  const layers = [
    new TileLayer({
      source: new OSM({})
    }),
    new VectorLayer({
      source: new VectorSource({
        features: new GeoJSON('EPSG:4326').readFeatures(geoJson)
      }),
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(243, 117, 31)',
          lineDash: [0],
          width: 1
        }),
        fill: new Fill({
          color: 'rgba(243, 117, 31, 0.2)'
        })
      })
    })
  ]
  return (
    <OpenLayers
      viewOptions={{
        zoom: 3
      }}
      layers={layers}
    />
  )
}
