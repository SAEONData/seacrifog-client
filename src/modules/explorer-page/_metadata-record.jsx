import React, { PureComponent } from 'react'
import { Button, Card, CardText, CardTitle, FontIcon, Cell, CardActions } from 'react-md'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { expanded: false }
  }
  render() {
    const { record, index } = this.props
    // console.log('props', this.props)
    const headerBackgroundColor = '#00897B'
    const headerFontColor = 'white'

    return (
      <Cell
        key={'grid-cell-' + index}
        phoneSize={4}
        tabletSize={8}
        size={6}
        key={'panel' + index}
        style={{ padding: '3px', border: 'solid 1px #00897B', width: '100%' }}
      >
        <Card
          style={{
            boxShadow: 'none',
            width: '100%'
          }}
          expanded={this.state.expanded}
          expanderIcon={
            <FontIcon style={{ color: headerFontColor, marginLeft: 'unset' }}>keyboard_arrow_down</FontIcon>
          }
          onExpanderClick={() => {
            this.setState({ expanded: !this.state.expanded })
          }}
        >
          <CardTitle
            onClick={() => {
              this.setState({ expanded: !this.state.expanded })
            }}
            expander={true}
            title=""
            style={{
              backgroundColor: headerBackgroundColor,
              height: '60px',
              border: '1px solid ' + headerBackgroundColor,
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
              {record.metadata_json.titles[0].title
                ? (index + ' - ' + record.metadata_json.titles[0].title).length < 100
                  ? index + ' - ' + record.metadata_json.titles[0].title
                  : (index + ' - ' + record.metadata_json.titles[0].title).substring(0, 97) + '...'
                : 'record ' + index}
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
                style={{ marginLeft: 'auto' }}
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
                // style={{ float: 'right', marginLeft: 'auto' }}
                tooltipLabel="View Record"
                tooltipPosition="top"
              >
                visibility
              </Button>
            </CardActions>
          </CardTitle>
          <CardText expandable>
            <p>
              <b>Contributors:</b>
            </p>
            {/* {Object.entries(record.metadata_json.contributors).map((r, i) => (
              <p key={i}>
                {' '}
                <b>Type:</b> {r[1].contributorType} <b>Name:</b> {r[1].name} */}
            {/* </p> */}
            {/* ))} */}
            <p>
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
        {/* </div> */}
      </Cell>
    )
  }
}

/*


*/
