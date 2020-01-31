import React, { PureComponent } from 'react'
import { Grid, TabsContainer, Tabs, Tab, Avatar } from 'react-md'
import MetadataRecord from './_metadata-record'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { selectedTabIndex: 1 }
  }

  render() {
    const { searchResults } = this.props
    return (
      <Grid noSpacing style={{ border: '1px solid #00897B', width: '50%' }}>
        {console.log('searchResults[0].result.results', searchResults[0].result.results)}
        {searchResults[0].result.results.map((r, recordIndex) => {
          return <MetadataRecord record={r} index={recordIndex + 1} key={recordIndex} />
        })}
      </Grid>
    )
  }
}
