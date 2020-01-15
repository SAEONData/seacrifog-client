import React, { useState } from 'react'
import { Card, Cell, Button, Toolbar } from 'react-md'
import ECharts from 'echarts-for-react'
import echartsTheme from '../../lib/echarts-theme'
import { cardStyle } from './_shared'
import { useQuery } from '@apollo/react-hooks'

const enabledColor = 'rgba(255,255,255,0.3)'
export default ({ query, queryVariable, variables, title, entryName, entryValue }) => {
  const [chartType, setChartType] = useState('pie')

  var queryResult = {}
  queryResult = useQuery(query, { variables })
  var data = {}
  var showLabels = true
  if (queryResult.data) {
    data = queryResult.data[queryVariable].map(r => ({ value: r[entryValue], name: r[entryName] }))
    if (data.length > 20) showLabels = false
  }
  return (
    <>
      <Cell phoneSize={4} tabletSize={8} size={6}>
        <Card style={cardStyle}>
          <div style={{ border: '1px solid #00796b' }}>
            {/* TOOLBAR */}
            <Toolbar
              style={{ height: '46px', alignItems: 'center' }}
              colored
              title={title}
              actions={[
                <Button
                  key={0}
                  onClick={() => {
                    setChartType('pie')
                  }}
                  style={{
                    backgroundColor: chartType === 'pie' ? enabledColor : ''
                  }}
                  icon
                >
                  pie_chart
                </Button>,
                <Button
                  key={1}
                  onClick={() => {
                    setChartType('bar')
                  }}
                  style={{
                    backgroundColor: chartType === 'bar' ? enabledColor : ''
                  }}
                  icon
                >
                  bar_chart
                </Button>
              ]}
            />
            {/* PIE CHART */}
            {chartType === 'pie' ? (
              <ECharts
                theme={echartsTheme}
                onEvents={{
                  click: () => {
                    console.log('pie slice clicked!')
                  }
                }}
                option={{
                  tooltip: { show: true },

                  series: [
                    {
                      minShowLabelAngle: 6,
                      center: ['50%', '57%'],
                      data: data,
                      type: 'pie'
                    }
                  ]
                }}
              />
            ) : // BAR CHART
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
                  yAxis: {
                    type: 'category',
                    data: Object.values(data).map(entry => entry.name),
                    axisLabel: { show: false }
                  },
                  grid: {
                    top: '20',
                    bottom: '30',
                    right: '5%',
                    left: '14%'
                  },
                  series: [
                    {
                      label: {
                        show: showLabels,
                        position: 'insideLeft',
                        formatter: '{b}',
                        color: 'black'
                      },
                      data: data,
                      type: 'bar'
                    }
                  ]
                }}
              />
            ) : (
              // UNSUPPORTED CHART
              <p style={{ color: 'red' }}>Unsupported chart type!</p>
            )}
          </div>
        </Card>
      </Cell>
    </>
  )
}
