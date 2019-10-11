import React, { PureComponent } from 'react'
import Overlay from 'ol/Overlay'
import { Card, CardTitle, CardText } from 'react-md'
import debounce from '../../../../lib/debounce'
import { resetClusterLayerOpacity, clusterStyleHovered } from '../../open-layers'

export default class extends PureComponent {
  state = {
    panelVisible: false
  }

  constructor(props) {
    super(props)
    this.map = this.props.map
    this.popupRef = React.createRef()
  }

  componentDidMount() {
    this.popupOverlay = new Overlay({
      element: this.popupRef.current
    })

    this.map.addOverlay(this.popupOverlay)

    // Pointer cursor
    this.map.on(
      'pointermove',
      debounce(e => {
        const hit = this.map.forEachFeatureAtPixel(e.pixel, (feature, layer) => ({ layer, feature })) || false
        if (hit) {
          this.layer = hit.layer
          e.target.getTarget().style.cursor = 'pointer'
          hit.feature.setStyle(clusterStyleHovered(hit.feature))
        } else {
          e.target.getTarget().style.cursor = ''
          if (this.layer) resetClusterLayerOpacity(this.layer)
        }
      }, 0)
    )

    // Add click handler
    this.map.on('click', e => {
      const features = []
      this.map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
        features.push(feature)
      })
      if (features.length) {
        this.setState({ panelVisible: true })
        const coordinate = e.coordinate
        this.popupOverlay.setPosition(coordinate)
      } else {
        this.setState({ panelVisible: false })
      }
    })
  }

  render() {
    const { panelVisible } = this.state
    const { popupRef } = this

    return (
      <div>
        <div
          style={{
            zIndex: 1000,
            position: 'absolute',
            margin: '12px 0 0 12px',
            display: panelVisible ? 'inherit' : 'none'
          }}
        >
          <Card className="better-box-shadow">
            <CardTitle title="Site Summary" />
            <CardText>
              <p>Chart?</p>
              <p>Links?</p>
              <p>What else?</p>
            </CardText>
          </Card>
        </div>
        <div ref={popupRef} style={{ zIndex: 1000 }}>
          <Card className="better-box-shadow">
            <CardTitle title="Card Title" />
            <CardText>
              You clicked me
              <span role="img" aria-label="testing">
                🤨
              </span>
            </CardText>
          </Card>
        </div>
      </div>
    )
  }
}
