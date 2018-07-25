import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import eventService from './services/events'
import loginService from './services/login'
import userService from './services/users'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'

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

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
    }
  }

  handleLoginField = (event) => {
    return this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

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
        <Router>
          <div>
            <div>
              {this.state.user === null ? <div>not logged in</div> : <div>Logged in as {this.state.user.username}</div>}
            </div>
            <Route exact path="/" render={() =>
              <div>
                <h4>Events: </h4>
                <div>
                  {this.state.events.map(e => <div onClick={() => this.userToEvent(e.id)} key={e.id}>{e.title}</div>)}
                </div>
              </div>}
            />
            <Route path="/login" render={() =>
              <LoginForm
                username={this.state.username}
                password={this.state.password}
                handlePassword={this.handleLoginField}
                handleUsername={this.handleLoginField}
                handleLogin={this.handleLogin}
              />}
            />
            <Route path="/register" render={() =>
              <RegistrationForm
                username={this.state.regUsername}
                password={this.state.regPassword}
                realname={this.state.realname}
                handleUsername={this.handleLoginField}
                handlePassword={this.handleLoginField}
                handleRealname={this.handleLoginField}
                handleRegistration={this.handleRegistration}
              />}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
