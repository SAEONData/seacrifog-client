import React, { PureComponent } from 'react'
import { FixedSizeList } from 'react-window'
import { TabsContainer, Tabs, Tab, Button, Toolbar } from 'react-md'
import AutoSizer from 'react-virtualized-auto-sizer'
import { GlobalStateContext } from '../../global-state'
import orgs from './configuration'
import RecordViewer from './metadata-record-view'
import Footer from '../../modules/layout/footer'

const scrolltoRecord = (index, ref) => ref.current.scrollToItem(index)

class View extends PureComponent {
  state = { currentIndex: 0 }

  vhToPx(value) {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      y = w.innerHeight || e.clientHeight || g.clientHeight

    var result = (y * value) / 100
    return result
  }

  tabPanelHeight = this.vhToPx(100) - 72 - 64 - 64

  constructor(props) {
    super(props)
    this.searchRefs = props.searchResults.map(() => React.createRef())
  }

  render() {
    const { searchRefs, props, state, tabPanelHeight } = this
    const { searchResults } = props
    const { currentIndex } = state
    return (
      <div>
        {/* Toolbar */}
        <Toolbar
          colored
          title={searchResults.map(({ result }) => result.results.length).join(' results | ') + ' results'}
          actions={[
            <Button key={0} tooltipLabel="To top" onClick={() => scrolltoRecord(0, searchRefs[currentIndex])} icon>
              arrow_upward
            </Button>,
            <Button
              key={1}
              tooltipLabel="To bottom"
              onClick={() =>
                scrolltoRecord(
                  searchResults.map(({ result }) => result.results.length)[currentIndex] - 1,
                  searchRefs[currentIndex]
                )
              }
              icon
            >
              arrow_downward
            </Button>
          ]}
        />

        {/* Tabs header (list of orgs) */}
        <TabsContainer onTabChange={currentIndex => this.setState({ currentIndex })}>
          <Tabs tabId="metadata-search-tabs">
            {searchResults.map(({ result, target }, i) => {
              const { results } = result
              const org = orgs[target]

              return (
                <Tab key={i} icon={<img src={org.logo} style={{ height: '45px', margin: '0px' }} />}>
                  <div style={{ height: tabPanelHeight - 60, padding: '20px' }}>
                    <AutoSizer id={`autosizer-${i}`}>
                      {({ height, width }) => {
                        return (
                          <FixedSizeList
                            height={height}
                            width={width}
                            itemCount={results.length}
                            itemSize={300}
                            ref={searchRefs[i]}
                          >
                            {({ index, style }) => (
                              <div id={index} style={style}>
                                {
                                  results.map((result, j) => (
                                    <RecordViewer
                                      key={j}
                                      record={result}
                                      titlePath={org.titlePath}
                                      explorerUriBase={org.explorerUriBase}
                                      explorerUriPath={org.explorerUri}
                                      contentPath={org.contentPath}
                                      FormatContent={org.FormatContent}
                                    />
                                  ))[index]
                                }
                              </div>
                            )}
                          </FixedSizeList>
                        )
                      }}
                    </AutoSizer>
                  </div>
                </Tab>
              )
            })}
          </Tabs>
        </TabsContainer>
        <Footer />
      </div>
    )
  }
}

export default () => (
  <GlobalStateContext.Consumer>
    {({ searchResults }) =>
      searchResults.length ? <View searchResults={searchResults} /> : <p>No metadata available for selection</p>
    }
  </GlobalStateContext.Consumer>
)
