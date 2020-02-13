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
    const { record, index } = this.props
    return (
      <Cell
        key={'grid-cell-' + index}
        phoneSize={4}
        tabletSize={8}
        size={6}
        key={'panel' + index}
        style={{ width: '98%', textAlign: 'left' }}
        onMouseEnter={() => {
          this.setState({ hovered: true })
        }}
        onMouseLeave={() => {
          this.setState({ hovered: false })
        }}
      >
        <Card>
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
                  window.open(
                    `http://www.sasdi.net/metaview.aspx?uuid=${record.metadata_json.alternateIdentifiers[0].alternateIdentifier}`,
                    '_blank'
                  )
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
          {/* <CardText>
            <p
              style={{
                maxHeight: '300px',
                overflow: 'auto',
                padding: '15px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                backgroundColor: 'rgba(0,0,0,0.1)'
              }}
            >
              {JSON.stringify(record, null, 2)}
            </p>
          </CardText> */}
        </Card>
      </Cell>
    )
  }
}
