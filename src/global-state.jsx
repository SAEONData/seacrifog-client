import React, { PureComponent } from 'react'

export const GlobalStateContext = React.createContext()

export default class extends PureComponent {
  state = {
    selectedSites: [],
    selectedNetworks: [],
    selectedVariables: [],
    selectedProtocols: [],
    selectedDataproducts: []

    // TODO: Keep track of selected tabs on the list pages
  }

  updateGlobalState = (obj, cb = null) => this.setState(obj, cb)

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
