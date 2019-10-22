import React from 'react'
import { Card, Button, Toolbar, NavigationDrawer, CardText } from 'react-md'
import DataQuery from '../../../../modules/data-query'
import { SITES } from '../../../../graphql/queries'
import PieChart from './pie-chart'
import { pickBy } from 'ramda'

export default ({ feature, close }) => (
  <DataQuery query={SITES} variables={{ ids: feature.get('features').map(feature => feature.get('id')) }}>
    {({ sites }) => {
      return (
        <Card style={{ height: '100%' }} className="better-box-shadow">
          <Toolbar colored title={feature.get('features').length + ' Sites selected'}>
            <Button onClick={close} style={{ position: 'absolute', top: 10, right: 10 }} icon>
              close
            </Button>
          </Toolbar>
          <CardText style={{ height: 'calc(100% - 64px)' }}>
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
        </Card>
      )
    }}
  </DataQuery>
)
