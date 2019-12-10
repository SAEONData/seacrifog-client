import React from 'react'
import { Grid, Cell, Card, CardText, CardTitle } from 'react-md'
import Form from '../../modules/form'
import DataQuery from '../../modules/data-query'
import DataMutation from '../../modules/data-mutation'
import { fieldDefinitions } from './variable-definitions'
import { EditorSaveButton, EditorLayout, EntityEditor, RelationEditor } from '../../modules/editor-page'
import { VARIABLE, DATAPRODUCTS_MIN, PROTOCOLS_MIN, RFORCINGS_MIN } from '../../graphql/queries'
import { UPDATE_VARIABLES } from '../../graphql/mutations'
//VARIABLES EDITOR

//TO DO:
/*
-->leave directly/indirectly related protocols as NOT mutually exclusive for the time being. This will be revisited, maybe within the API
-->Multiple saves without a refresh can be buggy. Maybe an issue with originalFields not updating correctly.
*/

//-->consider moving this styling to an import
const cardStyle = { boxShadow: 'none' }
const CardTextStyle = { height: '650px', overflow: 'auto' }

export default ({ id }) => {
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
                              <EditorLayout loading={mutationLoading}>
                                <Grid>
                                  {/* Save button */}
                                  <Cell size={12}>
                                    <EditorSaveButton
                                      //what happens on save click:
                                      saveEntity={() => {
                                        console.log('fieldDefinitions', fieldDefinitions)
                                        //related entities IDs: (int arrays)
                                        //Related Dataproducts
                                        const originalDataproducts =
                                          Object.entries(originalFields.dataproducts).map(item => item[1].id) || []
                                        const fieldsDataproducts =
                                          Object.entries(fields.dataproducts).map(item => item[1].id) || []
                                        //Related Indirectly Protocols
                                        const originalIndirectlyRelatedProtocols =
                                          Object.entries(originalFields.indirectly_related_protocols).map(
                                            item => item[1].id
                                          ) || []
                                        const fieldsIndirectlyRelatedProtocols =
                                          Object.entries(fields.indirectly_related_protocols).map(item => item[1].id) ||
                                          []
                                        //Related directly Protocols
                                        const originalDirectlyRelatedProtocols =
                                          Object.entries(originalFields.directly_related_protocols).map(
                                            item => item[1].id
                                          ) || []
                                        const fieldsDirectlyRelatedProtocols =
                                          Object.entries(fields.directly_related_protocols).map(item => item[1].id) ||
                                          []
                                        //Related Radiative Forcings
                                        const originalRForcings =
                                          Object.entries(originalFields.rforcings).map(item => item[1].id) || []
                                        const fieldsRForcings =
                                          Object.entries(fields.rforcings).map(item => item[1].id) || []

                                        //Determining addDataproducts value
                                        fields.addDataproducts = fieldsDataproducts.filter(id =>
                                          originalDataproducts.includes(id) ? false : true
                                        )
                                        if (fields.addDataproducts === undefined) fields.addDataproducts = []
                                        if (fields.addDataproducts.length > 0)
                                          fieldDefinitions.addDataproducts.pristine = false

                                        //Determining removeDataproducts value
                                        fields.removeDataproducts = originalDataproducts.filter(id =>
                                          fieldsDataproducts.includes(id) ? false : true
                                        )
                                        if (fields.removeDataproducts === undefined) fields.removeDataproducts = []
                                        if (fields.removeDataproducts.length > 0)
                                          fieldDefinitions.removeDataproducts.pristine = false

                                        //Determining addDirectlyRelatedProtocols value
                                        fields.addDirectlyRelatedProtocols = fieldsDirectlyRelatedProtocols.filter(id =>
                                          originalDirectlyRelatedProtocols.includes(id) ? false : true
                                        )
                                        if (fields.addDirectlyRelatedProtocols === undefined)
                                          fields.addDirectlyRelatedProtocols = []
                                        if (fields.addDirectlyRelatedProtocols.length > 0)
                                          fieldDefinitions.addDirectlyRelatedProtocols.pristine = false

                                        //Determining addIndirectlyRelatedProtocols value
                                        fields.addIndirectlyRelatedProtocols = fieldsIndirectlyRelatedProtocols.filter(
                                          id => (originalIndirectlyRelatedProtocols.includes(id) ? false : true)
                                        )
                                        if (fields.addIndirectlyRelatedProtocols === undefined)
                                          fields.addIndirectlyRelatedProtocols = []
                                        if (fields.addIndirectlyRelatedProtocols.length > 0)
                                          fieldDefinitions.addIndirectlyRelatedProtocols.pristine = false

                                        //Determining removeProtocols value
                                        fields.removeProtocols = originalIndirectlyRelatedProtocols
                                          .filter(id => (fieldsIndirectlyRelatedProtocols.includes(id) ? false : true))
                                          .concat(
                                            originalDirectlyRelatedProtocols.filter(id =>
                                              fieldsDirectlyRelatedProtocols.includes(id) ? false : true
                                            )
                                          )
                                        if (fields.removeProtocols === undefined) fields.removeProtocols = []
                                        if (fields.removeProtocols.length > 0)
                                          fieldDefinitions.removeProtocols.pristine = false

                                        //Determining addRforcings value
                                        fields.addRForcings = fieldsRForcings.filter(id =>
                                          originalRForcings.includes(id) ? false : true
                                        )
                                        if (fields.addRForcings === undefined) fields.addRForcings = []
                                        if (fields.addRForcings.length > 0)
                                          fieldDefinitions.addRForcings.pristine = false

                                        //Determining removeRforcings value
                                        fields.removeRForcings = originalRForcings.filter(id =>
                                          fieldsRForcings.includes(id) ? false : true
                                        )
                                        if (fields.removeRForcings === undefined) fields.removeRForcings = []
                                        if (fields.removeRForcings.length > 0)
                                          fieldDefinitions.removeRForcings.pristine = false

                                        //Firing the actual Database mutation based on fields value
                                        executeMutation(
                                          {
                                            variables: {
                                              input: [
                                                {
                                                  id: fields.id,
                                                  ...Object.fromEntries(
                                                    Object.entries(fields).filter(([key]) =>
                                                      fieldDefinitions[key] ? !fieldDefinitions[key].pristine : false
                                                    )
                                                  )
                                                }
                                              ]
                                            }
                                          },
                                          () => (originalFields = JSON.parse(JSON.stringify(variable))) //callback to update originalFields once mutation has ended
                                        )
                                      }}
                                    />
                                  </Cell>

                                  {/* Properties */}
                                  <Cell phoneSize={4} tabletSize={8} size={6}>
                                    <Card style={cardStyle}>
                                      <CardTitle title={'Properties'} subtitle={'Edit fields below'} />
                                      <CardText style={CardTextStyle}>
                                        <EntityEditor
                                          executeMutation={executeMutation}
                                          fieldDefinitions={fieldDefinitions}
                                          entityProp={variable}
                                          updateForm={updateForm}
                                          {...fields}
                                        />
                                      </CardText>
                                    </Card>
                                  </Cell>

                                  {/* Relationships */}
                                  <Cell phoneSize={4} tabletSize={8} size={6}>
                                    <Card style={cardStyle}>
                                      <CardTitle
                                        title={'Relationships'}
                                        subtitle={'Edit associations with other entities'}
                                      />
                                      <CardText style={CardTextStyle}>
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
                                      </CardText>
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
