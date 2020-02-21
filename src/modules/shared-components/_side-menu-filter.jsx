import React from 'react'
import { DropdownSelect } from '.'
import { GlobalStateContext } from '../../global-state'

const sideMenuContentStyle = { paddingLeft: '24px', paddingRight: '24px', color: 'black' }

export default ({ sites, networks, variables, protocols }) => (
  <GlobalStateContext.Consumer>
    {({ updateGlobalState, selectedSites, selectedVariables, selectedNetworks, selectedProtocols }) => (
      <div style={sideMenuContentStyle}>
        {/* Sites filter */}
        <DropdownSelect
          id={'dropdown-select-sites'}
          label={'Filter sites'}
          selectedItems={selectedSites}
          items={sites.map(({ id, name: value }) => ({ id, value }))}
          onItemToggle={id =>
            updateGlobalState({
              selectedSites: selectedSites.includes(id)
                ? [...selectedSites].filter(sId => sId !== id)
                : [...selectedSites, id]
            })
          }
        />
        {/* Networks filter */}
        <DropdownSelect
          id={'dropdown-select-networks'}
          label={'Filter networks'}
          selectedItems={selectedNetworks}
          items={networks.map(({ id, acronym: value }) => ({ id, value }))}
          onItemToggle={id =>
            updateGlobalState(
              {
                selectedNetworks: selectedNetworks.includes(id)
                  ? [...selectedNetworks].filter(nId => nId !== id)
                  : [...selectedNetworks, id]
              },
              { currentIndex: 'currentNetwork', selectedIds: 'selectedNetworks' }
            )
          }
        />
        {/* Variables filter */}
        <DropdownSelect
          id={'dropdown-select-variables'}
          label={'Filter variables'}
          selectedItems={selectedVariables}
          items={variables.map(({ id, name: value }) => ({ id, value }))}
          onItemToggle={id =>
            updateGlobalState(
              {
                selectedVariables: selectedVariables.includes(id)
                  ? [...selectedVariables].filter(vId => vId !== id)
                  : [...selectedVariables, id]
              },
              { currentIndex: 'currentVariable', selectedIds: 'selectedVariables' }
            )
          }
        />
        {/* Protocols filter */}
        <DropdownSelect
          id={'dropdown-select-protocols'}
          label={'Filter protocols'}
          selectedItems={selectedProtocols}
          items={protocols.map(({ id, title: value }) => ({ id, value }))}
          onItemToggle={id =>
            updateGlobalState(
              {
                selectedProtocols: selectedProtocols.includes(id)
                  ? [...selectedProtocols].filter(pId => pId !== id)
                  : [...selectedProtocols, id]
              },
              { currentIndex: 'currentProtocol', selectedIds: 'selectedProtocols' }
            )
          }
        />
      </div>
    )}
  </GlobalStateContext.Consumer>
)
