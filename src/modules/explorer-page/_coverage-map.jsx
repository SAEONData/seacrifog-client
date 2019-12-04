import React from 'react'
import { Map } from '@saeon/atlas'
import { polygonStyle } from '../atlas/styles'
import { geoJsonLayer, ahocevarBaseMap } from '../atlas/layers'

export default ({ geoJson }) => {
  const features = geoJson ? geoJsonLayer({ geoJson, style: polygonStyle() }) : null

  const layers = [ahocevarBaseMap()]
  if (features) layers.push(features)
  return <Map style={{ height: '100%' }} layers={layers} />
}
