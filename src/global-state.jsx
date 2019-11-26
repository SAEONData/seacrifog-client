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
    currentDataproduct: 0
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
