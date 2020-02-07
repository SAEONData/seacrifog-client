import React from 'react'
import { Grid, Cell } from 'react-md'
import { GlobalStateContext } from '../../global-state'
import DataList from '../../modules/explorer-page/_metadata-list'

export default () => (
  <GlobalStateContext.Consumer>
    {({ searchResults, searchErrors }) => (
      /* <p>
            {searchErrors.length
              ? 0
              : searchResults.map(r => r.result.result_length).reduce((sum, val) => sum + val, 0)}{' '}
            results
          </p> */
      <DataList searchResults={searchResults} />
    )}
  </GlobalStateContext.Consumer>
)
