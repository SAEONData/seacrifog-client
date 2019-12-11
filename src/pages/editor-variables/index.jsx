import React from 'react'
import { Grid, Cell, Card, NavigationDrawer } from 'react-md'
import Form from '../../modules/form'
import DataQuery from '../../modules/data-query'
import DataMutation from '../../modules/data-mutation'
import { fieldDefinitions } from './variable-definitions'
import {
  EditorSaveButton,
  EditorLayout,
  EntityEditor,
  RelationEditor,
  EditorHeader,
  EditorContentWrapperInner
} from '../../modules/editor-page'
import { VARIABLE, DATAPRODUCTS_MIN, PROTOCOLS_MIN, RFORCINGS_MIN } from '../../graphql/queries'
import { UPDATE_VARIABLES } from '../../graphql/mutations'
import saveFn from './save'

const cardStyle = { boxShadow: 'none' }

export default ({ id, ...props }) => {
  return (
    <DataQuery query={VARIABLE} variables={{ id: parseInt(id) }}>
      {({ variable }) => {
        //deep copying variable to be able to access the fields values before any changes
        let originalFields = JSON.parse(JSON.stringify(variable))
        return (
          <DataQuery query={DATAPRODUCTS_MIN}>
            {/*dataproducts is a simple list of EVERY dataproduct*/}
            {({ dataproducts }) => (
              <DataQuery query={PROTOCOLS_MIN}>
                {/*protocols is a simple list of EVERY protocol*/}
                {({ protocols }) => (
                  <DataQuery query={RFORCINGS_MIN}>
                    {({ radiativeForcings }) => (
                      <Form {...variable}>
                        {({ updateForm, ...fields }) => (
                          <DataMutation mutation={UPDATE_VARIABLES}>
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
                                          key={0}
                                          saveEntity={() =>
                                            saveFn({
                                              fieldDefinitions,
                                              executeMutation,
                                              originalFields,
                                              fields
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
                                            <EntityEditor
                                              executeMutation={executeMutation}
                                              fieldDefinitions={fieldDefinitions}
                                              entityProp={variable}
                                              updateForm={updateForm}
                                              {...fields}
                                            />
                                          </EditorContentWrapperInner>
                                        </Cell>

                                        {/* Relationship editor */}
                                        <Cell phoneSize={4} tabletSize={8} size={6}>
                                          <EditorContentWrapperInner>
                                            <RelationEditor
                                              label="Directly Related Protocols"
                                              items={protocols}
                                              relatedItems={fields.directly_related_protocols}
                                              displayValue="title" //the entity prop to be displayed within the list item text as "{id} - {displayValue}""
                                              fieldName={'directly_related_protocols'}
                                              updateForm={updateForm}
                                              {...fields}
                                            />

                                            <RelationEditor
                                              label="Indirectly Related Protocols"
                                              items={protocols}
                                              relatedItems={fields.indirectly_related_protocols}
                                              displayValue="title"
                                              fieldName={'indirectly_related_protocols'}
                                              updateForm={updateForm}
                                              {...fields}
                                            />
                                            <RelationEditor
                                              label="Dataproducts"
                                              items={dataproducts}
                                              relatedItems={fields.dataproducts}
                                              displayValue="title"
                                              fieldName={'dataproducts'}
                                              updateForm={updateForm}
                                              {...fields}
                                            />
                                            <RelationEditor
                                              label="Radiative Forcings"
                                              items={radiativeForcings}
                                              relatedItems={fields.rforcings}
                                              displayValue="compound"
                                              fieldName={'rforcings'}
                                              updateForm={updateForm}
                                              {...fields}
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
            )}
          </DataQuery>
        )
      }}
    </DataQuery>
  )
}
