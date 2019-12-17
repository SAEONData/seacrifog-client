import React from 'react'
import { Grid, Cell, Card, TextField, CardText, CardTitle, NavigationDrawer } from 'react-md'
import Form from '../../modules/form'
import DataQuery from '../../modules/data-query'
import DataMutation from '../../modules/data-mutation'
import { fieldDefinitions } from './network-definitions'
import { NETWORK, VARIABLES_MIN } from '../../graphql/queries'
import { UPDATE_NETWORKS } from '../../graphql/mutations'
import {
  EditorSaveButton,
  EditorLayout,
  EntityEditor,
  RelationEditor,
  EditorHeader,
  EditorContentWrapperInner
} from '../../modules/editor-page'
import { OlReact } from '@saeon/atlas'
import { ahocevarBaseMap, geoJsonLayer } from '../../modules/atlas/layers'
import { dotStyle3 } from '../../modules/atlas/styles'

const cardStyle = { boxShadow: 'none' }

export default ({ id, ...props }) => (
  <DataQuery query={VARIABLES_MIN}>
    {({ variables }) => (
      <DataQuery query={NETWORK} variables={{ id: parseInt(id) }}>
        {({ network }) => (
          <Form
            addSites={network.sites.map(({ id }) => id)}
            removeSites={[]}
            addVariables={[...network.variables.map(({ id }) => id)]}
            removeVariables={[]}
            {...network}
          >
            {({ updateForm, addVariables, addSites, removeSites, removeVariables, ...fields }) => (
              <DataMutation mutation={UPDATE_NETWORKS}>
                {({ executeMutation, mutationLoading, mutationError }) => (
                  <EditorLayout>
                    {/* Menu bar */}
                    <Grid noSpacing>
                      <Cell size={12}>
                        <EditorHeader
                          loading={mutationLoading}
                          {...props}
                          actions={[
                            <EditorSaveButton
                              saveEntity={() =>
                                executeMutation({
                                  variables: {
                                    input: [
                                      {
                                        id: fields.id,
                                        addSites,
                                        addVariables,
                                        removeSites,
                                        removeVariables,
                                        ...Object.fromEntries(
                                          Object.entries(fields).filter(([key]) =>
                                            fieldDefinitions[key] ? !fieldDefinitions[key].pristine : false
                                          )
                                        )
                                      }
                                    ]
                                  }
                                })
                              }
                            />
                          ]}
                        />
                      </Cell>
                    </Grid>

                    {/* Page content */}
                    <Grid noSpacing>
                      <Cell size={12}>
                        <Card style={cardStyle}>
                          <Grid
                            noSpacing={NavigationDrawer.getCurrentMedia().mobile ? true : false}
                            className="sf-editor-wrapper"
                          >
                            {/* Attribute editor */}
                            <Cell phoneSize={4} tabletSize={8} size={6}>
                              <EditorContentWrapperInner>
                                <EntityEditor fieldDefinitions={fieldDefinitions} updateForm={updateForm} {...fields} />
                              </EditorContentWrapperInner>
                            </Cell>

                            {/* Relationship editor */}
                            <Cell phoneSize={4} tabletSize={8} size={6}>
                              <EditorContentWrapperInner>
                                {/* RELATED VARIABLES */}
                                <RelationEditor
                                  label="Related Variables"
                                  items={variables.map(({ id, name: value }) => ({ id, value }))}
                                  selectedItems={addVariables}
                                  updateForm={updateForm}
                                  removeArray={removeVariables}
                                  addFieldName={'addVariables'}
                                  removeFieldName={'removeVariables'}
                                />

                                {/* RELATED SITES */}
                                <p>Click to edit or add sites to this network</p>
                                <OlReact
                                  style={{ height: '500px', width: '100%' }}
                                  layers={[
                                    ahocevarBaseMap(),
                                    geoJsonLayer({
                                      geoJson: {
                                        type: 'GeometryCollection',
                                        geometries: network.sites.reduce(
                                          (sites, site) => (site.xyz ? [...sites, JSON.parse(site.xyz)] : [...sites]),
                                          []
                                        )
                                      },
                                      style: dotStyle3()
                                    })
                                  ]}
                                />
                              </EditorContentWrapperInner>
                            </Cell>
                          </Grid>
                        </Card>
                      </Cell>
                    </Grid>
                  </EditorLayout>
                )}
              </DataMutation>
            )}
          </Form>
        )}
      </DataQuery>
    )}
  </DataQuery>
)
