import React, { PureComponent } from 'react'
import { Button, Card, CardText, CardTitle, FontIcon, Cell, CardActions } from 'react-md'
import saeonLogo from '../../../public/saeon-logo.png'
import icosLogo from '../../../public/icos-logo.png'

const iconColor = '#00897b'

export default class extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { record, index, source } = this.props
    if (source === 'icos') console.log('icos record', record)
    return (
      <Card style={{ width: '95%', textAlign: 'left' }}>
        <CardTitle title="">
          <h2 className="md-card-title--title md-card-title--large md-text">
            {record.metadata_json //If record has a title:
              ? record.metadata_json.titles[0].title.length < 100 /*|| this.state.expanded */ //If title is less than 100 characters OR card is expanded:
                ? record.metadata_json.titles[0].title //display full title
                : record.metadata_json.titles[0].title.substring(0, 97) + '...' //else: shorten title to fit card
              : 'metadata record ' + index}
          </h2>
          <CardActions style={{ marginLeft: 'auto' }}>
            <Button
              onClick={() => {
                if (source === 'saeon')
                  window.open(
                    `http://www.sasdi.net/metaview.aspx?uuid=${record.metadata_json.alternateIdentifiers[0].alternateIdentifier}`,
                    '_blank'
                  )
                else {
                  window.open(`http://www.google.com`)
                }
              }}
              swapTheming
              icon
              style={{
                marginLeft: 'auto',
                color: iconColor
              }}
              tooltipLabel="View Record"
              tooltipPosition="top"
            >
              visibility
            </Button>
          </CardActions>
        </CardTitle>
        <CardText style={{ height: '350px', overflow: 'auto' }}>
          {source === 'saeon' ? (
            <div style={{ display: 'grid' }}>
              {record.metadata_json.subject ? (
                <p id="subjects">
                  <b>Subjects: </b>
                  {record.metadata_json.subjects
                    .map(s => {
                      return s.subject
                    })
                    .join()}
                </p>
              ) : null}

              {record.metadata_json.descriptions ? (
                <p id="descriptions">
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
                <p id="creators">
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
                      <p id="dates" key={i}>
                        <b>{d.dateType}: </b>
                        {d.date}
                      </p>
                    )
                  })
                : null}

              {record.metadata_json.publisher ? (
                <p id="publisher">
                  <b>Publisher: </b>
                  {record.metadata_json.publisher}
                </p>
              ) : null}

              {record.metadata_json.publicationYear ? (
                <p id="publisher">
                  <b>Year Published: </b>
                  {record.metadata_json.publicationYear}
                </p>
              ) : null}
            </div>
          ) : source === 'icos' ? (
            <div>
              <p>
                <b>TO BE PLANNED OUT</b>
              </p>
            </div>
          ) : null}
        </CardText>
      </Card>
    )
  }
}
