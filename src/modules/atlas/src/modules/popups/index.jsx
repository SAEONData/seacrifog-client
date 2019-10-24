import React, { PureComponent } from 'react'
import { clusterStyle, clusterStyle2 } from '../../../lib/open-layers'
import FeaturePanel from './feature-panel'

export default class extends PureComponent {
  state = {
    selectedFeature: null
  }

  constructor(props) {
    super(props)
    this.map = this.props.map
    this.popupRef = React.createRef()
  }

  closePanel = () => {
    this.state.selectedFeature.setStyle(clusterStyle(this.state.selectedFeature))
    this.setState({ selectedFeature: null })
  }

  componentDidMount() {
    // Pointer cursor
    this.map.on('pointermove', e => {
      const hit = this.map.forEachFeatureAtPixel(e.pixel, () => true) || false
      e.target.getTarget().style.cursor = hit ? 'pointer' : ''
    })

    // Add click handler
    this.map.on('click', e => {
      const { selectedFeature } = this.state
      const feature = this.map.forEachFeatureAtPixel(e.pixel, feature => feature)
      if (selectedFeature) selectedFeature.setStyle(clusterStyle(selectedFeature))
      if (feature && feature !== selectedFeature) {
        this.setState({ selectedFeature: feature }, () => {
          const { selectedFeature } = this.state
          selectedFeature.setStyle(clusterStyle2(feature))
        })
      } else {
        if (selectedFeature) selectedFeature.setStyle(clusterStyle(selectedFeature))
        this.setState({ selectedFeature: null })
      }
    })
  }

  render() {
    const { selectedFeature } = this.state

    return selectedFeature ? (
      <div
        style={{
          zIndex: 1,
          position: 'absolute',
          margin: '12px 0 12px 12px',
          top: 0,
          bottom: 0,
          left: 0,
          right: 64,
          display: selectedFeature ? 'inherit' : 'none',
          opacity: 0.8
        }}
      >
        <FeaturePanel close={this.closePanel} feature={selectedFeature} />
      </div>
    ) : (
      ''
    )
  }
}
