import React, { PureComponent } from 'react'
import { Button, Card, CardText, CardTitle, FontIcon, Cell } from 'react-md'

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
        style={{ padding: '3px', border: 'solid 1px #00897B' }}
      >
        <div id={'the div boy'} style={{ backgroundColor: '#00897B', height: '100%' }}>
          <Card
            style={{
              boxShadow: 'none',
              maxHeight: this.state.expanded ? null : '80px'
              // maxWidth: '40%'
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
                maxHeight: '80px',
                border: '1px solid ' + headerBackgroundColor
              }}
            >
              <p style={{ color: headerFontColor, fontSize: 'large' }}>
                {record.metadata_json.titles[0].title
                  ? index + 1 + ' - ' + record.metadata_json.titles[0].title
                  : 'record ' + index}
              </p>
            </CardTitle>
            <CardText expandable>
              <div key={index}>
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
                >
                  View record
                </Button>
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
              </div>
            </CardText>
          </Card>
        </div>
      </Cell>
    )
  }
}

/*


*/
