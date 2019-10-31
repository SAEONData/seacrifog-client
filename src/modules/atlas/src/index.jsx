import React from 'react'
import { OpenLayers } from './open-layers'

export default ({ layers, children, viewOptions, style, className }) => (
  <OpenLayers
    style={style}
    className={className}
    viewOptions={viewOptions}
    layers={layers}
    children={children ? ({ map }) => children({ map }) : null}
  />
)
