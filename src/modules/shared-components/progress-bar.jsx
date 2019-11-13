import React, { PureComponent } from 'react'
import { Button, LinearProgress } from 'react-md'

const REFRESH_TIME = 3000
const UPDATE_INTERVAL = 15
const UPDATE_INCREMENT = 100 / (REFRESH_TIME / UPDATE_INTERVAL)

export default class QueryIndeterminate extends PureComponent {
  //defining the progress bar state: progress % and if its enabled
  state = { progress: null, demoing: false }

  //this component returns a Button and LinerProgress to be rendered with a state controlled progress/value
  render() {
    const { progress, demoing } = this.state
    return (
      <div>
        <Button onClick={this.start} raised disabled={demoing}>
          Show Progress
        </Button>
        {demoing && <LinearProgress id="query-indeterminate-progress" query value={progress} />}
      </div>
    )
  }
  timeout = null //either null or the arrow function defined in start()
  interval = null
  //When the component is to be removed, clear the Timeout AND Interval to be null
  componentWillUnmount() {
    this.clearTimeout()
  }

  //clear the Timeout AND Interval to be null
  clearTimeout = () => {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.timeout = null
    this.interval = null
  }

  start = () => {
    //clear any previous timeout or interval values
    this.clearTimeout()

    this.timeout = setTimeout(() => {
      this.timeout = null //possibly redundant assignment

      this.interval = setInterval(() => {
        const progress = Math.min(100, this.state.progress + UPDATE_INCREMENT) //either increments progress or caps progress at 100
        if (progress === 100) {
          clearInterval(this.refreshInterval)

          this.timeout = setTimeout(() => {
            this.timeout = null
            this.setState({ progress: 0, demoing: false })
          }, 100)
        }

        this.setState({ progress })
      }, UPDATE_INTERVAL)

      this.setState({ progress: 0 })
    }, 3000) //3000ms

    this.setState({ demoing: true })
  }
}
