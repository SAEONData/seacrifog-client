import React from 'react'
import { Card, Cell, CardText, CardTitle } from 'react-md'
import ECharts from 'echarts-for-react'
import echartsTheme from '../../lib/echarts-theme'
import { cardStyle } from './_shared'
import { useQuery } from '@apollo/react-hooks'

//is this too prop reliant?
//should the cell size be fixed instead of the default dynamic sizing?
//what should happen onClick of a pie slice if anything?
//bar chart to be looked at as it is very ugly
//
export default ({ query, queryVariable, variables, chartType, title, subtitle, entryName, entryValue }) => {
  var queryResult = {}
  queryResult = useQuery(query, { variables })
  var data = {}
  if (queryResult.data) {
    data = queryResult.data[queryVariable].map(r => ({ value: r[entryValue], name: r[entryName] }))
  }
  return (
    <>
      <Cell phoneSize={4} tabletSize={8} size={6}>
        <Card style={cardStyle}>
          <CardTitle title={title} subtitle={subtitle} />
          {chartType === 'pie' ? (
            <ECharts
              theme={echartsTheme}
              onEvents={{
                click: () => {
                  console.log('pie slice clicked!')
                  //maybe deselect this entity when clicked? maybe do nothing and stay read-only? maybe fire a method that is passed from the parent? popup a larger version of just that 1 chart?
                }
              }}
              option={{
                tooltip: { show: true },
                series: [
                  {
                    data: data,
                    type: 'pie'
                  }
                ]
              }}
            />
          ) : chartType === 'bar' ? (
            <ECharts
              theme={echartsTheme}
              onEvents={{
                click: () => {
                  console.log('bar clicked!')
                }
              }}
              option={{
                tooltip: { show: true },
                xAxis: { name: '' },
                yAxis: { type: 'category', data: Object.values(data).map(entry => entry.name) },
                grid: { top: '0', bottom: '30', right: '7%', left: '22%' },
                series: [
                  {
                    data: data,
                    type: 'bar'
                  }
                ]
              }}
            />
          ) : (
            <p style={{ color: 'red' }}>Unsupported chart type!</p>
          )}
        </Card>
      </Cell>
    </>
  )
}
