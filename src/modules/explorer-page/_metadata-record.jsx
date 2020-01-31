import React, { PureComponent } from 'react'
import { Button, Card, CardText, CardTitle, FontIcon, Cell, CardActions } from 'react-md'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { expanded: false }
  }
  render() {
    const { record, index } = this.props

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
            // maxHeight: this.state.expanded ? null : '60px',
            width: '100%'
            // overflowY: this.state.expanded ? 'scroll' : 'hidden'
          }}
          expanded={this.state.expanded}
          expanderIcon={<FontIcon style={{ color: headerFontColor }}>keyboard_arrow_down</FontIcon>}
          onExpanderClick={() => {
            this.setState({ expanded: !this.state.expanded })
          }}
        >
          <CardTitle
            onClick={() => {
              this.setState({ expanded: !this.state.expanded })
            }}
            expander
            title=""
            style={{
              backgroundColor: headerBackgroundColor,
              height: '60px',
              border: '1px solid ' + headerBackgroundColor,
              paddingBottom: '24px'
            }}
          >
            <p style={{ color: headerFontColor, fontSize: 'larger' }}>
              {record.metadata_json.titles[0].title
                ? (index + ' - ' + record.metadata_json.titles[0].title).length < 100
                  ? index + ' - ' + record.metadata_json.titles[0].title
                  : (index + ' - ' + record.metadata_json.titles[0].title).substring(0, 97) + '...'
                : 'record ' + index}
            </p>
            <CardActions>
              <Button
                onClick={() =>
                  window.open(
                    `http://www.sasdi.net/metaview.aspx?uuid=${record.metadata_json.alternateIdentifiers[0].alternateIdentifier}`,
                    '_blank'
                  )
                }
                primary
                swapTheming
                flat
                iconChildren={'visibility'}
                label=""
                // style={{ float: 'right', margin: '0px' }}
                tooltipLabel="View Record"
                tooltipPosition="top"
              >
                VIEW
              </Button>
            </CardActions>
          </CardTitle>

          <CardText expandable>
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
