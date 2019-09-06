import React from 'react'
import { Toolbar, Cell } from 'react-md'

export default ({ t1, t2, t3 }) => (
  <Toolbar className={'md-grid'} zDepth={0} prominent>
    <Cell size={12} style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '20px', lineHeight: '28px' }}>{t1}</p>
      <p style={{ fontSize: '15px' }}>{t2}</p>
      <p style={{ fontSize: '15px' }}>{t3}</p>
    </Cell>
  </Toolbar>
)
