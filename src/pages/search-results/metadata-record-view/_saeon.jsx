import React from 'react'
import { Button, Card, CardText, CardTitle, CardActions } from 'react-md'

const getContentFromPath = (record, path) => path.reduce((acc, current) => acc[current], record)

export default ({ record, titlePath, explorerUri, explorerUriBase }) => {
  return (
    <Card style={{ marginRight: '20px', boxShadow: 'none' }}>
      <CardTitle title={getContentFromPath(record, titlePath)}>
        <CardActions style={{ marginLeft: 'auto' }}>
          <Button
            onClick={() => window.open(`${explorerUriBase}${getContentFromPath(record, explorerUri)}`, '_blank')}
            primary
            icon
            tooltipLabel="View Record"
            tooltipPosition="left"
          >
            visibility
          </Button>
        </CardActions>
      </CardTitle>

      <CardText style={{ height: 200, overflow: 'auto' }}>
        <div>
          {record.metadata_json.subject ? (
            <p>
              <b>Subjects: </b>
              {record.metadata_json.subjects
                .map(s => {
                  return s.subject
                })
                .join()}
            </p>
          ) : null}

          {record.metadata_json.descriptions ? (
            <p>
              {record.metadata_json.descriptions.map((d, i) => {
                return (
                  <span key={i}>
                    <b>{d.descriptionType}: </b>
                    {d.description}
                  </span>
                )
              })}
            </p>
          ) : null}

          {record.metadata_json.creators ? (
            <p>
              <b>Creators: </b>
              {record.metadata_json.creators
                .map(c => {
                  return c.name
                })
                .join()}
            </p>
          ) : null}

          {record.metadata_json.contributors
            ? record.metadata_json.contributors.map((c, i) => {
                return (
                  <p key={i}>
                    <b>{c.contributorType}: </b>
                    {c.name}
                  </p>
                )
              })
            : null}

          {record.metadata_json.dates
            ? record.metadata_json.dates.map((d, i) => {
                return (
                  <p key={i}>
                    <b>{d.dateType}: </b>
                    {d.date}
                  </p>
                )
              })
            : null}

          {record.metadata_json.publisher ? (
            <p>
              <b>Publisher: </b>
              {record.metadata_json.publisher}
            </p>
          ) : null}

          {record.metadata_json.publicationYear ? (
            <p>
              <b>Year Published: </b>
              {record.metadata_json.publicationYear}
            </p>
          ) : null}
        </div>
      </CardText>
    </Card>
  )
}
