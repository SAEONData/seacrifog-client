import React, { PureComponent } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import { mergeLeft } from 'ramda'
import { defaults as defaultControls } from 'ol/control.js'
import debounce from '../../lib/debounce'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.map = null
    this.mapRef = React.createRef()
  }

  async componentDidMount() {
    this.map = new Map({
      target: this.mapRef.current,
      layers: [...this.props.layers],
      controls: defaultControls({
        zoom: false,
        rotateOptions: false,
        rotate: false,
        attribution: false
      }).extend([
        // Specify controls externally to this component?
      ]),
      view: new View(
        mergeLeft(
          this.props.viewOptions || {},
          // Some sensible/required defaults
          {
            center: [0, 0],
            zoom: 2.5,
            projection: 'EPSG:4326'
          }
        )
      )
    })
  }

  render() {
    window.addEventListener('nav-resize', debounce(() => this.map.updateSize(), 400))

    return <div style={{ width: '100%', height: '100%' }} ref={this.mapRef} />
  }
}
