import React from 'react'
import { Map } from '@saeon/atlas'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import { Vector as VectorSource } from 'ol/source'
import TileWMS from 'ol/source/TileWMS'
import GeoJSON from 'ol/format/GeoJSON.js'
import { Fill, Stroke, Style } from 'ol/style.js'

export default ({ geoJson }) => {
  const layers = [
    new TileLayer({
      source: new TileWMS({
        url: 'https://ahocevar.com/geoserver/wms',
        params: {
          LAYERS: 'ne:NE1_HR_LC_SR_W_DR',
          TILED: true
        }
      })
    }),
    new VectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures(geoJson)
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
  return <Map layers={layers} />
}
