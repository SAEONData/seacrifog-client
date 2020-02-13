import React from 'react'
import { GlobalStateContext } from '../../global-state'
import DataList from '../../modules/explorer-page/_metadata-list'

export default () => (
  <GlobalStateContext.Consumer>
    {({ searchResults }) => {
      return searchResults.length ? (
        <DataList searchResults={searchResults} />
      ) : (
        <p>No metadata available for selection</p>
      )
    }}
  </GlobalStateContext.Consumer>
)
