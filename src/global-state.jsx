import React, { PureComponent } from 'react'

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
  async componentDidUpdate(prevProps, prevState) {
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

    if (!refresh) return

    this.setState({ loadingSearchResults: true }, async () => {
      const query = 'query { searchMetadata { id } }'
      const { data } = await fetch(process.env.GQL_ENDPOINT || 'http://localhost:3000/graphql', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ query })
      }).then(res => res.json())
      const searchResuts = data.searchMetadata
      this.setState({ loadingSearchResults: false, searchResuts })
    })
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
