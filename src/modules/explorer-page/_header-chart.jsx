import React, { useState } from 'react'
import { Card, Cell, Button, Toolbar } from 'react-md'
import ECharts from 'echarts-for-react'
import echartsTheme from '../../lib/echarts-theme'
import { cardStyle } from './_shared'

const enabledColor = 'rgba(255,255,255,0.3)'
export default ({ data, title }) => {
  //state
  const [chartType, setChartType] = useState('pie')
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
                    data: data,
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
                        show: data.length > 20 ? false : true, //bar charts with more than 20 rows start to overlap text. A better approach would be basing show on row height
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
