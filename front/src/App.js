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

const UserScore = (props) => {
  if (user === null) {
    return <div />
  }
  return (
    <div>
      <div>score: {user.score}</div>
    </div>
  )
}

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

      console.log("USER:", user)

      this.setState({ username: '', password: '', user: user })
    } catch (error) {
      console.log('ERROR: invalid username or password')
    }
  }

  userToEvent = async (id) => {
    console.log("USER TO EVENT")
    try {
      await eventService.connectToEvent(id, this.state.user.token)
    } catch (error) {
      console.log(error)
    }
  }


  render() {
    return (
      <div className="App">
        <h4>Events: </h4>
        <div>
          {this.state.events.map(e => <div onClick={ () => this.userToEvent(e.id) } key={e.id}>{e.title}</div>)}
        </div>
        <LoginForm
          username = { this.state.username }
          password = { this.state.password }
          handlePassword = { this.handleLoginField }
          handleUsername = { this.handleLoginField }
          handleLogin = { this.handleLogin }
        />
        <UserScore user={this.state.user} />
      </div>
    );
  }
}

export default App;
