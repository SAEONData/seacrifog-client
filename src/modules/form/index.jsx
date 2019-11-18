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
    // for (var entry in props) {
    //   console.log(entry)
    //   console.log(typeof entry)
    // }
  }

  updateForm = (obj, cb = null) => {
    // console.log(obj, cb)
    this.setState(obj, cb)
    // console.log(obj, cb)
  }

  render() {
    return this.props.children({
      updateForm: this.updateForm,
      ...this.state
    })
  }
}
