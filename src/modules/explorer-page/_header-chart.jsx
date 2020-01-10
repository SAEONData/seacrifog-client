import React from 'react'
import { Card, Cell, CardText, CardTitle } from 'react-md'
import ECharts from 'echarts-for-react'
import echartsTheme from '../../lib/echarts-theme'
import { cardStyle } from './_shared'
import { useQuery } from '@apollo/react-hooks'

//function component version:
export default ({ query, queryVariable, variables, chartType, title, subtitle, entryName, entryValue }) => {
  //quer
  var queryResult = {}
  queryResult = useQuery(query, { variables })
  var data = {}
  if (queryResult.data) {
    data = queryResult.data[queryVariable].map(r => ({ value: r[entryValue], name: r[entryName] }))
  }
  return (
    <>
      <Cell>
        <Card style={cardStyle}>
          <CardTitle title={title} subtitle={subtitle} />
          {chartType === 'pie' ? (
            <ECharts
              notMerge={true}
              lazyUpdate={false}
              theme={echartsTheme}
              onEvents={{
                click: () => {
                  console.log('pie slice clicked!')
                }
              }}
              option={{
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
              notMerge={true}
              lazyUpdate={false}
              theme={echartsTheme}
              onEvents={{
                click: () => {
                  console.log('bar clicked!')
                }
              }}
              option={{
                title: { text: 'my title', show: true },
                xAxis: {
                  type: 'category',
                  data: Object.values(data).map(entry => entry.name)
                },
                yAxis: { type: 'value' },
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
