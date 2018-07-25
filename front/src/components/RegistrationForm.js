import React from 'react'

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

export default RegistrationForm
