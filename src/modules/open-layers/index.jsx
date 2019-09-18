import React, { PureComponent } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import { defaults as olControls } from 'ol/control.js'
import { fromLonLat } from 'ol/proj.js'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.map = null
    this.mapRef = React.createRef()
  }

  async componentDidMount() {
    this.map = new Map({
      target: this.mapRef.current,
      layers: this.props.layers,
      controls: olControls({
        zoom: false,
        rotateOptions: false,
        rotate: false,
        attribution: false
      }),
      view: new View({
        center: fromLonLat([23, -29.2]),
        zoom: 2.5
      })
    })
  }

  render() {
    return <div style={{ width: '100%', height: '100%' }} ref={this.mapRef} />
  }
}
