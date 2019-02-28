import React, { Component } from 'react'
import io from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_SOCKET_PORT}`);

export default class Basket extends Component {
    
    constructor(props) {
        super(props);
        this.state = {}
        
    }
    handleClick(){
        socket.emit('clicked');
        socket.on('clicked',(data)=>{
            console.log(data)
        });
        
        
    }
    render() {
        console.log(this.state)
        console.log(`${process.env.REACT_APP_API_URL}`)
        return (
            <div>
                <button onClick={this.handleClick}>click me</button>
            </div>
        )
    }
}
