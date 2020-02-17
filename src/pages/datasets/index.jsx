import React from 'react'
import { GlobalStateContext } from '../../global-state'
import { MetadataListView } from '../../modules/metadata-list-view'

export default () => (
  <GlobalStateContext.Consumer>
    {({ searchResults }) =>
      searchResults.length ? (
        <MetadataListView searchResults={searchResults} />
      ) : (
        <p>No metadata available for selection</p>
      )
    }
  </GlobalStateContext.Consumer>
)
