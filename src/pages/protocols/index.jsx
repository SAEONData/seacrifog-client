import React from 'react'
import DataQuery from '../../modules/data-query'
import Form from '../../modules/form'
import { PROTOCOLS_MIN } from '../../graphql/queries'
import { TabsContainer, Tabs, Tab } from 'react-md'

// eslint-disable-next-line no-extend-native
String.prototype.truncate = function(length, ending) {
  length = length || 100
  ending = ending || '...'
  if (this.length > length) return this.substring(0, length - ending.length) + ending
  else return this
}

export default () => (
  <DataQuery query={PROTOCOLS_MIN}>
    {({ protocols }) => (
      <Form>
        {({ udpdateForm }) => (
          <>
            <TabsContainer style={{ margin: '0 -8px' }} panelClassName="md-grid" colored>
              <Tabs tabId="simple-tab" style={{ backgroundColor: '#575c8a' }}>
                <Tab label="Tab one">
                  <h3>Hello, World!</h3>
                  <p>{JSON.stringify(protocols).truncate(1000)}</p>
                </Tab>
                <Tab label="Tab two">
                  <h3>Tab 2!</h3>
                  <p>{JSON.stringify(protocols).truncate(4000)}</p>
                </Tab>
              </Tabs>
            </TabsContainer>
          </>
        )}
      </Form>
    )}
  </DataQuery>
)
