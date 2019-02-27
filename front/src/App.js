import React, { Component } from 'react';
import './App.css';
import {Switch,Route} from "react-router-dom"
import Login from './Components/Login';
import Signup from './Components/Signup';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/"  component={Login}></Route>
          <Route exact path="/signup"  component={Signup}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
