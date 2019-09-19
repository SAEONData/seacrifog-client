import React from 'react'
import OpenLayers from '../../modules/open-layers'
import { Tile as TileLayer } from 'ol/layer.js'
import { OSM } from 'ol/source'

export default () => {
  const layers = [
    new TileLayer({
      source: new OSM({})
    })
  ]
  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
      <OpenLayers
        viewOptions={{
          zoom: 3
        }}
        layers={layers}
      />
    </div>
  )
}
