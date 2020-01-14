import React from 'react'
import { Collapse, Grid } from 'react-md'
import ExplorerHeaderChart from './_header-chart'

export default ({ collapsed, chartDefinitions, variables }) => {
  return (
    <Collapse collapsed={collapsed}>
      <Grid style={{ backgroundColor: '#EEEEEE' }}>
        {Object.entries(chartDefinitions).map(([, { title, query, queryVariable, entryName, entryValue }], i) => (
          <ExplorerHeaderChart
            id={'explorer-chart' + i}
            key={'explorer-chart' + i}
            title={title}
            query={query}
            queryVariable={queryVariable}
            variables={variables}
            entryName={entryName}
            entryValue={entryValue}
          />
        ))}
      </Grid>
    </Collapse>
  )
}
