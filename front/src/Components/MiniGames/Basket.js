import React, { Component } from 'react'
import io from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_API_URL}`);

function calculate(cb) {
    socket.emit('clicked');
    socket.on('clicked', data => cb(null,data));
}

export default class Basket extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            speedX: 0, 
            speedY: 0, 
            speedZ: 0,
            score: []
        };
        this.test();
    }
    test(){
        console.log(window.DeviceMotionEvent)
        if(window.DeviceMotionEvent){
            window.addEventListener("devicemotion", event => {
                
                let speedX = this.state.speedX;
                let speedY = this.state.speedY;
                let speedZ = this.state.speedZ;
                
                if(speedX < event.acceleration.x){
                    speedX = event.acceleration.x;
                    calcMove(this)
                } 
                if(speedY < event.acceleration.y){
                    speedY = event.acceleration.y;
                    calcMove(this)
                } 
                if(speedZ < event.acceleration.z){
                    speedZ = event.acceleration.z;
                    calcMove(this)
                } 
                
                function calcMove(that){
                    socket.emit("move", {speedX,speedY,speedZ})
                    socket.on('move', data => {
                        console.log(data)
                    });
                    socket.on('moveAll', data => {
                        console.log(data)
                        if(that.state.speedX == 0){
                            that.setState({score: data.move})
                        }
                    });
                }
                
                this.setState({ speedX, speedY, speedZ})
                
            }, false);
        }
        else{
            console.log("correcto")
        }
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
                {this.state.speedX == 0?this.state.score.map(elem => <div>{elem.id}  {elem.score}</div>):
                <div>
                    <p>SpeedX: {this.state.speedX.toFixed(2)}</p>
                    <p>SpeedY: {this.state.speedY.toFixed(2)}</p>
                    <p>SpeedZ: {this.state.speedZ.toFixed(2)}</p>
                </div>}
            </div>
        )
    }
}

//<canvas ref="canvas" width={window.innerWidth} height={window.innerHeight}/>
// function rect(props) {
//     const {ctx, x, y, width, height} = props;
//     ctx.fillRect(x, y, width, height);
// }
// componentDidMount() {
    //     this.updateCanvas();
    // }
    
    // updateCanvas() {
        //     const ctx = this.refs.canvas.getContext('2d');
        //     ctx.clearRect(0,0, 300, 300);
    
        //     rect({ctx, x: 100, y: 100, width: 50, height: 50});
        //     rect({ctx, x: 160, y: 100, width: 50, height: 50});
        //     rect({ctx, x: 100, y: 160, width: 50, height: 50});
        //     rect({ctx, x: 160, y: 160, width: 50, height: 50});
        // }