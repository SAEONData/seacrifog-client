import React, { PureComponent } from 'react'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { TabsContainer, Tabs, Tab, Button, Toolbar, Grid, Cell, LinearProgress } from 'react-md'
import DataQuery from '../../modules/data-query'
import { ENTIRE_GRAPH } from '../../graphql/queries'
import AutoSizer from 'react-virtualized-auto-sizer'
import { SideMenu, SideMenuFilter } from '../../modules/shared-components'
import { GlobalStateContext } from '../../global-state'
import orgs from './configuration'
import RecordViewer from './metadata-record-view'
import { Link } from 'react-router-dom'
import Footer from '../../modules/layout/footer'

const scrolltoRecord = (index, ref) => ref.current.scrollToItem(index)

const mainMenuIconStyle = (disabled, toggled) => ({
  color: disabled ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,1)',
  backgroundColor: toggled ? 'rgba(255,255,255,0.3)' : ''
})

const getProgresStyle = loading => ({
  margin: 0,
  visibility: loading ? 'inherit' : 'hidden',
  position: 'absolute'
})

class View extends PureComponent {
  state = {
    currentIndex: 0,
    items: initialSearchResults
  }

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

  loadMoreItems = () => {
    var newIcos = JSON.parse(JSON.stringify(fakeSearchResults[0]))
    var newSaeon = JSON.parse(JSON.stringify(fakeSearchResults[1]))
    console.log('newSaeon.result.results', newSaeon.result.results)
    console.log('this.state.items', this.state.items)
    newSaeon.result.results = newSaeon.result.results.slice(0, this.state.items[1].result.results.length + 1)
    const newItems = [newIcos, newSaeon]
    /*
    fakeSearchResults is an array of objects: [{icos},{saeon}]
    {saeon} is an object of objects: {result,target}
    result is an object: {results}
    results is an array of record objects:[{record1},{record2},{record3}]
    results is to be incremented
    */
    this.setState({
      items: newItems
    })
  }
  render() {
    const { searchRefs, props, state, tabPanelHeight } = this
    const { loadingSearchResults, searchResults, sites, networks, variables, protocols } = props
    const { currentIndex } = state

    // const searchResults = fakeSearchResults

    return (
      <div>
        {/* Toolbar */}
        <LinearProgress id={'search-loading-progress-indicator'} style={getProgresStyle(loadingSearchResults)} />
        <Toolbar
          colored
          className={'sf-content-header'}
          title={searchResults.reduce((sum, { result }) => sum + (result?.results?.length || 0), 0) + ' search results'}
          actions={[
            <Button key={0} tooltipLabel="To top" onClick={() => scrolltoRecord(0, searchRefs[currentIndex])} icon>
              arrow_upward
            </Button>,
            <Button
              key={1}
              tooltipLabel="To bottom"
              onClick={() =>
                scrolltoRecord(
                  searchResults.map(({ result }) => result?.results?.length || 0)[currentIndex] - 1,
                  searchRefs[currentIndex]
                )
              }
              icon
            >
              arrow_downward
            </Button>,
            <SideMenu
              key={2}
              toolbarActions={[]}
              control={({ toggleMenu }) => (
                <Button
                  tooltipLabel={'View current filters'}
                  tooltipPosition="left"
                  className="md-btn--toolbar"
                  style={mainMenuIconStyle()}
                  onClick={toggleMenu}
                  icon
                >
                  filter_list
                </Button>
              )}
            >
              <SideMenuFilter sites={sites} networks={networks} variables={variables} protocols={protocols} />
            </SideMenu>
          ]}
        />
        <button
          onClick={() => {
            this.loadMoreItems()
          }}
        >
          +1 record
        </button>
        {/* Tabs header (list of orgs) */}
        <TabsContainer labelAndIcon onTabChange={currentIndex => this.setState({ currentIndex })}>
          <Tabs tabId="metadata-search-tabs">
            {/* {searchResults.map(({ result, target }, i) => { */}
            {this.state.items.map(({ result, target }, i) => {
              const { results } = result
              const org = orgs[target]

              return (
                <Tab
                  key={i}
                  label={
                    <span style={{ color: 'rgba(1, 1, 1, 0.5)' }}>{(result?.results?.length || '0') + ' records'}</span>
                  }
                  icon={<img src={org.logo} style={{ height: '30px', marginBottom: 5 }} />}
                >
                  <div style={{ height: tabPanelHeight - 60, padding: '20px' }}>
                    {/* TODO - the conflict stuff */}
                    {results && results.length > 0 ? (
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
                                    results.map((result, j) => <RecordViewer i={j} key={j} record={result} {...org} />)[
                                      index
                                    ]
                                  }
                                </div>
                              )}
                            </FixedSizeList>
                          )
                        }}
                      </AutoSizer>
                    ) : (
                      'NO RESULTS'
                    )}
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
    {({ searchResults, loadingSearchResults }) =>
      searchResults.length ? (
        <DataQuery query={ENTIRE_GRAPH} variables={{}}>
          {({ sites, networks, variables, protocols }) => (
            <View
              sites={sites}
              networks={networks}
              variables={variables}
              protocols={protocols}
              searchResults={searchResults}
              loadingSearchResults={loadingSearchResults}
            />
          )}
        </DataQuery>
      ) : (
        <Grid>
          <Cell>
            {loadingSearchResults ? (
              <p>Loading ...</p>
            ) : (
              <div>
                <h2>No Search Defined</h2>
                <Link className="link" to="/sites">
                  Filter by sites
                </Link>
                <br />
                <Link className="link" to="/networks">
                  Filter by networks
                </Link>
                <br />
                <Link className="link" to="/variables">
                  Filter by variables
                </Link>
                <br />
                <Link className="link" to="/protocols">
                  Filter by protocols
                </Link>
              </div>
            )}
          </Cell>
        </Grid>
      )
    }
  </GlobalStateContext.Consumer>
)
