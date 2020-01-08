import React from 'react'
import { Divider } from 'react-md'

export default ({ searchResults }) => (
  <div style={{ padding: '20px' }}>
    {searchResults.map((rcrd, i) => (
      <div key={i}>
        <p
          style={{
            maxHeight: '300px',
            overflow: 'auto',
            padding: '15px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            backgroundColor: 'rgba(0,0,0,0.1)'
          }}
        >
          {JSON.stringify(rcrd, null, 2)}
        </p>
        <Divider style={{ margin: '20px' }} />
      </div>
    ))}
  </div>
)
