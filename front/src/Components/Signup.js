import React, { Component } from 'react'
import {Redirect} from "react-router-dom"
import authService from "../Service/authSevice"

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', redirect: false };
        this.service = new authService();
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;

        this.service.signup(username, password)
            .then(response => {
            this.setState({
                username: username,
                password: password,
                redirect:true
            }); 
            this.props.getUser(response)       
        })
        .catch( error => console.log(error))
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({...this.state, [name]: value });
    }
    render() {
        return (
            <div>
                {this.state.redirect ? <Redirect to="/home" /> : ""}
                <form onSubmit={this.handleFormSubmit}>
                    <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)}></input>
                    <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)}></input>
                    <button>Sign Up</button>
                </form>
            </div>
        )
    }
}
