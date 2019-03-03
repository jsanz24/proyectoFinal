import React, { Component } from 'react';
import './App.css';
import {Switch,Route} from "react-router-dom"
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Feria from './Components/MiniGames/Feria';
import Basket from './Components/MiniGames/Basket';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/"  component={Login}></Route>
          <Route exact path="/signup"  component={Signup}></Route>
          <Route exact path="/home"  component={Home}></Route>
          <Route exact path="/feria"  component={Feria}></Route>
          <Route exact path="/basket"  component={Basket}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
