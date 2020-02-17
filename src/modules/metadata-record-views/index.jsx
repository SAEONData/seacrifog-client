import React from 'react'
import IcosMetadataRecordView from './_icos'
import SaeonMetadataRecordView from './_saeon'

const organizations = ['icos', 'saeon']

export default ({ sourceIndex, ...props }) =>
  sourceIndex === 0 ? (
    <IcosMetadataRecordView source={organizations[sourceIndex]} {...props} />
  ) : (
    <SaeonMetadataRecordView source={organizations[sourceIndex]} {...props} />
  )
