import React, { PureComponent } from 'react'
import { Card, CardTitle, CardText } from 'react-md'
import DataQuery from '../../../../modules/data-query'
import { SITE } from '../../../../graphql/queries'
import { clusterStyleHovered, clusterStyle } from '../../open-layers'

const MultipleFeaturesDescription = ({ features }) => {
  console.log(features)
  return (
    <Card style={{ height: '100%' }} className="better-box-shadow">
      <CardTitle title={features.length + ' features selected'} />
      <CardText>
        <p>List of sites?</p>
        <p>List of variables measured by these sites</p>
        <p>List of networks these sites are part of</p>
        <p>List of protocols implemented at these sites?</p>
        <p>Pie chart: variables by site</p>
        <p>Pie chart: protocols by site</p>
        <p>Pie chart: networks by site</p>
        <p>Drilldown? networks -> variables - protocols</p>
      </CardText>
    </Card>
  )
}

const SingleFeatureDescription = ({ feature }) => (
  <DataQuery query={SITE} variables={{ id: feature.get('siteId') }}>
    {({ site }) => (
      <Card style={{ height: '100%' }} className="better-box-shadow">
        <CardTitle title={site.name} />
        <CardText>
          <p>Chart?</p>
          <p>Links?</p>
          <p>What else?</p>
        </CardText>
      </Card>
    )}
  </DataQuery>
)

const FeatureCard = ({ feature }) =>
  feature.get('features').length > 1 ? (
    <MultipleFeaturesDescription features={feature.get('features')} />
  ) : (
    <SingleFeatureDescription feature={feature.get('features')[0]} />
  )

export default class extends PureComponent {
  state = {
    selectedFeature: null
  }

  constructor(props) {
    super(props)
    this.map = this.props.map
    this.popupRef = React.createRef()
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
          selectedFeature.setStyle(clusterStyleHovered(feature))
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
          margin: '12px',
          top: 0,
          bottom: 0,
          display: selectedFeature ? 'inherit' : 'none',
          opacity: 0.8
        }}
      >
        <FeatureCard feature={selectedFeature} />
      </div>
    ) : (
      ''
    )
  }
}
