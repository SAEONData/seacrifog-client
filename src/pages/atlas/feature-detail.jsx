import React from 'react'
import DataQuery from '../../modules/data-query'
import { SITES } from '../../graphql/queries'
import PieChart from './pie-chart'
import { FeaturePanel } from '@saeon/atlas'

export default ({ getFeatureIds, toolbarActions = [] }) => (
  <DataQuery query={SITES} variables={{ ids: getFeatureIds() }}>
    {({ sites }) => (
      <FeaturePanel
        title={getFeatureIds().length + ' Sites selected'}
        footerActions={<div style={{ margin: 0, lineHeight: '24px' }}>Apache ECharts v4.3</div>}
        toolbarActions={toolbarActions}
      >
        <PieChart sites={sites} />
      </FeaturePanel>
    )}
  </DataQuery>
)
