import React from 'react'
import { Collapse, Grid, Cell, TabsContainer, Tabs, Tab, Avatar } from 'react-md'
import ExplorerHeaderChart from './_header-chart'
import { useQuery } from '@apollo/react-hooks'

//colors and styling used multiple times on this component. Should maybe be somewhere else
const tabBackgroundColor = '#00897B'
const tabBorderColor = 'rgba(255,255,255,0.3)'
const labelInnerColor = '#00796B'
const tabStyle = {
  backgroundColor: tabBackgroundColor,
  borderRight: '1px solid ' + tabBorderColor,
  height: 'max-content',
  padding: '7px'
}

//No overflow management currently in place. Can be an issue if Explorer pages end up with many charts(unlikely for now, 37 charts would be needed to overflow currently)
export default ({ collapsed, chartDefinitions, query, variables }) => {
  const { loading, error, data } = useQuery(query, { variables })

  //Dispay a simple empty grid while loading charts to avoid jarring movement of page:
  if (loading) {
    return (
      <Collapse collapsed={collapsed}>
        <Grid style={{ backgroundColor: '#EEEEEE' }}>
          {Object.entries(chartDefinitions).map(([, { title }], i) => {
            return <ExplorerHeaderChart id={'explorer-chart' + i} key={'explorer-chart' + i} title={title} data={{}} />
          })}
        </Grid>
      </Collapse>
    )
  }

  //display error if an error occurs:
  if (error) {
    console.log('error', error)
    return (
      <Collapse collapsed={collapsed}>
        <Grid style={{ backgroundColor: '#EEEEEE' }}>
          <Cell>
            <p>error!</p>
          </Cell>
        </Grid>
      </Collapse>
    )
  }

  //display charts:
  if (data) {
    //calculating how many tabs will be needed if there are up to 4 charts per tab
    const chartCount = Object.keys(chartDefinitions).length
    var tabCount = Math.ceil(chartCount / 4)

    //Initializing the Tabs element so that Tab elements can be appended to its children
    var chartTabs = (
      <Tabs
        id={'tabsid1'}
        style={{
          backgroundColor: tabBackgroundColor,
          border: '1px solid ' + tabBorderColor
        }}
      >{[]}</Tabs>
    )

    //appending Tab elements to Tabs as children
    for (var tabIndex = 1; tabIndex <= tabCount; tabIndex++) {
      chartTabs.props.children.push(
        <Tab
          className={'thisismyclassname'}
          id={'Tab' + tabIndex}
          key={tabIndex}
          style={tabStyle}
          icon={
            <Avatar
              key={tabIndex}
              style={{ backgroundColor: labelInnerColor, border: '1px solid ' + tabBorderColor, margin: '0px' }}
              contentStyle={{ fontSize: 20 }}
              id={'tabAvatar' + tabIndex}
            >
              {tabIndex}
            </Avatar>
          }
        >
          {/* Contents of tab (charts) */}
          <Grid style={{ backgroundColor: '#EEEEEE' }}>
            {Object.entries(chartDefinitions).map(
              ([chartIndex, { title, datafield, entryName, entryValue, dataFilter }]) => {
                data[datafield].map(r => ({ value: r[entryValue], name: r[entryName] }))
                var chartData = dataFilter(data[datafield])
                chartData = chartData.map(r => ({ value: r[entryValue], name: r[entryName] }))

                if (parseInt(chartIndex) + 1 > tabIndex * 4 - 4 && parseInt(chartIndex) + 1 <= tabIndex * 4)
                  return (
                    <ExplorerHeaderChart
                      id={'explorer-chart' + chartIndex}
                      key={'explorer-chart' + chartIndex}
                      title={title}
                      data={chartData}
                      entryName={entryName}
                      entryValue={entryValue}
                    />
                  )
                else return null
              }
            )}
          </Grid>
        </Tab>
      )
    }
    return (
      <Collapse collapsed={collapsed}>
        <>
          <TabsContainer>{chartTabs}</TabsContainer>
        </>
      </Collapse>
    )
  }
}
