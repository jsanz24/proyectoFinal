import React, { Component } from 'react'
import io from 'socket.io-client';

const socket = io(process.env.SOCKET_PORT);
function subscribeToTimer(cb) {
    socket.emit('subscribeToTimer', 1000);
    socket.on('timer', timestamp => cb(null, timestamp));
  }
export default class Basket extends Component {
    
    constructor(props) {
        super(props);
<<<<<<< HEAD
        this.socket = io.connect("http://localhost:3000/basket");
        this.state = {
            name:"jesus",
        };
=======
>>>>>>> 3dc9ef76b2eea4636c0e516be2ea71751352d7fb
        
        this.state = {}
        subscribeToTimer((err, timestamp) => {
            console.log("puto")
            this.setState({ 
                timestamp 
            })
        });
            // socket.on('chat message1', function(msg){
            //     console.log(socket.id)
            //     io.emit('chat message1', msg);
            // });
        
    }
    handleClick(){
        socket.emit('clicked');
        socket.on('clicked');
        
    }
    render() {
        console.log(this.state)
        return (
            <div>
                {/* <meta httpEquiv="origin-trial" data-feature="Generic Sensors" data-expires="2018-02-27" content="AjL+UlBzLjx+0FPXrML6IMA/Ax9GsO/7rUvV/aaKkh3KknUSwDBgymn0d3NhGeRMNS7FlYD73ernqvZNoqzNMw4AAABWeyJvcmlnaW4iOiJodHRwczovL2ludGVsLmdpdGh1Yi5pbzo0NDMiLCJmZWF0dXJlIjoiR2VuZXJpY1NlbnNvciIsImV4cGlyeSI6MTUxOTczOTAwNX0="></meta>
                <script src="./main.js"></script>
                <script src="./gauge.js"></script>
                <link href="./styles.css"></link>
                <div id="game_text" className="shakeToStart" style={{display:"none"}}>
                    Shake device and find out!
                </div>
                <canvas id="gauge"></canvas>
                <div id="measurement" className="shakeToStart">
                    <div id="preview">0</div>
                    <div>km/h</div>
                </div> */}
                <button onClick={this.handleClick}>click me</button>
            </div>
        )
    }
}
