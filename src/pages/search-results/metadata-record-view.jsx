import React from 'react'
import { Button, Card, CardText, CardTitle, CardActions } from 'react-md'

const getContentFromPath = (record, path) => path.reduce((acc, current) => acc[current], record)

export default ({ record, titlePath, explorerUriPath, explorerUriBase, contentPath, FormatContent }) => {
  return (
    <Card style={{ paddingBottom: 10, marginRight: '20px', boxShadow: 'none' }}>
      <CardTitle title={getContentFromPath(record, titlePath)}>
        <CardActions style={{ marginLeft: 'auto' }}>
          <Button
            onClick={() => window.open(`${explorerUriBase}${getContentFromPath(record, explorerUriPath)}`, '_blank')}
            primary
            icon
            tooltipLabel="View Record"
            tooltipPosition="left"
          >
            visibility
          </Button>
        </CardActions>
      </CardTitle>

      <CardText style={{ height: 150, overflow: 'auto', margin: '10px' }}>
        <FormatContent content={getContentFromPath(record, contentPath)} />
      </CardText>
    </Card>
  )
}
