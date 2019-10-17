import React, { PureComponent } from 'react'
import { DialogContainer, Card, CardText } from 'react-md'

export default class extends PureComponent {
  state = { visible: false }

  show = () => {
    this.setState({ visible: true })
  }

  hide = () => {
    this.setState({ visible: false })
  }

  render() {
    const { visible } = this.state

    return (
      <Card className="funder-logo" style={{ height: '100px' }}>
        <CardText style={{ height: '100%', padding: '12px' }}>
          <img
            className="funder-logo"
            onClick={this.show}
            style={{
              display: 'block',
              margin: 'auto',
              height: '100%',
              padding: '0',
              cursor: 'pointer'
            }}
            src={this.props.imgPath}
            alt={this.props.alt}
          />
          <DialogContainer
            id="funding-acknowledgement"
            title={'Acknowledgement'}
            visible={visible}
            titleStyle={{ textAlign: 'center' }}
            focusOnMount={false}
            onHide={this.hide}
            contentStyle={{ maxHeight: 'inherit' }}
          >
            <img
              style={{
                width: '100%',
                display: 'block',
                margin: '20px auto'
              }}
              src={this.props.imgPath}
              alt={this.props.alt}
            />
            {this.props.content}
          </DialogContainer>
        </CardText>
      </Card>
    )
  }
}
