import React from 'react'
import { Map, ahocevarBaseMap } from '@saeon/atlas'
import { Vector as VectorLayer } from 'ol/layer.js'
import { Vector as VectorSource } from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON.js'
import { Fill, Stroke, Style } from 'ol/style.js'

export default ({ geoJson }) => {
  const layers = [
    ahocevarBaseMap(),
    new VectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures(geoJson)
      }),
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(243, 117, 31, 1)',
          lineDash: [0],
          width: 1
        }),
        fill: new Fill({
          color: 'rgba(243, 117, 31, 0.2)'
        })
      })
    })
  ]
  return <Map style={{ height: '100%' }} layers={layers} />
}
