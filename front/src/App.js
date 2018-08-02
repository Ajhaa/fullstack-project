import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import eventService from './services/events'
import loginService from './services/login'
import userService from './services/users'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import EventView from './components/EventView'


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

  async componentDidMount() {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    console.log('USER:', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      loginService.setAuth()
    }

    let events = await eventService.getAll()
    this.setState({ events: events })

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
      loginService.setAuth()

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
    try {
      await eventService.connectToEvent(id, this.state.user.token)
    } catch (error) {
      console.log(error)
    }
  }

  eventById = (id) => {
    console.log(this.state)
    return this.state.events.find(event => event.id === Number(id))
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
                  {this.state.events.map(e =>
                    <div key={e.id}>
                      <Link to={`event/${e.id}`}>{e.title}</Link>
                    </div>
                  )}
                </div>
              </div>
            }
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
            <Route exact path="/event/:id" render={({ match }) =>
              <EventView
                event={this.eventById(match.params.id)}
                completed="false"
                onClick={() => this.userToEvent(match.params.id)} />
            } />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
