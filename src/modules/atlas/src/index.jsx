import React from 'react'
import { OpenLayers } from '../lib/open-layers'
import Popups from './modules/popups'

export default props => (
  <OpenLayers
    viewOptions={{
      zoom: 3
    }}
    layers={props.layers}
    render={({ map }) => (
      <>
        <Popups map={map} />
        {props.children({ map })}
      </>
    )}
  />
)
