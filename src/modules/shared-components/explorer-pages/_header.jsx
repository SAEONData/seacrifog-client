import React from 'react'
import { Toolbar, Button } from 'react-md'
import DataQuery from '../../data-query'
import { useHistory } from 'react-router-dom'
import { ENTIRE_GRAPH } from '../../../graphql/queries'
import { SideMenu, ExplorerSideMenuFilter } from '../index'

const mainMenuIconStyle = disabled => ({
  marginLeft: '10px',
  color: disabled ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,1)'
})

export default ({ resetFn, selectedIds, ...props }) => {
  const ctx = props.location.pathname.replace('/', '').toUpperCase()
  const history = useHistory()
  return (
    <DataQuery
      loadingComponent={<Toolbar title={'Loading...'} colored className={'sf-content-header'} />}
      query={ENTIRE_GRAPH}
      variables={{}}
    >
      {({ sites, networks, variables, protocols }) => (
        <Toolbar
          colored
          title={ctx}
          className={'sf-content-header'}
          actions={[
            <Button
              style={mainMenuIconStyle(selectedIds.length > 0 ? false : true)}
              disabled={selectedIds.length > 0 ? false : true}
              tooltipLabel={'View metadata search results'}
              onClick={() => history.push(`/datasets`)}
              icon
            >
              storage
            </Button>,
            <Button
              style={mainMenuIconStyle(selectedIds.length > 0 ? false : true)}
              disabled={selectedIds.length > 0 ? false : true}
              tooltipLabel={'View map'}
              icon
              onClick={() => history.push(`/sites`)}
            >
              map
            </Button>,

            <Button
              component={'a'}
              tooltipLabel={'Download selected overviews'}
              disabled={selectedIds.length > 0 ? false : true}
              style={mainMenuIconStyle(selectedIds.length > 0 ? false : true)}
              icon
              download
              href={encodeURI(
                `http://localhost:3000/downloads/${ctx}?filename=${ctx}-${new Date()}.txt&ids=${selectedIds.join(',')}`
              )}
            >
              save_alt
            </Button>,
            <Button
              tooltipLabel={'Refresh current page filters'}
              disabled={selectedIds.length > 0 ? false : true}
              onClick={resetFn}
              style={mainMenuIconStyle(selectedIds.length > 0 ? false : true)}
              icon
            >
              refresh
            </Button>,
            <SideMenu
              toolbarActions={[]}
              control={({ toggleMenu }) => (
                <Button
                  tooltipLabel={'View current filters'}
                  tooltipPosition="left"
                  className="md-btn--toolbar"
                  style={mainMenuIconStyle()}
                  onClick={toggleMenu}
                  icon
                >
                  filter_list
                </Button>
              )}
            >
              <ExplorerSideMenuFilter sites={sites} networks={networks} variables={variables} protocols={protocols} />
            </SideMenu>
          ]}
        />
      )}
    </DataQuery>
  )
}
