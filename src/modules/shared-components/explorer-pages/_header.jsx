import React from 'react'
import { Toolbar, Button } from 'react-md'
import DataQuery from '../../data-query'
import { ENTIRE_GRAPH } from '../../../graphql/queries'
import { SideMenu, ExplorerSideMenuFilter } from '../index'

const mainMenuIconStyle = disabled => ({
  marginLeft: '10px',
  color: disabled ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,1)'
})

export default ({ resetFn, selectedIds }) => (
  <DataQuery query={ENTIRE_GRAPH} variables={{}}>
    {({ sites, networks, variables, protocols }) => (
      <Toolbar
        colored
        title={'Notifications, link controls, MetaData explorer, etc.'}
        className={'sf-content-header'}
        actions={[
          <SideMenu
            toolbarActions={[]}
            control={({ toggleMenu }) => (
              <Button className="md-btn--toolbar" style={mainMenuIconStyle()} onClick={toggleMenu} icon>
                filter_list
              </Button>
            )}
          >
            <ExplorerSideMenuFilter sites={sites} networks={networks} variables={variables} protocols={protocols} />
          </SideMenu>,
          <Button
            disabled={selectedIds.length > 0 ? false : true}
            style={mainMenuIconStyle(selectedIds.length > 0 ? false : true)}
            icon
          >
            save_alt
          </Button>,
          <Button
            disabled={selectedIds.length > 0 ? false : true}
            onClick={resetFn}
            style={mainMenuIconStyle(selectedIds.length > 0 ? false : true)}
            icon
          >
            refresh
          </Button>
        ]}
      />
    )}
  </DataQuery>
)
