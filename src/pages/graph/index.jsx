import React from 'react'
import { Grid, Cell, TextField, Card, CardText } from 'react-md'
import DataQuery from '../../modules/data-query'
import { ENTIRE_GRAPH } from '../../graphql/queries'
import Form from '../../modules/form'
import Echart from '../../modules/echarts'

const NODE_LIMIT_PER_ENTITY = 18

export default () => (
  <DataQuery query={ENTIRE_GRAPH}>
    {({ variables, protocols, dataproducts, protocolsXrefVariables, dataproductsXrefVariables }) => (
      <Form searchTerm="">
        {({ updateForm, searchTerm }) => {
          // Keep track of the order each variable/prototype is placed in the nodes
          // [{object_id: position_id}]
          const orderedVariables = {}
          const orderedProtocols = {}
          const orderedDataproducts = {}

          // This replicates the data format shown in the eCharts example
          const nodes = variables
            .filter(v => (v.name.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0 ? true : false))
            .map(v => ({ name: v.name, value: 1, category: 0, v_id: v.id, type: 'variable' }))
            .concat(
              protocols
                .filter(p => (p.title.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0 ? true : false))
                .map(p => ({ name: p.title, value: 1, category: 1, p_id: p.id, type: 'protocol' }))
            )
            .concat(
              dataproducts
                .filter(d => (d.title.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0 ? true : false))
                .map(d => ({ name: d.title, value: 1, category: 2, d_id: d.id, type: 'dataproduct' }))
            )

          // Get the positions of the variables/protocols in the nodes
          nodes.forEach((n, i) => {
            if (n.type === 'variable') orderedVariables[n.v_id] = i
            else if (n.type === 'protocol') orderedProtocols[n.p_id] = i
            else if (n.type === 'dataproduct') orderedDataproducts[n.p_id] = i
          })

          const data = {
            type: 'force',
            categories: [{ name: 'Variables', keyword: {} }, { name: 'Protocols', keyword: {} }, { name: 'Data products', keyword: {} }],
            nodes,
            links: protocolsXrefVariables
              .map(x => {
                const protocol_id = x.protocol_id
                const variable_id = x.variable_id

                // Get the position of the source
                const source = orderedProtocols[protocol_id]
                const target = orderedVariables[variable_id]

                return { source, target }
              })
              .concat(
                dataproductsXrefVariables.map(x => {
                  const dataproduct_id = x.protocol_id
                  const variable_id = x.variable_id

                  // Get the position of the source
                  const source = orderedDataproducts[dataproduct_id]
                  const target = orderedVariables[variable_id]

                  return { source, target }
                })
              )
          }
          return (
            <>
              <Grid>
                <Cell phoneSize={6} tabletSize={8} size={12}>
                  <Card>
                    <CardText style={{ padding: '0 10px 10px 10px' }}>
                      <TextField
                        id="temp-graph-search"
                        label="Find..."
                        placeholder="Find..."
                        value={searchTerm}
                        onChange={searchTerm => updateForm({ searchTerm })}
                      ></TextField>
                    </CardText>
                  </Card>
                </Cell>
              </Grid>
              <Grid>
                <Cell phoneSize={6} tabletSize={8} size={12}>
                  <Echart
                    option={{
                      legend: { data: ['Variables', 'Protocols', 'Data products'] },
                      series: [
                        {
                          type: 'graph',
                          layout: 'force',
                          animation: true,
                          label: {
                            normal: {
                              position: 'right',
                              formatter: '{b}'
                            }
                          },
                          draggable: true,
                          categories: data.categories,
                          data: (() => {
                            let v = 0
                            let p = 0
                            let d = 0
                            return data.nodes
                              .map((node, idx) => {
                                node.id = idx
                                if (node.type === 'variable') {
                                  if (v <= NODE_LIMIT_PER_ENTITY) {
                                    v++
                                    return node
                                  }
                                } else if (node.type === 'protocol') {
                                  if (p <= NODE_LIMIT_PER_ENTITY) {
                                    p++
                                    return node
                                  }
                                } else if (node.type === 'dataproduct') {
                                  if (d <= NODE_LIMIT_PER_ENTITY) {
                                    d++
                                    return node
                                  }
                                } else if (v + p + d <= NODE_LIMIT_PER_ENTITY) return node
                                return null
                              })
                              .filter(_ => _)
                          })(),
                          roam: true,
                          force: {
                            edgeLength: 150,
                            repulsion: 300,
                            gravity: 0.1,
                            layoutAnimation: true
                          },
                          edges: data.links
                        }
                      ]
                    }}
                  />
                </Cell>
              </Grid>
            </>
          )
        }}
      </Form>
    )}
  </DataQuery>
)
