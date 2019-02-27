import React, { Component } from 'react'

export default class Signup extends Component {
  render() {
    return (
      <div>
        <input type="text" name="username"></input>
        <input type="password" name="password"></input>
        <button>Sign Up</button>
      </div>
    )
  }
}
