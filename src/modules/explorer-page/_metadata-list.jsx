import React, { PureComponent } from 'react'
import { Grid, Toolbar, Button, Cell, ExpansionList, ExpansionPanel, Divider } from 'react-md'
import MetadataRecord from './_metadata-record'
import saeonLogo from '../../../public/saeon-logo.png'
import icosLogo from '../../../public/icos-logo.png'
import { FixedSizeList as List } from 'react-window'
import './styles.css'

const Row = ({ index, style }) => (
  <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
    Row {index}
  </div>
)

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  collapseAll = () => {
    this.myRef.current.collapseMe()
  }

  render() {
    // const { searchResults } = this.props
    const searchResults = [
      { result: { results: { results: { bindings: ['some bindings', 'another binding', 'one more binding'] } } } },
      { result: { results: [{ metadata_jsonFake: {} }, { fakeboy: 'im a fake' }] } }
    ]
    const icosResults = searchResults[0].result.results.results.bindings
    const saeonResults = searchResults[1].result.results
    return (
      <>
        <List className="List" height={200} itemCount={1000} itemSize={35} width={300}>
          {Row}
        </List>
        <div id="metadataListTop" />
        {/* <Toolbar
          colored
          title={icosResults.length + saeonResults.length + ' metadata records'}
          style={{
            position: 'fixed',
            zIndex: 1000,
            left: '72px',
            right: 0
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
        /> */}
        {/*This fake toolbar renders behind the real toolbar so that real content doesn't. Hopefully some css can make this not needed */}
        <Toolbar />
        <Grid style={{ marginBottom: '50px' }}>
          {saeonResults.map((r, recordIndex) => {
            return <MetadataRecord record={r} index={recordIndex + 1} key={recordIndex} logo={saeonLogo} />
          })}
        </Grid>
        <button>+100</button>
        <Grid>
          {icosResults.map((r, recordIndex) => {
            return <MetadataRecord record={r} index={recordIndex + 1} key={recordIndex} logo={icosLogo} />
          })}
        </Grid>
        {/* <MetadataRecord
          index={999999}
          record={{
            metadata_json: { titles: [{ title: 'This is dummy record. Collapse All works on this record' }] }
          }}
          ref={this.myRef}
          icon={icosLogo}
        /> */}
        <div id="metadataListBottom" />
      </>
    )
  }
}
