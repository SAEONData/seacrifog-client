import React, { Component } from 'react'

export default class Form extends Component {
  state = {}

  updateForm = (obj, cb = null) => this.setState(obj, cb)

  render() {
    return (
      <>
        {this.props.children({
          form: this.state,
          updateForm: this.updateForm
        })}
      </>
    )
  }
}
