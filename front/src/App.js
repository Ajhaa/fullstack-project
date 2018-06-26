import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/events')
      .then(response => {
        this.setState({ events: response.data })
        console.log(this.state.events)
      })

  }
  render() {
    return (
      <div className="App">
        <div>{this.state.events.map(e => <div>{e.title}</div>)}</div>
      </div>
    );
  }
}

export default App;
