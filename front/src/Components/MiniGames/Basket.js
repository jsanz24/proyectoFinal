import React, { Component } from 'react'
import io from 'socket.io-client';
import "./Feria.css"

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
            score: [],
            movement: "cuadrado ",
            bellResizing: "bell ", 
            score2: 0
        };
        this.test();
    }

    calcMove(speedX,speedY,speedZ){
        socket.emit("move", {speedX,speedY,speedZ})
        socket.on('move', data => {
            this.movement(data)
        });
        socket.on('moveAll', data => {
            console.log(data)
            if(this.state.speedX == 0){
                this.setState({score: data.move})
            }
        });
        
    }

    movement(data){
        let className = "cuadrado "
        let points = Math.floor(data.score);
        if (points >= 100){
            className += "topHit "
            this.bellResizing()
        } 
        else if (points >= 80 && points <= 99){
            className += "power80Hit "
        }
        else if (points >= 60 && points <= 79){
            className += "power60Hit "
        }
        else if (points >= 40 && points <= 59){
            className += "power40Hit "
        }
        this.setState({ ...this.state, movement:className, score2: data})
    }

    bellResizing(){
        let className = "bell "
        let points = 120;
        if (points >= 100){
            className += "bellAnimation "
        } 
        this.setState({ ...this.state, bellResizing:className})
    }
    test(){
        console.log(window.DeviceMotionEvent)
        if(window.DeviceMotionEvent){
            window.addEventListener("devicemotion", event => {
                
                let speedX = this.state.speedX;
                let speedY = this.state.speedY;
                let speedZ = this.state.speedZ;
                
                if(speedX < event.acceleration.x && event.acceleration.x){
                    speedX = event.acceleration.x;
                    this.setState({ speedX, speedY, speedZ})
                    if(speedX > 20) this.calcMove(speedX,speedY,speedZ)
                } 
                if(speedY < event.acceleration.y && event.acceleration.y){
                    speedY = event.acceleration.y;
                    this.setState({ speedX, speedY, speedZ})
                    if(speedY > 20) this.calcMove(speedX,speedY,speedZ)
                } 
                if(speedZ < event.acceleration.z && event.acceleration.z){
                    speedZ = event.acceleration.z;
                    this.setState({ speedX, speedY, speedZ})
                    if(speedZ > 20) this.calcMove(speedX,speedY,speedZ)
                } 
                
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
                <p>{this.state.speedX}</p>
                {this.state.speedX == 0?this.state.score.map(elem => <div>{elem.id}  {elem.score}</div>):
                <div>
                    <p>SpeedX: {this.state.speedX.toFixed(2)}</p>
                    <p>SpeedY: {this.state.speedY.toFixed(2)}</p>
                    <p>SpeedZ: {this.state.speedZ.toFixed(2)}</p>
                    <p>Score: {JSON.stringify(this.state.score2)}</p>
                    <p>Classes: {this.state.movement}</p>
                    <div style={{position: "relative"}}>
                        <img alt="" className="fair" src="../../../img/juego-martillo.png" />
                        <img alt="" className={this.state.bellResizing} src="../../../img/campana.png" />
                        <img alt="" className={this.state.movement} src="../../../img/cuadrado.png" />
                    </div>
                </div>}
                <div id="winner">
                </div>
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