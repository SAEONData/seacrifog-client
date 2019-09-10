import React from 'react'
import { DATAPRODUCTS_MIN, DATAPRODUCT } from '../../graphql/queries'
import Table from '../../modules/table'
import TitleToolbar from '../../modules/title-toolbar'
import { mergeLeft, pickBy } from 'ramda'
import { NoneMessage, FormattedInfo, LinkButton, DownloadButton } from '../../modules/shared-components'
import { Grid, Cell, ExpansionList, ExpansionPanel, Card } from 'react-md'
import q from 'query-string'
import DataQuery from '../../modules/data-query'

export default ({ updateForm, hoveredDP, selectedDP, ...props }) => (
  <DataQuery query={DATAPRODUCTS_MIN}>
    {({ dataProducts }) => (
      <>
        {/* Page Heading */}
        <TitleToolbar
          t1={selectedDP ? selectedDP.title : hoveredDP ? hoveredDP.title : 'Select rows by clicking on them...'}
          t2={selectedDP ? selectedDP.provider : hoveredDP ? hoveredDP.provider : ''}
          t3={selectedDP ? selectedDP.contact : hoveredDP ? hoveredDP.contact : ''}
        />

        {/* Main Table (selectable) */}
        <Table
          headers={Object.keys(dataProducts[0] || '').filter(col => col !== '__typename' && col !== 'id')}
          data={dataProducts}
          initialSearch={
            props.history.location.search
              ? q.parse(props.history.location.search, { ignoreQueryPrefix: true }).searchTerm
              : selectedDP
              ? selectedDP.title
              : ''
          }
          onRowClick={row => updateForm({ selectedDP: row })}
          onRowHover={row => updateForm({ hoveredDP: row })}
          selectedRow={selectedDP}
          toolbarButtons={[
            <LinkButton key={'url-button'} active={selectedDP ? false : true} />,
            <DownloadButton key={'download-button'} active={selectedDP ? false : true} />
          ]}
        />

        {/* Display information about selected row */}
        {selectedDP ? (
          <DataQuery query={DATAPRODUCT} variables={{ id: selectedDP.id }}>
            {({ dataProduct }) => (
              <Grid>
                <Cell size={12}>
                  <ExpansionList>
                    <ExpansionPanel label="Abstract" defaultExpanded footer={false}>
                      <Grid>
                        <Cell size={12}>
                          <p>{dataProduct.abstract}</p>
                        </Cell>
                      </Grid>
                    </ExpansionPanel>
                    <ExpansionPanel label="Additional Information" footer={false}>
                      {
                        <FormattedInfo
                          object={pickBy((val, key) => {
                            if (['abstract', '__typename'].includes(key)) return false
                            if (typeof val === 'object') return false
                            return true
                          }, dataProduct)}
                        />
                      }
                    </ExpansionPanel>
                  </ExpansionList>

                  <h3 style={{ textAlign: 'center', marginTop: '100px', marginBottom: '50px' }}>Essential Variables</h3>
                  {dataProduct.variables[0] ? (
                    <Card tableCard>
                      <Table
                        onRowClick={row =>
                          updateForm({ selectedVariable: row }, () => props.history.push(`/explore/variables?searchTerm=${row.name}`))
                        }
                        headers={Object.keys(dataProduct.variables[0])
                          .filter(col => col !== '__typename' && col !== 'id')
                          .concat('Relationship')}
                        data={dataProduct.variables.map(v => mergeLeft({ relationship: 'direct' }, v))}
                        toolbarStyle={{ backgroundColor: 'transparent' }}
                        tableStyle={{}}
                        toolbarButtons={[]}
                      />
                    </Card>
                  ) : (
                    <NoneMessage />
                  )}
                </Cell>
              </Grid>
            )}
          </DataQuery>
        ) : (
          <Grid>
            <Cell size={12}>
              <p>
                <i>Select a row for more detailed information</i>
              </p>
            </Cell>
          </Grid>
        )}
      </>
    )}
  </DataQuery>
)
