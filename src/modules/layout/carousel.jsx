import React, { PureComponent } from 'react'
import { Flipper, Flipped } from 'react-flip-toolkit'
import FundingAcknowledgement from './funding-acknowledgement'
import partners from './partners'

function shufflePartnersPreferentially(items) {
  const fixedItems = items.filter(item => item.fixed)
  const randomItems = items.filter(item => !item.fixed)
  for (var c = randomItems.length - 1; c > 0; c--) {
    var b = Math.floor(Math.random() * (c + 1))
    var a = randomItems[c]
    randomItems[c] = randomItems[b]
    randomItems[b] = a
  }
  return [...fixedItems, ...randomItems]
}

export default class extends PureComponent {
  state = {
    items: shufflePartnersPreferentially(partners)
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ items: shufflePartnersPreferentially([...this.state.items]) })
    }, 300000)
  }

  componentWillMount() {
    clearInterval(this.timer)
  }

  render() {
    const { currentMedia } = this.props
    const { items } = this.state
    return (
      <div style={{ margin: 0, height: 64, overflow: 'hidden' }}>
        <Flipper flipKey={items.map(item => item.id).join('')} spring="noWobble">
          <ul style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
            {items.map((item, i) => (
              <Flipped key={item.id} flipId={item.id}>
                <li style={{ display: 'inline-block', float: 'right' }}>
                  {
                    <FundingAcknowledgement
                      key={i}
                      mediaType={currentMedia}
                      imgPath={item.logo}
                      alt={item.alt}
                      content={
                        <>
                          {item.content.split('\n').map((c, i) => (
                            <p key={i}>{c}</p>
                          ))}
                          <a className="link" target="_blank" rel="noopener noreferrer" href={item.href}>
                            more information
                          </a>
                        </>
                      }
                    />
                  }
                </li>
              </Flipped>
            ))}
          </ul>
        </Flipper>
      </div>
    )
  }
}
