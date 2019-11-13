import React from 'react'
import { Button, LinearProgress, CircularProgress } from 'react-md'

const minimumProgressDisplayTimeMS = 1000

/*
This Class renders a save Button and a progress indicator. 
The progress indicator is visible for the duration of the passed function AND minimumProgressDisplayTimeMS
If props.linear is true, a LinearProgress Component is displayed
If props.Circular is true, a LinearCircular Component is displayed
*/
class saveButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { displayProgress: false }
  }

  render() {
    return (
      <div className="saveButton">
        {this.state.displayProgress && this.props.linear ? <LinearProgress id="progress-bar" /> : undefined}

        <div className="flexItems" style={{ display: 'flex', float: 'left' }}>
          <Button
            onClick={() => {
              this.setState({ displayProgress: true })
              const editableFields = Object.entries(this.props.fields).filter(field => {
                //move this back to entity-editor as part of props.onClick()
                return this.props.fieldDefinitions[field[0]].display && this.props.fieldDefinitions[field[0]].editable
              })
              console.log(editableFields)
              this.props.onClick(
                {
                  variables: {
                    input: [
                      {
                        id: this.props.fields.id,
                        ...Object.fromEntries(editableFields)
                      }
                    ]
                  }
                },
                setTimeout(() => {
                  this.setState({ displayProgress: false }) //this is only reached once the minimum time has passed AND the callback has fired
                }, minimumProgressDisplayTimeMS)
              )
            }}
            style={{ marginTop: '10px', marginRight: '5px', marginBottom: '10px' }}
            swapTheming
            primary
            flat
            iconChildren="save"
          >
            save
          </Button>
          {this.state.displayProgress && this.props.circular ? <CircularProgress id="progress-circle" /> : undefined}
        </div>
      </div>
    )
  }
}

export default saveButton
