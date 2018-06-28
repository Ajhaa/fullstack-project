import React, { Component } from 'react'
import eventService from './services/events'
import loginService from './services/login'

const LoginForm = (props) => (
  <form onSubmit={props.handleLogin}>
    <div>Login:</div>
    <div>
      <input
        name="username"
        value={props.username}
        onChange={props.handleUsername}
        type="text"
      />
    </div>
    <div>
      <input
      name="password"
      value={props.password}
      onChange={props.handlePassword}
      type="text"
    />
    </div>
    <div>
      <button type="submit">login</button>
    </div>
  </form>
)



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    eventService
      .getAll()
      .then(data => {
        this.setState({ events: data })
        console.log(this.state.events)
      })
  }

  handleLoginField = (event) => {
    return this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin = async (event) => {
    event.preventDefault()
    console.log("LOGIN ATTEMPT")
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      console.log('USER:', user)

      this.setState({ username: '', password: '', user: user })
    } catch (error) {
      console.log('ERROR: invalid username or password')
    }
  }


  render() {
    return (
      <div className="App">
        <h4>Events: </h4>
        <div>
          {this.state.events.map(e => <div key={e.id}>{e.title}</div>)}
        </div>
        <LoginForm
          username = { this.state.username }
          password = { this.state.password }
          handlePassword = { this.handleLoginField }
          handleUsername = { this.handleLoginField }
          handleLogin = { this.handleLogin }
        />
      </div>
    );
  }
}

export default App;
