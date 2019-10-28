import React from 'react'
import { SideMenu } from '../../modules/atlas'
import DataQuery from '../../modules/data-query'
import { SITES } from '../../graphql/queries'
import PieChart from './pie-chart'
import echartsTheme from '../../lib/echarts-theme'
import { FeaturePanel } from '../../modules/atlas'
import { pickBy } from 'ramda'
import { Button, NavigationDrawer } from 'react-md'

const FilteredFeatureSummary = ({ map }) => {
  let layer = null
  map.getLayers().forEach(l => (layer = l.get('id') === 'sites' ? l : layer))
  const ids = layer
    .getSource()
    .getFeatures()
    .map(feature => feature.get('features'))
    .flat()
    .map(feature => feature.get('id'))
  return (
    <DataQuery query={SITES} variables={{ ids }}>
      {({ sites }) => (
        <FeaturePanel
          title={ids.length + ' Sites selected'}
          footerActions={<div style={{ margin: 0, lineHeight: '24px' }}>Apache ECharts v4.3</div>}
          toolbarActions={[
            <Button onClick={() => alert('TODO')} icon>
              share
            </Button>,
            <Button onClick={() => alert('TODO')} icon>
              picture_as_pdf
            </Button>,
            <Button onClick={() => alert('TODO')} icon>
              save_alt
            </Button>
          ]}
        >
          <PieChart
            a={'Sites'}
            theme={echartsTheme}
            deviceSize={pickBy(
              (v, k) => ['mobile', 'tablet', 'desktop'].includes(k),
              NavigationDrawer.getCurrentMedia()
            )}
            sets={[
              {
                name: 'networks',
                field: 'acronym'
              },
              {
                name: 'variables',
                field: 'name'
              }
            ]}
            data={sites}
          />
        </FeaturePanel>
      )}
    </DataQuery>
  )
}

export default props => {
  return (
    <SideMenu
      transitionDuration={4000}
      style={{ minWidth: '100%', overflowY: 'auto', zIndex: 999 }}
      itemsStyle={{ padding: 0, height: 'calc(100% - 67px)' }}
      icon={'pie_chart'}
      toolbarActions={[]}
      items={[<FilteredFeatureSummary key={1} map={props.map} />]}
    />
  )
}
