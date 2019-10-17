import React, { PureComponent } from 'react'
import { DialogContainer, Card, CardText } from 'react-md'

export default class extends PureComponent {
  state = { visible: false }

  toggleVisible = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state

    return (
      <Card onClick={this.toggleVisible} className={'funder-logo'} style={{ height: '100px', cursor: 'pointer' }}>
        <CardText style={{ height: '100%', padding: '12px', display: 'flex' }}>
          <img
            style={{
              display: 'flex',
              margin: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              padding: '0'
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
            onHide={this.toggleVisible}
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
