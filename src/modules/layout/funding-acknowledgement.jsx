import React, { PureComponent } from 'react'
import { DialogContainer } from 'react-md'

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
      <>
        <img
          className="funder-logo"
          onClick={this.show}
          style={{
            height: 64,
            float: 'right',
            padding: '14px 10px',
            margin: '0',
            display: this.props.mediaType.mobile ? 'none' : 'inherit',
            cursor: 'pointer'
          }}
          src={this.props.imgPath}
          alt={this.props.alt}
        />
        <DialogContainer
          id="funding-acknowledgement"
          visible={visible}
          titleStyle={{ textAlign: 'center' }}
          title={this.props.title || 'Acknowledgement'}
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
      </>
    )
  }
}
