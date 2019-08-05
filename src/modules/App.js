import React from 'react'

class App extends React.Component {
  async componentDidMount() {
    try {
      const result = await new Promise((resolve, reject) => {
        fetch('http://localhost:3000')
          .then(result => result.text())
          .then(text => resolve(text))
          .catch(err => reject(err))
      })
      console.log(result)
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return <div>hello world</div>
  }
}

export default App;
