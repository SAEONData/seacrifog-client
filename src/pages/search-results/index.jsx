import React, { PureComponent } from 'react'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { TabsContainer, Tabs, Tab, Button, Toolbar } from 'react-md'
import AutoSizer from 'react-virtualized-auto-sizer'
import { GlobalStateContext } from '../../global-state'
import orgs from './configuration'
import RecordViewer from './metadata-record-view'
import Footer from '../../modules/layout/footer'

const scrolltoRecord = (index, ref) => ref.current.scrollToItem(index)

const fakeSearchResults = [
  {
    result: {
      results: ['some bindings']
    },
    target: 'ICOS Metadata Results'
  },
  {
    result: {
      results: [
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        },
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        }
      ]
    },
    target: 'SAEON CKAN: saeon-odp-4-2'
  }
]

const initialSearchResults = [
  {
    result: {
      results: ['some bindings']
    },
    target: 'ICOS Metadata Results'
  },
  {
    result: {
      results: [
        {
          metadata_json: {
            subjects: [{ subject: 'some subject' }, { subject: 'another subject' }, { subject: 'one last subject' }],
            titles: [{ titleType: '', title: 'some title' }],
            descriptions: [{ descriptionType: 'Abstract', description: 'some description' }],
            creators: [{ name: 'some creator name' }],
            contributors: [
              { contributorType: 'ContactPerson', name: 'Brenda Daly' },
              { contributorType: 'Distributor', name: 'SAEON' }
            ],
            publisher: 'some publisher',
            dates: [
              { dateType: 'collected', date: '2011' },
              { dateType: 'another type of date', date: '2012' }
            ],
            publicationYear: '2020'
          }
        }
      ]
    },
    target: 'SAEON CKAN: saeon-odp-4-2'
  }
]
var initialIcos = fakeSearchResults[0]
var initialSaeon = fakeSearchResults[1]
// initialSaeon.result.slice(0, 0)
var initialItems = [initialIcos, initialSaeon]

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
    // var { searchResults } = props
    const { currentIndex } = state

    const searchResults = fakeSearchResults

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
        <button
          onClick={() => {
            this.loadMoreItems()
          }}
        >
          +1 record
        </button>
        {/* Tabs header (list of orgs) */}
        <TabsContainer onTabChange={currentIndex => this.setState({ currentIndex })}>
          <Tabs tabId="metadata-search-tabs">
            {/* {searchResults.map(({ result, target }, i) => { */}
            {this.state.items.map(({ result, target }, i) => {
              const { results } = result
              const org = orgs[target]

              return (
                <Tab key={i} icon={<img src={org.logo} style={{ height: '45px', margin: '0px' }} />}>
                  <div style={{ height: tabPanelHeight - 60, padding: '20px' }}>
                    <AutoSizer id={`autosizer-${i}`}>
                      {({ height, width }) => {
                        return (
                          <InfiniteLoader
                            isItemLoaded={index => index < this.state.items.length}
                            itemCount={this.state.items.length}
                            loadMoreItems={this.loadMoreItems}
                          >
                            {({ onItemsRendered, ref }) => (
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
                                      results.map((result, j) => {
                                        return (
                                          <RecordViewer
                                            key={j}
                                            record={result}
                                            titlePath={org.titlePath}
                                            explorerUriBase={org.explorerUriBase}
                                            explorerUriPath={org.explorerUri}
                                            contentPath={org.contentPath}
                                            FormatContent={org.FormatContent}
                                          />
                                        )
                                      })[index]
                                    }
                                  </div>
                                )}
                              </FixedSizeList>
                            )}
                          </InfiniteLoader>
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
    {({ searchResults }) => <View searchResults={searchResults} />
    // searchResults.length ? <View searchResults={searchResults} /> : <p>No metadata available for selection</p>
    }
  </GlobalStateContext.Consumer>
)
