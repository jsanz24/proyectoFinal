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
        };
        this.test();
    }
    calcMove(speedX,speedY,speedZ){
        socket.emit("move", {speedX,speedY,speedZ})
        socket.on('move', data => {
            console.log(data)
            if(data.finish){
                console.log(data.move)
                this.showPC(data)
            }
            else this.movement(data)
        });
    }
    showPC(data){
        if(this.state.speedX == 0) this.setState({...this.state, score: data.move})
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
        this.setState({ ...this.state, movement:className})
    }

    bellResizing(){
        let className = "bell "
        className += "bellAnimation "
        this.setState({ ...this.state, bellResizing:className})
    }
    test(){
        if(window.DeviceMotionEvent){
            window.addEventListener("devicemotion", event => {
                
                let speedX = this.state.speedX;
                let speedY = this.state.speedY;
                let speedZ = this.state.speedZ;
                
                if(speedX < event.acceleration.x && event.acceleration.x){
                    speedX = event.acceleration.x;
                    this.setState({...this.state, speedX, speedY, speedZ})
                    if(speedX > 20) this.calcMove(speedX,speedY,speedZ)
                } 
                if(speedY < event.acceleration.y && event.acceleration.y){
                    speedY = event.acceleration.y;
                    this.setState({...this.state, speedX, speedY, speedZ})
                    if(speedY > 20) this.calcMove(speedX,speedY,speedZ)
                } 
                if(speedZ < event.acceleration.z && event.acceleration.z){
                    speedZ = event.acceleration.z;
                    this.setState({...this.state, speedX, speedY, speedZ})
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
                <p>{this.state.speedX}</p>
                <p>Score: {JSON.stringify(this.state.score)}</p>
                {this.state.speedX == 0?this.state.score.map(elem => <div>{elem.id} - {elem.score}</div>):
                <div>
                    <p>SpeedX: {this.state.speedX.toFixed(2)}</p>
                    <p>SpeedY: {this.state.speedY.toFixed(2)}</p>
                    <p>SpeedZ: {this.state.speedZ.toFixed(2)}</p>
                    <p>Classes: {this.state.movement}</p>
                    <div style={{position: "relative"}}>
                        <img alt="" className="fair" src="../../../img/juego-martillo.png" />
                        <img alt="" className={this.state.bellResizing} src="../../../img/campana.png" />
                        <img alt="" className={this.state.movement} src="../../../img/cuadrado.png" />
                    </div>
                </div>}
            </div>
        )
    }
}
