import React from 'react'
import { Card, Button, Toolbar, NavigationDrawer, CardText } from 'react-md'
import DataQuery from '../../../../data-query'
import { SITES } from '../../../../../graphql/queries'
import PieChart from './pie-chart'
import { pickBy } from 'ramda'

export default ({ feature, close }) => (
  <DataQuery query={SITES} variables={{ ids: feature.get('features').map(feature => feature.get('id')) }}>
    {({ sites }) => {
      return (
        <Card style={{ height: '100%' }} className="better-box-shadow">
          <Toolbar
            colored
            title={feature.get('features').length + ' Sites selected'}
            actions={[
              <Button onClick={() => alert('TODO')} icon>
                share
              </Button>,
              <Button onClick={() => alert('TODO')} icon>
                picture_as_pdf
              </Button>,
              <Button onClick={() => alert('TODO')} icon>
                save_alt
              </Button>,
              <Button onClick={close} icon>
                close
              </Button>
            ]}
          />
          <CardText style={{ height: 'calc(100% - 86px)' }}>
            <PieChart
              a={'Sites'}
              deviceSize={pickBy(
                (v, k) => ['mobile', 'tablet', 'desktop'].includes(k),
                NavigationDrawer.getCurrentMedia()
              )}
              sets={['Networks', 'Variables']}
              data={sites}
            />
          </CardText>
          <Toolbar
            style={{ fontSize: '12px', height: '24px' }}
            actions={<div style={{ margin: 0, lineHeight: '24px' }}>Apache ECharts v4.3</div>}
            colored
          />
        </Card>
      )
    }}
  </DataQuery>
)
