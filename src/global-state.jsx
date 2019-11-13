import React, { PureComponent } from 'react'

export const GlobalStateContext = React.createContext()

export default class extends PureComponent {
  state = {
    selectedProtocols: []
  }

  updateSelectedProtocols = (selectedProtocols, cb = null) => {
    this.setState({ selectedProtocols }, cb)
  }

  render() {
    const { updateSelectedProtocols, state, props } = this

    return (
      <GlobalStateContext.Provider
        value={{
          updateSelectedProtocols,
          ...state
        }}
      >
        {props.children}
      </GlobalStateContext.Provider>
    )
  }
}
