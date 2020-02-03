import React, { PureComponent } from 'react'
import { Grid, Toolbar, Button } from 'react-md'
import MetadataRecord from './_metadata-record'

const stickyHeaderColour = '#26A69A'

export default class extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { searchResults } = this.props
    const results = searchResults[0].result.results

    return (
      <div className="sticky-container">
        <Toolbar
          title={results.length + ' records'}
          style={{
            position: '-webkit-sticky',
            position: 'sticky',
            margin: 'auto',
            top: 0,
            zIndex: 1,
            width: '30%',
            backgroundColor: stickyHeaderColour
          }}
          actions={[
            <Button tooltipLabel="To top" onClick={() => alert("Help! Help! I'm being pressed!")} icon>
              arrow_upward
            </Button>,
            <Button tooltipLabel="To bottom" onClick={() => alert("Help! Help! I'm being pressed!")} icon>
              arrow_downward
            </Button>,
            <Button tooltipLabel="Collapse All" onClick={() => alert("Help! Help! I'm being pressed!")} icon>
              refresh
            </Button>
          ]}
        />
        <Grid noSpacing style={{ border: '1px solid #00897B', width: '50%', zIndex: 0 }}>
          {results.map((r, recordIndex) => {
            return <MetadataRecord record={r} index={recordIndex + 1} key={recordIndex} />
          })}
        </Grid>
      </div>
    )
  }
}
