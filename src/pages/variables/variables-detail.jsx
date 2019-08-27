import React from 'react'
import Form from '../../modules/form'
import { ExpansionList, ExpansionPanel, Divider, DropdownMenu, TextField, ListItem, ListItemControl, Checkbox, FontIcon } from 'react-md'

const dividerStyle = {
  marginBottom: '10px'
}

export default ({ variables, updateMainForm, selectedProtocols }) => (
  <ExpansionList>
    {variables.map(v => (
      <Form searchTerm="">
        {({ updateForm, searchTerm }) => (
          <ExpansionPanel key={`variables-detail-${v.id}`} label={v.name} defaultExpanded={false} footer={false}>
            <p style={{ fontWeight: 'bold' }}>CLASS</p>
            <p>{v.class}</p>
            <Divider style={dividerStyle} />

            <p style={{ fontWeight: 'bold' }}>DOMAIN</p>
            <p>{v.domain}</p>
            <Divider style={dividerStyle} />

            <p style={{ fontWeight: 'bold' }}>DESCRIPTION</p>
            <p>{v.description}</p>
            <Divider style={dividerStyle} />

            <p style={{ fontWeight: 'bold' }}>PROTOCOLS</p>
            <DropdownMenu
              id={`protocols-search-menu-for-v-${v.id}`}
              style={{ width: '100%' }}
              menuItems={(() => {
                const protocolsList = v.protocols
                  .map(p => {
                    const search = searchTerm.toUpperCase()
                    const doiFound = p.doi.toUpperCase().indexOf(search) >= 0 ? true : false
                    const titleFound = p.title.toUpperCase().indexOf(search) >= 0 ? true : false
                    const authorFound = p.author.toUpperCase().indexOf(search) >= 0 ? true : false
                    const publisherFound = p.publisher.toUpperCase().indexOf(search) >= 0 ? true : false
                    if (doiFound || titleFound || authorFound || publisherFound) {
                      return (
                        <ListItemControl
                          key={`variable-${v.id}-prototocl-${p.id}`}
                          style={{ width: '100%' }}
                          leftIcon={<FontIcon style={{ marginLeft: '10px' }}>code</FontIcon>}
                          secondaryText={`${p.author.truncate(150)}`}
                          primaryAction={
                            <Checkbox
                              id={`variable-toggle-${v.id}-p-${p.id}`}
                              label={p.title}
                              name={p.title}
                              labelBefore
                              checked={selectedProtocols.includes(p.id) ? true : false}
                              onChange={val => {
                                if (val)
                                  updateMainForm({
                                    selectedProtocols: [...selectedProtocols, p.id]
                                  })
                                else
                                  updateMainForm({
                                    selectedProtocols: [...selectedProtocols].filter(id => id !== p.id)
                                  })
                              }}
                            />
                          }
                        />
                      )
                    } else {
                      return null
                    }
                  })
                  .filter(_ => _)
                return protocolsList.length > 0 ? protocolsList : <ListItem primaryText="No protocols found" />
              })()}
              anchor={{
                x: DropdownMenu.HorizontalAnchors.INNER_LEFT,
                y: DropdownMenu.VerticalAnchors.BOTTOM
              }}
              position={DropdownMenu.Positions.BELOW}
            >
              <TextField
                id="variables-search-text"
                label="Search"
                autoComplete="off"
                value={searchTerm}
                placeholder="Search protocols by DOI, title, author, or publisher"
                onChange={val => updateForm({ searchTerm: val })}
              />
            </DropdownMenu>
          </ExpansionPanel>
        )}
      </Form>
    ))}
  </ExpansionList>
)
