import React, { Component } from 'react'
import {Link, Redirect} from "react-router-dom"
import authService from "../Service/authSevice"
import "./login.scss"

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', redirect: false };
        this.service = new authService();
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;

        this.service.login(username, password)
            .then(response => {
            this.setState({
                username: username,
                password: password,
                error: false,
                redirect:true
            });
            this.props.getUser (response);        
        })
        .catch( error => {console.log(error) 
            this.setState({
                username: username,
                password: password,
                error:true
            })
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({...this.state, [name]: value });
    }
    render() {
        return (
            <div className="login-page">
                <div className="wrapper">
                {this.state.redirect ? <Redirect to="/home" /> : ""}
                <form className="form-signin" onSubmit={this.handleFormSubmit}>
                    <h2 className="form-signin-heading">Login</h2>
                    <input className="form-control" type="text" name="username" placeholder="name" value={this.state.username} onChange={e => this.handleChange(e)}></input>
                    <input className="form-control" type="password" name="password" placeholder="password" value={this.state.password} onChange={e => this.handleChange(e)}></input>
                    <label className="checkbox"></label>
                    <button className="button full">Log In</button>
                    <p className="account-message">
                        Don't have an account yet?
                    </p>
                    <Link to="/signup">Sign Up</Link>
                </form>
                    
                </div>
            </div>
        )
    }
}


   
   
