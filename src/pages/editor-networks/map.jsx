import React from 'react'
import { OlReact, SingleFeatureSelector } from '@saeon/atlas'
import { ahocevarBaseMap, pointLayer } from '../../modules/atlas/layers'
import { dotStyle3, dotStyle4 } from '../../modules/atlas/styles'
import { Button, Grid, Cell, Card, CardText, Toolbar } from 'react-md'
import DataQuery from '../../modules/data-query'
import DataMutation from '../../modules/data-mutation'
import { SITE } from '../../graphql/queries'
import { UPDATE_SITES } from '../../graphql/mutations'
import { Form } from '../../modules/shared-components'
import { EditorSaveButton, EntityEditor, EditorHeader } from '../../modules/editor-page'
import { fieldDefinitions } from './site-definitions'

const cardStyle = { boxShadow: 'none' }

export default ({ network, ...props }) => (
  <OlReact
    style={{ height: '500px', width: '100%' }}
    layers={[
      ahocevarBaseMap(),
      pointLayer({
        style: dotStyle3,
        points: network.sites
      })
    ]}
  >
    {({ map }) => (
      <SingleFeatureSelector unselectedStyle={dotStyle3} selectedStyle={dotStyle4} map={map}>
        {({ selectedFeature, unselectFeature }) => {
          return selectedFeature ? (
            <DataQuery query={SITE} variables={{ id: selectedFeature.get('id') }}>
              {({ site }) => (
                <Form {...site}>
                  {({ updateForm, ...fields }) => (
                    <DataMutation mutation={UPDATE_SITES}>
                      {/* eslint-disable-next-line no-unused-vars */}
                      {({ executeMutation, mutationLoading, mutationError }) => (
                        <>
                          {/* Menu bar */}
                          <Grid noSpacing>
                            <Cell size={12}>
                              <EditorHeader
                                title={`Site #${site.id}`}
                                loading={mutationLoading}
                                {...props}
                                actions={[
                                  <Button style={{ float: 'right' }} key={0} onClick={unselectFeature} icon>
                                    close
                                  </Button>,
                                  <EditorSaveButton
                                    key={1}
                                    saveEntity={() => alert('Should it be possible to update sites?')}
                                  />
                                ]}
                              />
                            </Cell>
                          </Grid>

                          <Card style={cardStyle}>
                            <CardText>
                              <div
                                style={{
                                  paddingRight: '10px',
                                  marginRight: '-10px',
                                  maxHeight: '200px',
                                  overflow: 'auto'
                                }}
                              >
                                <EntityEditor
                                  className="none"
                                  fieldDefinitions={fieldDefinitions}
                                  updateForm={updateForm}
                                  {...fields}
                                />
                              </div>
                            </CardText>
                          </Card>
                        </>
                      )}
                    </DataMutation>
                  )}
                </Form>
              )}
            </DataQuery>
          ) : (
            <Toolbar
              colored
              actions={
                <Button onClick={() => alert('This will toggle add mode')} flat iconChildren={'add'}>
                  Add site
                </Button>
              }
            />
          )
        }}
      </SingleFeatureSelector>
    )}
  </OlReact>
)
