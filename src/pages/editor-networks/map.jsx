import React, { PureComponent } from 'react'
import { OlReact, SingleFeatureSelector } from '@saeon/atlas'
import { ahocevarBaseMap, pointLayer } from '../../modules/atlas/layers'
import { pointSource } from '../../modules/atlas/sources'
import { dotStyle3, dotStyle4 } from '../../modules/atlas/styles'
import { Button, Grid, Cell, Card, CardText, Toolbar } from 'react-md'
import DataQuery from '../../modules/data-query'
import DataMutation from '../../modules/data-mutation'
import { SITE } from '../../graphql/queries'
import { UPDATE_SITES } from '../../graphql/mutations'
import { Form } from '../../modules/shared-components'
import { EditorSaveButton, EntityEditor, EditorHeader } from '../../modules/editor-page'
import { fieldDefinitions } from './site-definitions'
import { Draw, Modify } from 'ol/interaction'

const cardStyle = { boxShadow: 'none' }

export default class extends PureComponent {
  state = {
    moveSiteActive: false,
    addSiteActive: false
  }

  constructor(props) {
    super(props)
    this.source = pointSource({ points: this.props.network.sites })
    this.modify = new Modify({ source: this.source })
    this.draw = new Draw({
      source: this.source,
      type: 'Point'
    })
  }

  render() {
    const { props, source, modify, draw } = this

    return (
      <>
        <p>(NOTE: Saving is not enabled in this part - it&apos;s a prototype)</p>
        <OlReact
          style={{ height: '500px', width: '100%' }}
          layers={[
            ahocevarBaseMap(),
            pointLayer({
              style: dotStyle3,
              source
            })
          ]}
        >
          {({ map }) => (
            <SingleFeatureSelector
              ignoreClicks={this.state.moveSiteActive || this.state.addSiteActive || false}
              unselectedStyle={dotStyle3}
              selectedStyle={dotStyle4}
              map={map}
            >
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
                    actions={[
                      <Button
                        style={this.state.moveSiteActive ? { color: 'yellow' } : {}}
                        key={0}
                        onClick={() =>
                          this.setState(
                            {
                              moveSiteActive: !this.state.moveSiteActive,
                              addSiteActive: false
                            },
                            () => {
                              map.getInteractions().forEach(interaction => {
                                if (interaction instanceof Draw || interaction instanceof Modify)
                                  map.removeInteraction(interaction)
                              })
                              if (this.state.moveSiteActive) map.addInteraction(modify)
                            }
                          )
                        }
                        flat
                        iconChildren={'open_with'}
                      >
                        Move site
                      </Button>,
                      <Button
                        style={this.state.addSiteActive ? { color: 'yellow' } : {}}
                        key={1}
                        onClick={() =>
                          this.setState(
                            {
                              moveSiteActive: false,
                              addSiteActive: !this.state.addSiteActive
                            },
                            () => {
                              map.getInteractions().forEach(interaction => {
                                if (interaction instanceof Draw || interaction instanceof Modify)
                                  map.removeInteraction(interaction)
                              })
                              if (this.state.addSiteActive) map.addInteraction(draw)
                            }
                          )
                        }
                        flat
                        iconChildren={'add'}
                      >
                        Add site
                      </Button>
                    ]}
                  />
                )
              }}
            </SingleFeatureSelector>
          )}
        </OlReact>
      </>
    )
  }
}
