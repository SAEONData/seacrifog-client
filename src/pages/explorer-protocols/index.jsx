import React from 'react'
import { GlobalStateContext } from '../../global-state'
import DataQuery from '../../modules/data-query'
import { PROTOCOLS_MIN } from '../../graphql/queries'
import { Grid, Cell, Card } from 'react-md'
import { Table } from '../../modules/shared-components'

const dataDefinitions = {
  id: { show: false },
  title: { order: 0, show: true, label: 'Protocol' },
  author: { order: 1, show: true, grow: true, label: 'Author' },
  domain: { order: 2, show: true, label: 'Domain' },
  __typename: { show: false }
}

export default props => (
  <GlobalStateContext.Consumer>
    {({ selectedProtocols, updateSelectedProtocols }) => (
      <DataQuery query={PROTOCOLS_MIN}>
        {({ protocols }) => (
          <Grid>
            <Cell tabletSize={4} size={6}>
              <Card tableCard>
                <Table
                  toggleSelect={({ id, selected }) => {
                    console.log(id, selected)
                    let arr
                    if (selected) {
                      arr = [...new Set([...selectedProtocols, id])]
                    } else {
                      arr = selectedProtocols.filter(i => i !== id)
                      console.log(arr)
                    }
                    updateSelectedProtocols(arr)
                  }}
                  dataDefinitions={dataDefinitions}
                  data={protocols}
                />
              </Card>
            </Cell>
            <Cell tabletSize={4} size={6}>
              {JSON.stringify(selectedProtocols)}
            </Cell>
          </Grid>
        )}
      </DataQuery>
    )}
  </GlobalStateContext.Consumer>
)
