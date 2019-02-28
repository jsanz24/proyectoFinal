import React, { Component } from 'react'
import io from 'socket.io-client';

export default class Basket extends Component {
    constructor(props) {
        super(props);
        this.socket = io.connect("http://localhost:3000/basket");
        this.state = {
            name:"jesus",
        };
        
            // socket.on('chat message1', function(msg){
            //     console.log(socket.id)
            //     io.emit('chat message1', msg);
            // });
        
    }
    render() {
        console.log(this.socket)
        return (
            <div>
                
            </div>
        )
    }
}
