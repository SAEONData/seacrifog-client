import React, { Component } from 'react'

export default class Form extends Component {
  state = {}
  constructor(props) {
    super(props)
    // TODO: This is currently a bug in react-scripts 3.1.1
    // eslint-disable-next-line
    for (const prop in this.props) {
      if (this.props.hasOwnProperty(prop)) {
        if (prop !== 'children') this.state[prop] = this.props[prop]
      }
    }
  }

  updateForm = (obj, cb = null) => this.setState(obj, cb)

  render() {
    return (
      <>
        {this.props.children({
          updateForm: this.updateForm,
          ...this.state
        })}
      </>
    )
  }
}
