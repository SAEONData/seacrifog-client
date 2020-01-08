import React from 'react'
import { Collapse, Dialog, Card, CardTitle } from 'react-md'
import CSSTransitionGroup from 'react-transition-group/CSSTransition'

const MetadataItem = ({ id }) => (
  <Card>
    <CardTitle title={id} />
    <p>{'TODO'}</p>
  </Card>
)

export default ({ showList, searchResults }) => (
  <Collapse collapsed={!showList}>
    <Dialog
      id="metadata-list-small"
      title="Search results"
      style={{ zIndex: 999 }}
      className="md-background"
      autopadContent={true}
    >
      <CSSTransitionGroup timeout={150}>
        <div>
          {searchResults.map((sr, i) => (
            <MetadataItem key={i} {...sr} />
          ))}
        </div>
      </CSSTransitionGroup>
    </Dialog>
  </Collapse>
)
