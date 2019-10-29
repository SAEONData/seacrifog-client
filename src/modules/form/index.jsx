import { Component } from 'react'

export default class Form extends Component {
  state = {}
  constructor(props) {
    super(props)
    for (const prop in this.props) {
      if (this.props.hasOwnProperty(prop)) {
        if (prop !== 'children') this.state[prop] = this.props[prop]
      }
    }
  }

  updateForm = (obj, cb = null) => this.setState(obj, cb)

  // saveForm

  render() {
    return this.props.children({
      updateForm: this.updateForm,
      ...this.state
    })
  }
}
