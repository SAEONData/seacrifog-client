// https://openlayers.org/en/latest/examples/overlay.html

import React, { PureComponent } from 'react'
import Overlay from 'ol/Overlay'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.map = this.props.map
    this.popupRef = React.createRef()
  }

  componentDidMount() {
    this.overlay = new Overlay({
      element: this.popupRef.current
    })

    this.map.addOverlay(this.overlay)

    // Add click handler
    this.map.on('click', e => {
      const coordinate = e.coordinate
      this.overlay.setPosition(coordinate)
    })
  }

  render() {
    const { popupRef } = this

    return (
      <div ref={popupRef} style={{ zIndex: 1000, fontSize: '32px' }}>
        You clicked me{' '}
        <span role="img" aria-label="testing">
          🤨
        </span>
      </div>
    )
  }
}

// this.map.forEachFeatureAtPixel(e.pixel, feature => {
//   console.log(feature)
// })
