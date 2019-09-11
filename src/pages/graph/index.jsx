import React from 'react'
import { Grid, Cell, TextField, Card, CardText } from 'react-md'
import DataQuery from '../../modules/data-query'
import { ENTIRE_GRAPH } from '../../graphql/queries'
import Form from '../../modules/form'
import Echart from '../../modules/echarts'

export default () => {
  const data = Promise.resolve(
    new Promise((resolve, reject) =>
      fetch('http://localhost:3001/chart.json')
        .then(result => result.text())
        .then(text => resolve(JSON.parse(text)))
        .catch(err => reject(err))
    )
  )

  const legend = Promise.resolve(
    new Promise((resolve, reject) =>
      data.then(() =>
        resolve({
          data: ['HTMLElement', 'WebGL', 'SVG', 'CSS', 'Other']
        })
      )
    )
  )

  const option = Promise.resolve(
    new Promise((resolve, reject) =>
      legend.then(async () =>
        resolve({
          legend,
          series: [
            {
              type: 'graph',
              layout: 'force',
              animation: false,
              label: {
                normal: {
                  position: 'right',
                  formatter: '{b}'
                }
              },
              draggable: true,
              categories: (await data).categories,
              data: (await data).nodes.map(function(node, idx) {
                node.id = idx
                return node
              }),
              force: {
                // initLayout: 'circular',
                // repulsion: 20,
                edgeLength: 50,
                repulsion: 40,
                gravity: 0.06
              },
              edges: (await data).links
            }
          ]
        })
      )
    )
  )

  return (
    <DataQuery query={ENTIRE_GRAPH}>
      {({ variables, protocols, protocolsXrefVariables }) => (
        <Form searchTerm="">
          {({ updateForm, searchTerm }) => {
            // Keep track of the order each variable/prototype is placed in the nodes
            // [{object_id: position_id}]
            const orderedVariables = {}
            const orderedProtocols = {}

            // This replicates the data format shown in the eCharts example
            const nodes = variables
              .filter(v => (v.name.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0 ? true : false))
              .map(v => ({ name: v.name, value: 1, category: 0, v_id: v.id, type: 'variable' }))
              .concat(
                protocols
                  .filter(p => (p.title.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0 ? true : false))
                  .map(p => ({ name: p.title, value: 1, category: 1, p_id: p.id, type: 'protocol' }))
              )

            // Get the positions of the variables/protocols in the nodes
            nodes.forEach((n, i) => {
              if (n.type === 'variable') orderedVariables[n.v_id] = i
              else if (n.type === 'protocol') orderedProtocols[n.p_id] = i
            })

            const data = {
              type: 'force',
              categories: [{ name: 'Variables', keyword: {} }, { name: 'Protocols', keyword: {} }],
              nodes,
              links: protocolsXrefVariables.map(x => {
                // protocol is the source
                // variable is the target
                // But I don't think this matters
                const protocol_id = x.protocol_id
                const variable_id = x.variable_id

                // Get the position of the source
                const source = orderedProtocols[protocol_id]
                const target = orderedVariables[variable_id]

                return { source, target }
              })
            }
            return (
              <>
                <Card style={{ position: 'fixed', margin: 40, zIndex: 99, opacity: 0.8, width: 400 }}>
                  <CardText>
                    <TextField label="Find..." placeholder="Find..." onChange={searchTerm => updateForm({ searchTerm })}></TextField>
                  </CardText>
                </Card>
                <Grid>
                  <Cell phoneSize={6} tabletSize={8} size={12}>
                    <Echart
                      option={{
                        legend: { data: ['Variables', 'Protocols'] },
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
                              return data.nodes
                                .map((node, idx) => {
                                  node.id = idx
                                  if (node.type === 'variable') {
                                    v++
                                    if (v <= 50) return node
                                  } else if (node.type === 'protocol') {
                                    p++
                                    if (p <= 50) return node
                                  } else if (v + p <= 100) return node
                                  else return null
                                })
                                .filter(_ => _)
                            })(),
                            roam: true,
                            force: {
                              edgeLength: 50,
                              repulsion: 500,
                              gravity: 0.01,
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
}
