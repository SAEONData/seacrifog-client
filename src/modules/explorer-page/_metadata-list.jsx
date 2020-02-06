import React, { PureComponent } from 'react'
import { Grid, Toolbar, Button } from 'react-md'
import MetadataRecord from './_metadata-record'

const stickyHeaderColor = '#26A69A'
const containerColor = '#00897B'

/*
Styling options:
--> Single Column: Set cell width to 100%
--> Many Columns: Do not set cell width and have cell size and grid width fit desired number of columns
*/
export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  collapseAll = () => {
    this.myRef.current.collapseMe()
  }

  render() {
    const { searchResults } = this.props
    const results = searchResults[1].result.results
    return (
      <>
        <div id="metadataListTop" />
        <div
          className="sticky-container"
          style={{ backgroundColor: containerColor, padding: '5px', borderRadius: '6px' }}
        >
          <div
            style={{
              backgroundColor: containerColor,
              border: '2px solid white',
              borderRadius: '5px',
              paddingTop: '10px'
            }}
          >
            <Toolbar
              title={results.length + ' metadata records'}
              style={{
                position: '-webkit-sticky',
                position: 'sticky',
                margin: 'auto',
                top: '9px',
                zIndex: 1,
                width: '30%',
                height: '50px',
                placeItems: 'center',
                backgroundColor: stickyHeaderColor,
                borderRadius: '30px'
              }}
              actions={[
                <Button
                  tooltipLabel="To top"
                  onClick={() => document.getElementById('metadataListTop').scrollIntoView()}
                  icon
                >
                  arrow_upward
                </Button>,
                <Button
                  tooltipLabel="To bottom"
                  onClick={() => document.getElementById('metadataListBottom').scrollIntoView()}
                  icon
                >
                  arrow_downward
                </Button>,
                <Button tooltipLabel="Collapse All" onClick={() => this.collapseAll()} icon>
                  refresh
                </Button>
              ]}
            />
            <Grid
              noSpacing
              style={{ border: '1px solid #00897B', width: '65%', zIndex: 0, marginTop: '7px', marginBottom: '10px' }}
            >
              {results.map((r, recordIndex) => {
                return <MetadataRecord record={r} index={recordIndex + 1} key={recordIndex} />
              })}
              <MetadataRecord
                index={999999}
                record={{
                  metadata_json: { titles: [{ title: 'This is dummy record. Collapse All works on this record' }] }
                }}
                ref={this.myRef}
              />
            </Grid>
          </div>
        </div>
        <div id="metadataListBottom" />
      </>
    )
  }
}
