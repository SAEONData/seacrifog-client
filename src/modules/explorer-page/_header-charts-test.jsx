import React, { useState, useMemo } from 'react'
import { Collapse, Grid, Cell, TabsContainer, Tabs, Tab, Avatar } from 'react-md'
import ExplorerHeaderChart from './_header-chart'
import { useQuery } from '@apollo/react-hooks'
import _headerChart from './_header-chart'

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
  // const memoCharts = useMemo(()=>{return},[])
  const { loading, error, data } = useQuery(
    query,
    { variables },
    {
      onCompleted: data => {
        // Not called
        console.log('onComplete')
      }
    }
  )
  function createHeaderCharts() {
    //Initializing the Tabs element so that Tab elements can be appended to its children
    var chartTabs = (
      <Tabs
        id={'tabsid1'}
        key={'Tabskey1'}
        tabId="tabsId1"
        style={{
          backgroundColor: tabBackgroundColor,
          border: '1px solid ' + tabBorderColor
        }}
        children={[]}
      ></Tabs>
    )
    //calculating how many tabs will be needed if there are up to 4 charts per tab
    const chartCount = Object.keys(chartDefinitions).length
    var tabCount = Math.ceil(chartCount / 4)

    //appending Tab elements to Tabs as children
    // for (var tabIndex = 1; tabIndex <= tabCount; tabIndex++) {
    //   chartTabs.props.children.push(
    //     <Tab
    //       className={'thisismyclassname'}
    //       id={'Tab' + tabIndex}
    //       key={'tabkey' + tabIndex}
    //       style={tabStyle}
    //       icon={
    //         <Avatar
    //           key={'tabAvatarkey' + tabIndex}
    //           style={{ backgroundColor: labelInnerColor, border: '1px solid ' + tabBorderColor, margin: '0px' }}
    //           contentStyle={{ fontSize: 20 }}
    //           id={'tabAvatar' + tabIndex}
    //         >
    //           {tabIndex}
    //         </Avatar>
    //       }
    //     >
    //       {/* Contents of tab (charts) */}
    //       <Grid key={'chartsGridKey' + tabIndex} id={'chartsGridId' + tabIndex} style={{ backgroundColor: '#EEEEEE' }}>
    //         {Object.entries(chartDefinitions).map(([chartIndex, { title }]) => {
    //           var chartData = [{ value: 1, name: 'loadingName' }]

    //           if (parseInt(chartIndex) + 1 > tabIndex * 4 - 4 && parseInt(chartIndex) + 1 <= tabIndex * 4)
    //             return (
    //               <ExplorerHeaderChart
    //                 id={'explorer-chart-id' + chartIndex}
    //                 key={'explorer-chart-key' + chartIndex}
    //                 title={title}
    //                 data={chartData}
    //               />
    //             )
    //           else return null
    //         })}
    //       </Grid>
    //     </Tab>
    //   )
    // }

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

    if (data) {
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
            <Grid
              key={'chartsGridKey' + tabIndex}
              id={'chartsGridId' + tabIndex}
              style={{ backgroundColor: '#EEEEEE' }}
            >
              {Object.entries(chartDefinitions).map(
                ([chartIndex, { title, datafield, entryName, entryValue, dataFilter }]) => {
                  var chartData = dataFilter(data[datafield])
                  chartData = chartData.map(r => ({ value: r[entryValue], name: r[entryName] }))

                  if (parseInt(chartIndex) + 1 > tabIndex * 4 - 4 && parseInt(chartIndex) + 1 <= tabIndex * 4)
                    return (
                      <ExplorerHeaderChart
                        id={'explorer-chart' + chartIndex}
                        key={'explorer-chart' + chartIndex}
                        title={title}
                        data={chartData}
                      />
                    )
                  else return null
                }
              )}
            </Grid>
          </Tab>
        )
      }
    }

    return (
      <Collapse id={'collapseId1}'} key={'collapseKey1'} collapsed={collapsed}>
        <>
          <TabsContainer id={'tabsContainerId1'} key={'tabsContainerKey1'}>
            {chartTabs}
          </TabsContainer>
        </>
      </Collapse>
    )
  }
  console.log('in test charts')

  const memoizedValue = useMemo(() => createHeaderCharts(), [data, collapsed])
  console.log('data', data)
  return memoizedValue
}

function propsAreEqual(prev, next) {
  console.log('In propsAreEqual')
  if (prev.props === next.props) {
    console.log('propsAreEqual returning false')
    console.log('prev', prev)
    console.log('next', next)
    return false
  } else {
    console.log('propsAreEqual returning true')
    console.log('prev', prev)
    console.log('next', next)
    return true
  }
}

// export default memo(headerCharts, propsAreEqual)
