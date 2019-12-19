import React, { PureComponent } from 'react'
import { logError } from './lib/log'

const GQL_ENDPOINT = process.env.GQL_ENDPOINT || 'http://localhost:3000/graphql'

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

    // Loading indicator
    loadingSearchResults: false
  }

  /**
   * If any selected* lists were changed,
   * update the metadata search in the background
   */
  componentDidUpdate(prevProps, prevState) {
    const searchFields = ['selectedSites', 'selectedNetworks', 'selectedVariables', 'selectedProtocols']
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
      const query = 'query { searchMetadata { id } }'
      this.setState({ loadingSearchResults: true }, async () => {
        let data
        let errors
        try {
          const response = await fetch(GQL_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
          }).then(res => res.json())
          data = response.data || []
          errors = response.errors || []
        } catch (error) {
          errors = [error].flat()
        } finally {
          this.setState({
            loadingSearchResults: false,
            searchResults: data,
            searchErrors: errors
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
