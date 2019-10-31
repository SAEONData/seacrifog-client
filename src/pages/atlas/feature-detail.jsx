import React from 'react'
import DataQuery from '../../modules/data-query'
import { SITES } from '../../graphql/queries'
import PieChart from './pie-chart'
import { FeaturePanel } from '../../modules/atlas'

export default ({ map, feature = null, toolbarActions = [] }) => {
  let ids
  if (feature) {
    ids = feature.get('features').map(feature => feature.get('id'))
  } else {
    let layer = null
    map.getLayers().forEach(l => (layer = l.get('id') === 'sites' ? l : layer))
    ids = layer
      .getSource()
      .getFeatures()
      .map(feature => feature.get('features'))
      .flat()
      .map(feature => feature.get('id'))
  }

  return (
    <DataQuery query={SITES} variables={{ ids }}>
      {({ sites }) => (
        <FeaturePanel
          title={ids.length + ' Sites selected'}
          footerActions={<div style={{ margin: 0, lineHeight: '24px' }}>Apache ECharts v4.3</div>}
          toolbarActions={toolbarActions}
        >
          <PieChart sites={sites} />
        </FeaturePanel>
      )}
    </DataQuery>
  )
}
