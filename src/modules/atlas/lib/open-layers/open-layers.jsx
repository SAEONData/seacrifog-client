import React, { PureComponent } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import { mergeLeft } from 'ramda'
import { defaults as defaultControls } from 'ol/control.js'

export default class extends PureComponent {
  constructor(props) {
    super(props)

    // DOM reference used by THIS component
    this.mapRef = React.createRef()

    // Create a map reference
    this.map = new Map({
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

  componentDidMount() {
    this.map.setTarget(this.mapRef.current)
  }

  componentWillUnmount() {
    this.map.dispose()
  }

  render() {
    return (
      <>
        {this.props.children({ map: this.map })}
        <div
          className="md-toolbar-relative"
          style={{ width: '100%', height: '100%', position: 'fixed', top: 0, bottom: 0 }}
          ref={this.mapRef}
        />
      </>
    )
  }
}
