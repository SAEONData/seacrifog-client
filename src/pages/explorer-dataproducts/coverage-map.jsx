import React from 'react'
import OpenLayers from '../../modules/open-layers'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import { OSM, Vector as VectorSource } from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON.js'
import { Fill, Stroke, Style } from 'ol/style.js'
import { fromLonLat } from 'ol/proj.js'

// const workingExample = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Polygon',
//         coordinates: [[fromLonLat([-26, -40]), fromLonLat([-26, 38]), fromLonLat([64, 38]), fromLonLat([64, -40]), fromLonLat([-26, -40])]]
//       }
//     }
//   ]
// }

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
          color: 'blue',
          lineDash: [4],
          width: 3
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.1)'
        })
      })
    })
  ]
  return <OpenLayers layers={layers} />
}
