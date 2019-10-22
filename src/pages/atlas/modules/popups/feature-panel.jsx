import React from 'react'
import { Card, Button, Toolbar, NavigationDrawer, CardText } from 'react-md'
import DataQuery from '../../../../modules/data-query'
import { SITES } from '../../../../graphql/queries'
import PieChart from './pie-chart'
import { pickBy } from 'ramda'

export default ({ feature, close }) => (
  <DataQuery query={SITES} variables={{ ids: feature.get('features').map(feature => feature.get('id')) }}>
    {({ sites }) => {
      const networks = {}
      const variables = {}
      for (const site of sites) {
        for (const network of site.networks) {
          if (!networks[network.acronym]) networks[network.acronym] = new Set()
          networks[network.acronym].add(site.id)
          for (const variable of network.variables) {
            if (!variables[variable.name]) variables[variable.name] = new Set()
            variables[variable.name].add(site.id)
          }
        }
      }

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
              data={[
                {
                  name: 'Networks',
                  dataset: Object.entries(networks)
                    .map(([name, set]) => ({ name, value: set.size, selected: false }))
                    .sort((a, b) => (a.value >= b.value ? -1 : 1))
                },
                {
                  name: 'Variables',
                  dataset: Object.entries(variables)
                    .map(([name, set]) => ({ name, value: set.size, selected: false }))
                    .sort((a, b) => (a.value >= b.value ? -1 : 1))
                }
              ]}
            />
          </CardText>
        </Card>
      )
    }}
  </DataQuery>
)
