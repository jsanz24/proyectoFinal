import React, { Component } from 'react'
import io from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_API_URL}`);

function calculate(cb) {
    socket.emit('clicked');
    socket.on('clicked', data => cb(null,data));
}

function rect(props) {
    const {ctx, x, y, width, height} = props;
    ctx.fillRect(x, y, width, height);
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
    componentDidMount() {
        this.updateCanvas();
    }
    
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0,0, 300, 300);
        
        rect({ctx, x: 100, y: 100, width: 50, height: 50});
        rect({ctx, x: 160, y: 100, width: 50, height: 50});
        rect({ctx, x: 100, y: 160, width: 50, height: 50});
        rect({ctx, x: 160, y: 160, width: 50, height: 50});
    }
    render() {
        return (
            <div>
                <button onClick={(e) =>this.handleClick(e)}>click me</button>
                {this.state.a?<p>Hola</p>:<p>Adios</p>}
                <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight}/>
            </div>
        )
    }
}
