import React, { PureComponent } from 'react'
import { SideMenu } from '../../ui'

export default class extends PureComponent {
  state = {
    showThinking: false
  }

  render() {
    const { showThinking } = this.state
    return (
      <SideMenu
        position={1}
        items={[1].map(item => (
          <div key={item}>
            <p>This will show a summary of all the apps. Maybe provide links to the WMS servers being used, etc.</p>
          </div>
        ))}
        icon={'info'}
        showThinking={showThinking}
      />
    )
  }
}
