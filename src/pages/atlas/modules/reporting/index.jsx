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
        position={2}
        items={[1].map(item => (
          <div key={item}>
            <p>A second menu showing other chart options</p>
            <p>This could provide controls to show charts?</p>
          </div>
        ))}
        icon={'show_chart'}
        showThinking={showThinking}
      />
    )
  }
}
