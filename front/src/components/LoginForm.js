import React from 'react'

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

export default LoginForm
