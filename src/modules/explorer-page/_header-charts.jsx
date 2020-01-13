import React from 'react'
import { Cell, Collapse, Grid, Button } from 'react-md'
import { useQuery } from '@apollo/react-hooks'
import ExplorerHeaderChart from './_header-chart'

const enabledColor = '#d1e2ed'

export default ({ collapsed, chartDefinitions, setChartType, chartType, variables }) => {
  return (
    <>
      <Collapse collapsed={collapsed}>
        <>
          <div style={{ width: '100%', backgroundColor: 'white' }}>
            <Button
              onClick={() => {
                setChartType('pie')
              }}
              tooltipLabel=""
              style={{ backgroundColor: chartType === 'pie' ? enabledColor : '' }}
              primary
              icon
            >
              pie_chart
            </Button>
            <Button
              onClick={() => {
                setChartType('bar')
              }}
              style={{ backgroundColor: chartType === 'bar' ? enabledColor : '' }}
              primary
              icon
            >
              bar_chart
            </Button>
          </div>
          <Grid style={{ backgroundColor: '#EEEEEE' }}>
            {Object.entries(chartDefinitions).map(
              ([, { title, subtitle, query, queryVariable, entryName, entryValue }], i) => (
                <ExplorerHeaderChart
                  id={'explorer-chart' + i}
                  key={'explorer-chart' + i}
                  title={title}
                  subtitle={subtitle}
                  chartType={chartType}
                  setChartType={setChartType}
                  query={query}
                  queryVariable={queryVariable}
                  variables={variables}
                  entryName={entryName}
                  entryValue={entryValue}
                />
              )
            )}
          </Grid>
        </>
      </Collapse>
    </>
  )
}
