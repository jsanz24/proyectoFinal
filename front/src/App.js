import React, { Component } from 'react';
import './App.css';
import {Switch,Route} from "react-router-dom"
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Feria from './Components/Feria/Feria';
import Basket from './Components/Basket/basket'
import authService from './Service/authSevice'
import West from './Components/west/west';


class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new authService();
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/"  render={() => <Login getUser={this.getTheUser}/>}></Route>
          <Route exact path="/signup" render={() => <Signup getUser={this.getTheUser}/>}></Route>
          <Route exact path="/home"  component={Home}></Route>
          <Route exact path="/feria"  component={Feria}></Route>
          <Route exact path="/basket"  component={Basket}></Route>
          <Route exact path="/west"  component={West}></Route>
        </Switch>
        
      </div>
    );
  }
}

export default App;
