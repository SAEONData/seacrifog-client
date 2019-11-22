import React, { PureComponent } from 'react'

export const GlobalStateContext = React.createContext()

export default class extends PureComponent {
  state = {
    selectedNetworks: [],
    selectedVariables: [],
    selectedProtocols: [],
    selectedDataproducts: []
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
