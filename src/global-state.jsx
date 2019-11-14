import React, { PureComponent } from 'react'

export const GlobalStateContext = React.createContext()

export default class extends PureComponent {
  state = {
    selectedProtocols: [],
    selectedVariables: []
  }

  updateSelectedProtocols = (selectedProtocols, cb = null) => this.setState({ selectedProtocols }, cb)
  updateSelectedVariables = (selectedVariables, cb = null) => this.setState({ selectedVariables }, cb)

  render() {
    const { updateSelectedProtocols, updateSelectedVariables, state, props } = this

    return (
      <GlobalStateContext.Provider
        value={{
          updateSelectedProtocols,
          updateSelectedVariables,
          ...state
        }}
      >
        {props.children}
      </GlobalStateContext.Provider>
    )
  }
}
