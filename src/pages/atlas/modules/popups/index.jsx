// https://openlayers.org/en/latest/examples/overlay.html

import React, { PureComponent } from 'react'
import Overlay from 'ol/Overlay'
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.map = this.props.map
    this.popupRef = React.createRef()
  }

  componentDidMount() {
    const self = this
    this.overlay = new Overlay({
      element: this.popupRef.current
    })

    this.map.addOverlay(this.overlay)

    // Pointer cursor
    this.map.on('pointermove', function(e) {
      const hit =
        self.map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
          feature.setStyle(
            new Style({
              image: new CircleStyle({
                radius: 10,
                stroke: new Stroke({
                  color: '#fff'
                }),
                fill: new Fill({
                  color: 'rgba(51, 153, 204, 0.5)'
                })
              }),
              text: new Text({
                text: '!',
                fill: new Fill({
                  color: '#fff'
                })
              })
            })
          )
          return true
        }) || false
      if (hit) {
        this.getTarget().style.cursor = 'pointer'
      } else {
        this.getTarget().style.cursor = ''
      }
    })

    // Add click handler
    this.map.on('click', function(e) {
      const features = []
      self.map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
        features.push(feature)
      })
      if (features.length) {
        const coordinate = e.coordinate
        self.overlay.setPosition(coordinate)
      }
    })
  }

  render() {
    const { popupRef } = this

    return (
      <div>
        <div ref={popupRef} style={{ zIndex: 1000, fontSize: '32px' }}>
          You clicked me{' '}
          <span role="img" aria-label="testing">
            🤨
          </span>
        </div>
      </div>
    )
  }
}
