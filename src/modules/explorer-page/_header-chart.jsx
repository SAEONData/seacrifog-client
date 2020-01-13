import React from 'react'
import { Card, Cell, CardText, CardTitle, Button } from 'react-md'
import ECharts from 'echarts-for-react'
import echartsTheme from '../../lib/echarts-theme'
import { cardStyle } from './_shared'
import { useQuery } from '@apollo/react-hooks'

//is this too prop reliant?
//what should happen onClick of a pie slice if anything?
//

const enabledColor = '#d1e2ed'
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
          <CardTitle title={title} subtitle={subtitle}>
            <Button
              style={{
                backgroundColor: chartType === 'pie' ? enabledColor : ''
              }}
              primary
              icon
            >
              pie_chart
            </Button>{' '}
            <Button style={{ backgroundColor: chartType === 'bar' ? enabledColor : '' }} primary icon>
              bar_chart
            </Button>
          </CardTitle>

          <Button style={{ float: 'right', backgroundColor: chartType === 'bar' ? enabledColor : '' }} primary icon>
            bar_chart
          </Button>
          <Button style={{ float: 'right', backgroundColor: chartType === 'pie' ? enabledColor : '' }} primary icon>
            pie_chart
          </Button>
          {chartType === 'pie' ? (
            // <div style={{ minHeight: '400px', backgroundColor: 'red' }}>
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
                    center: ['43%', '57%'],
                    data: data,
                    type: 'pie'
                  }
                ]
              }}
            />
          ) : // </div>
          chartType === 'bar' ? (
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
                grid: {
                  tooltip: { trigger: 'item', position: ['60%', '-10%'] },
                  top: '0',
                  bottom: '30',
                  right: '7%',
                  left: '24%'
                },
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
