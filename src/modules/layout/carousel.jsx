import React, { PureComponent } from 'react'
import { Flipper, Flipped } from 'react-flip-toolkit'
import FundingAcknowledgement from './funding-acknowledgement'
import partners from './partners'

function shuffleArray(d) {
  for (var c = d.length - 1; c > 0; c--) {
    var b = Math.floor(Math.random() * (c + 1))
    var a = d[c]
    d[c] = d[b]
    d[b] = a
  }
  return d
}

export default class extends PureComponent {
  state = {
    items: partners
    // items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ items: shuffleArray([...this.state.items]) })
    }, 4000)
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
