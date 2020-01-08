import React, { PureComponent } from 'react'
import gql from 'graphql-tag'

export const GlobalStateContext = React.createContext()

export default class extends PureComponent {
  state = {
    // Lists of IDs
    selectedSites: [],
    selectedNetworks: [],
    selectedVariables: [],
    selectedProtocols: [],
    selectedDataproducts: [],

    // Single INDEX values. NOT IDs
    currentSite: 0,
    currentNetwork: 0,
    currentVariable: 0,
    currentProtocol: 0,
    currentDataproduct: 0,

    // Search results
    loadingSearchResults: false,
    searchResults: [],
    searchErrors: []
  }

  /**
   * If any selected* lists were changed,
   * update the metadata search in the background
   */
  async componentDidUpdate(prevProps, prevState) {
    const { gqlClient } = this.props
    const searchFields = ['selectedNetworks', 'selectedVariables', 'selectedProtocols']
    let refresh = false
    for (const field of searchFields) {
      const oldF = prevState[field]
      const newF = this.state[field]
      if (oldF !== newF) {
        refresh = true
        break
      }
    }

    if (!refresh) {
      return
    } else {
      const {
        selectedNetworks: byNetworks,
        selectedVariables: byVariables,
        selectedProtocols: byProtocols
      } = this.state

      this.setState({ loadingSearchResults: true }, async () => {
        let data
        let errors
        try {
          const response = await gqlClient.query({
            query: gql`
              query search($byNetworks: [Int!], $byProtocols: [Int!], $byVariables: [Int!]) {
                searchMetadata(byNetworks: $byNetworks, byVariables: $byVariables, byProtocols: $byProtocols) {
                  id
                  record
                }
              }
            `,
            variables: {
              byNetworks,
              byVariables,
              byProtocols
            }
          })
          data = ((response || {}).data || {}).searchMetadata || []
          errors = (response || {}).errors || []
        } catch (error) {
          errors = [error].flat()
        } finally {
          this.setState({
            loadingSearchResults: false,
            searchResults: data || [],
            searchErrors: errors || []
          })
        }
      })
    }
  }

  updateGlobalState = (obj, { currentIndex = null, selectedIds = null } = {}, cb = null) =>
    this.setState(obj, () => {
      if (currentIndex && selectedIds) {
        this.setState(
          {
            [currentIndex]: this.state[selectedIds].length - 1 >= 0 ? this.state[selectedIds].length - 1 : 0
          },
          cb
        )
      } else {
        if (cb) cb()
      }
    })

  render() {
    const { updateGlobalState, state, props } = this

    return (
      <GlobalStateContext.Provider
        value={{
          updateGlobalState,
          ...state
        }}
      >
        {props.children}
      </GlobalStateContext.Provider>
    )
  }
}
