import React from 'react'
import { ExpansionList, ExpansionPanel, Divider } from 'react-md'

const dividerStyle = {
  marginBottom: '10px'
}

export default ({ protocols }) => (
  <ExpansionList>
    {protocols.map(p => (
      <ExpansionPanel key={`variables-detail-${p}`} label={p} defaultExpanded={false} footer={false}>
        <p style={{ fontWeight: 'bold' }}>DOI</p>
        <p>{p.class}</p>
        <Divider style={dividerStyle} />

        <p style={{ fontWeight: 'bold' }}>TITLE</p>
        <p>{p.domain}</p>
        <Divider style={dividerStyle} />

        <p style={{ fontWeight: 'bold' }}>AUTHOR</p>
        <p>{p.description}</p>
        <Divider style={dividerStyle} />

        <p style={{ fontWeight: 'bold' }}>PUBLISHER</p>
      </ExpansionPanel>
    ))}
  </ExpansionList>
)
