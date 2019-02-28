import React, { Component } from 'react'
import io from 'socket.io-client';

export default class Simon extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect("http://localhost:3000/basket");
    this.state = {
    };
    
    
}
render() {
    return (
        <div>
            
        </div>
    )
}
}
