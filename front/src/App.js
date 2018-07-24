import React, { Component } from 'react'
import eventService from './services/events'
import loginService from './services/login'
import userService from './services/users'

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

const RegistrationForm = (props) => (
  <form onSubmit={props.handleRegistration}>
    <h4>Register</h4>
    <div>Username:</div>
    <input
      name="regUsername"
      value={props.username}
      onChange={props.handleUsername}
      type="text"
    />
    <div>Name:</div>
    <input
      name="realname"
      value={props.realname}
      onChange={props.handleRealname}
      type="text"
    />
    <div>Password:</div>
    <input
      name="regPassword"
      value={props.password}
      onChange={props.handlePassword}
      type="text"
    />
    <div>
      <button type="submit">register</button>
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
      regUsername: '',
      regPassword: '',
      realname: '',
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

  handleRegistration = async (event) => {
    event.preventDefault()
    console.log("REGISTRATION ATTEMPT")
    try {
      await userService.createUser({
        username: this.state.regUsername,
        realname: this.state.realname,
        password: this.state.regPassword
      })
    } catch (error) {
      console.log(error)
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
        <RegistrationForm
          username = {this.state.regUsername}
          password = {this.state.regPassword}
          realname = {this.state.realname}
          handleUsername = {this.handleLoginField}
          handlePassword = {this.handleLoginField}
          handleRealname = {this.handleLoginField}
          handleRegistration = {this.handleRegistration}
        />
      </div>
    );
  }
}

export default App;
