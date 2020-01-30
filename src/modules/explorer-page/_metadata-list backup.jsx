import React from 'react'
import { Grid } from 'react-md'
import MetadataRecord from './_metadata-record'

// const headerBackgroundColor = '#4DB6AC'
// const headerBorderColor = 'rgba(255,255,255,0.3)'

export default ({ searchResults }) => (
  <>
    <Grid noSpacing style={{ border: '1px solid #00897B' }}>
      {searchResults
        .map(r => r.result.results)
        .flat()
        .map((record, index) => {
          if (index < 20 && index % 2 === 0) return <MetadataRecord record={record} index={index} key={index} />
          else return null
        })}
    </Grid>
    <Grid noSpacing style={{ border: '1px solid #00897B' }}>
      {searchResults
        .map(r => r.result.results)
        .flat()
        .map((record, index) => {
          if (index < 20 && index % 2 === 1) return <MetadataRecord record={record} index={index} key={index} />
          else return null
        })}
    </Grid>
  </>
)
