import React from 'react'
import { OpenLayers } from '../lib/open-layers'

export default ({ layers, children, viewOptions }) => (
  <OpenLayers viewOptions={viewOptions} layers={layers} children={({ map }) => children({ map })} />
)
