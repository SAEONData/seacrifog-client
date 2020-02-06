import React, { PureComponent } from 'react'
import { Button, Card, CardText, CardTitle, FontIcon, Cell, CardActions } from 'react-md'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { expanded: false, hovered: false }
  }

  collapseMe = () => {
    console.log('collapsing Me!')
    this.setState({ expanded: false })
  }
  render() {
    const { record, index } = this.props
    const headerBorderColor = '#80CBC4'
    const headerFontColor = 'black'
    const iconColor = '#00897b'
    return (
      <Cell
        key={'grid-cell-' + index}
        phoneSize={4}
        tabletSize={8}
        size={6}
        key={'panel' + index}
        style={{ width: '100%', padding: '2px' }}
        onMouseEnter={() => {
          this.setState({ hovered: true })
        }}
        onMouseLeave={() => {
          this.setState({ hovered: false })
        }}
      >
        <div style={{}}>
          <Card
            style={{
              width: '100%',
              border: '3px solid ' + headerBorderColor,
              borderRadius: '10px',
              //hover styling:
              boxShadow: this.state.hovered ? null : 'none',
              marginTop: this.state.hovered ? '' : '3px',
              marginBottom: this.state.hovered ? '3px' : '',
              marginLeft: this.state.hovered ? '-3px' : ''
            }}
            expanded={this.state.expanded}
            expanderIcon={
              <FontIcon style={{ color: headerFontColor, marginLeft: 'unset' }}>keyboard_arrow_down</FontIcon>
            }
            onClick={() => {
              this.setState({ expanded: !this.state.expanded })
            }}
            onExpanderClick={() => {
              /*redundant method. This is here to avoid thrown errors*/
            }}
          >
            <CardTitle
              expander={true}
              title=""
              style={{
                height: this.state.expanded ? null : '70px',
                // borderBottom: this.state.expanded ? '3px solid ' + headerBorderColor : '',
                paddingBottom: '24px'
              }}
            >
              <p
                style={{
                  color: headerFontColor,
                  fontSize: 'larger',
                  marginBottom: '0px',
                  alignContent: 'right',
                  alignItems: 'right'
                }}
              >
                {record.metadata_json.titles[0].title //If record has a title:
                  ? (index + ' - ' + record.metadata_json.titles[0].title).length < 100 || this.state.expanded //If title is less than 100 characters OR card is expanded:
                    ? index + ' - ' + record.metadata_json.titles[0].title //display full title
                    : (index + ' - ' + record.metadata_json.titles[0].title).substring(0, 97) + '...' //else: shorten title to fit card
                  : 'metadata record ' + index}{' '}
                {/*Else  display generic title*/}
              </p>
              <CardActions style={{ marginLeft: 'auto', flex: 'auto' }}>
                <Button
                  onClick={() =>
                    window.open(
                      `http://www.sasdi.net/metaview.aspx?uuid=${record.metadata_json.alternateIdentifiers[0].alternateIdentifier}`,
                      '_blank'
                    )
                  }
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
                <Button
                  onClick={() =>
                    window.open(
                      `http://www.sasdi.net/metaview.aspx?uuid=${record.metadata_json.alternateIdentifiers[0].alternateIdentifier}`,
                      '_blank'
                    )
                  }
                  swapTheming
                  icon
                  style={{ color: iconColor }}
                  tooltipLabel="View Record"
                  tooltipPosition="top"
                >
                  bar_chart
                </Button>
              </CardActions>
            </CardTitle>
            <CardText expandable>
              <p>
                <b>Contributors:</b>
                {/* </p> */}
                {/* {Object.entries(record.metadata_json.contributors).map((r, i) => ( */}
                {/* <p key={i}> <b>Type:</b> {r[1].contributorType} <b>Name:</b> {r[1].name}</p> */}
                {/* ))} */}
                {/* <p> */}
                <b>Full metadata:</b>
              </p>
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
            </CardText>
          </Card>
        </div>
      </Cell>
    )
  }
}

/*


*/
