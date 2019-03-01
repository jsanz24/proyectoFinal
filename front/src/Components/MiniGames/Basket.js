import React, { Component } from 'react'
import io from 'socket.io-client';

const socket = io.connect();

function calculate(cb) {
    socket.emit('clicked');
    socket.on('clicked', data => cb(null,data));
}
export default class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', redirect: false };
    }
    handleClick(e){
        calculate((err, data) => {
            console.log(data)
            if(data) this.setState({...this.state, a: true });
        });
    }
    render() {
        return (
            <div>
                <button onClick={(e) =>this.handleClick(e)}>click me</button>
                {this.state.a?<p>Hola</p>:<p>Adios</p>}
            </div>
        )
    }
}
