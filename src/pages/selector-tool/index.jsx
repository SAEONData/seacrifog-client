import React from 'react'
import DataQuery from '../../modules/data-query'
import { ENTIRE_GRAPH } from '../../graphql/queries'
import DropdownSelect from '../../modules/dropdown-select'
import Form from '../../modules/form'
import { pickBy } from 'ramda'
import { Grid, Cell, Card, CardText } from 'react-md'

export default ({ selectedProtocol, selectedVariable }) => (
  <Form>
    {({ updateForm, selectedVariables, selectedProtocols }) => (
      <DataQuery query={ENTIRE_GRAPH}>
        {({ variables, protocols, protocolsXrefVariables }) => (
          <Grid>
            <Cell size={12}>
              <Card>
                <CardText>
                  <Form searchTerm="">
                    {({ updateForm: updateVariablesSearch, searchTerm }) => (
                      <DropdownSelect
                        updateForm={updateVariablesSearch}
                        placeholder="Search variables..."
                        menuItems={variables
                          .map(v => {
                            const search = searchTerm.trim().toUpperCase()
                            const nameFound = search === '' ? true : v.name.toUpperCase().indexOf(search) >= 0 ? true : false
                            const classFound = search === '' ? true : v.class.toUpperCase().indexOf(search) >= 0 ? true : false
                            const domainFound = search === '' ? true : v.domain.toUpperCase().indexOf(search) >= 0 ? true : false
                            return nameFound || classFound || domainFound
                              ? pickBy((v, k) => (['name', 'class', 'domain'].includes(k) ? true : false), v)
                              : null
                          })
                          .filter(_ => _)}
                      />
                    )}
                  </Form>
                </CardText>
                <CardText>
                  <Form searchTerm="">
                    {({ updateForm: updateProtocolsSearch, searchTerm }) => (
                      <DropdownSelect
                        placeholder="Search protocols..."
                        updateForm={updateProtocolsSearch}
                        menuItems={protocols
                          .map(v => {
                            const search = searchTerm.trim().toUpperCase()
                            const authorFound = search === '' ? true : v.author.toUpperCase().indexOf(search) >= 0 ? true : false
                            const titleFound = search === '' ? true : v.title.toUpperCase().indexOf(search) >= 0 ? true : false
                            const domainFound = search === '' ? true : v.domain.toUpperCase().indexOf(search) >= 0 ? true : false
                            return authorFound || titleFound || domainFound
                              ? pickBy((v, k) => (['author', 'title', 'domain'].includes(k) ? true : false), v)
                              : null
                          })
                          .filter(_ => _)}
                      />
                    )}
                  </Form>
                </CardText>
              </Card>
            </Cell>
          </Grid>
        )}
      </DataQuery>
    )}
  </Form>
)
