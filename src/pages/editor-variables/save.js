export default ({ originalFields, fields, executeMutation, fieldDefinitions }) => {
  //related entities IDs: (int arrays)
  //Related Dataproducts
  const originalDataproducts = Object.entries(originalFields.dataproducts).map(item => item[1].id) || []
  const fieldsDataproducts = Object.entries(fields.dataproducts).map(item => item[1].id) || []
  //Related Indirectly Protocols
  const originalIndirectlyRelatedProtocols =
    Object.entries(originalFields.indirectly_related_protocols).map(item => item[1].id) || []
  const fieldsIndirectlyRelatedProtocols =
    Object.entries(fields.indirectly_related_protocols).map(item => item[1].id) || []
  //Related directly Protocols
  const originalDirectlyRelatedProtocols =
    Object.entries(originalFields.directly_related_protocols).map(item => item[1].id) || []
  const fieldsDirectlyRelatedProtocols = Object.entries(fields.directly_related_protocols).map(item => item[1].id) || []
  //Related Radiative Forcings
  const originalRForcings = Object.entries(originalFields.rforcings).map(item => item[1].id) || []
  const fieldsRForcings = Object.entries(fields.rforcings).map(item => item[1].id) || []

  //Determining addDataproducts value
  fields.addDataproducts = fieldsDataproducts.filter(id => (originalDataproducts.includes(id) ? false : true))
  if (fields.addDataproducts === undefined) fields.addDataproducts = []
  if (fields.addDataproducts.length > 0) fieldDefinitions.addDataproducts.pristine = false

  //Determining removeDataproducts value
  fields.removeDataproducts = originalDataproducts.filter(id => (fieldsDataproducts.includes(id) ? false : true))
  if (fields.removeDataproducts === undefined) fields.removeDataproducts = []
  if (fields.removeDataproducts.length > 0) fieldDefinitions.removeDataproducts.pristine = false

  //Determining addDirectlyRelatedProtocols value
  fields.addDirectlyRelatedProtocols = fieldsDirectlyRelatedProtocols.filter(id =>
    originalDirectlyRelatedProtocols.includes(id) ? false : true
  )
  if (fields.addDirectlyRelatedProtocols === undefined) fields.addDirectlyRelatedProtocols = []
  if (fields.addDirectlyRelatedProtocols.length > 0) fieldDefinitions.addDirectlyRelatedProtocols.pristine = false

  //Determining addIndirectlyRelatedProtocols value
  fields.addIndirectlyRelatedProtocols = fieldsIndirectlyRelatedProtocols.filter(id =>
    originalIndirectlyRelatedProtocols.includes(id) ? false : true
  )
  if (fields.addIndirectlyRelatedProtocols === undefined) fields.addIndirectlyRelatedProtocols = []
  if (fields.addIndirectlyRelatedProtocols.length > 0) fieldDefinitions.addIndirectlyRelatedProtocols.pristine = false

  //Determining removeProtocols value
  fields.removeProtocols = originalIndirectlyRelatedProtocols
    .filter(id => (fieldsIndirectlyRelatedProtocols.includes(id) ? false : true))
    .concat(originalDirectlyRelatedProtocols.filter(id => (fieldsDirectlyRelatedProtocols.includes(id) ? false : true)))
  if (fields.removeProtocols === undefined) fields.removeProtocols = []
  if (fields.removeProtocols.length > 0) fieldDefinitions.removeProtocols.pristine = false

  //Determining addRforcings value
  fields.addRForcings = fieldsRForcings.filter(id => (originalRForcings.includes(id) ? false : true))
  if (fields.addRForcings === undefined) fields.addRForcings = []
  if (fields.addRForcings.length > 0) fieldDefinitions.addRForcings.pristine = false

  //Determining removeRforcings value
  fields.removeRForcings = originalRForcings.filter(id => (fieldsRForcings.includes(id) ? false : true))
  if (fields.removeRForcings === undefined) fields.removeRForcings = []
  if (fields.removeRForcings.length > 0) fieldDefinitions.removeRForcings.pristine = false

  //Firing the actual Database mutation based on fields value
  executeMutation(
    {
      variables: {
        input: [
          {
            id: fields.id,
            ...Object.fromEntries(
              Object.entries(fields).filter(([key]) =>
                fieldDefinitions[key] ? !fieldDefinitions[key].pristine : false
              )
            )
          }
        ]
      }
    },
    () => (originalFields = JSON.parse(JSON.stringify(variable))) //callback to update originalFields once mutation has ended
  )
}
