import React from 'react'
import { Button, CircularProgress /*Snackbar*/ } from 'react-md'
const minimumProgressDisplayTimeMS = 1500

/*
This Class renders a save Button and a progress indicator. 
The progress indicator is visible for the duration of the passed function AND minimumProgressDisplayTimeMS
*/

//Possible Changes:
//->Have the setTimeout actually be an indicator that the operation is done by having the indicator colour change to green within the setTimout()
class saveButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayProgress: false, //displayProgress indicates if the save button has been clicked but the onClick event hasn't finished yet
      progressSuccess: false //progressSuccess indicates if the save was successful. This is to be implemented still
    }
  }

  render() {
    return (
      <div className="saveButton" style={this.props.containerStyle}>
        <Button
          style={this.props.buttonStyle}
          swapTheming={!this.state.displayProgress} //swap theming interferes with greying out the button so it is set to false during onClick()
          primary
          flat
          disabled={this.state.displayProgress} //greying out the button while the progress par is displayed
          iconChildren="save"
          onClick={() => {
            this.setState({ displayProgress: true })
            this.props.onClick(
              1,
              setTimeout(() => {
                this.setState({ displayProgress: false }) //this is only reached once the minimum time has passed AND the callback has fired
              }, minimumProgressDisplayTimeMS)
            )
          }}
        >
          save
        </Button>
        {this.state.displayProgress ? (
          <CircularProgress id="progress-circle" style={this.props.progressStyle} /> //This ProgressIndicator is only rendered while the save operation is in action
        ) : (
          undefined
        )}
      </div>
    )
  }
}

export default saveButton
