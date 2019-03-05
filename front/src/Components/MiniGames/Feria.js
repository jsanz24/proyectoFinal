import React, { Component } from 'react'
import io from 'socket.io-client';
import "./Feria.css"

const socket = io(`${process.env.REACT_APP_API_URL}`);


 

export default class Feria extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            speedX: 0, 
            speedY: 0, 
            speedZ: 0,
            score: [],
            movement: "cuadrado ",
            bellResizing: "bell ",
            startGame:false
        };
        this.test();
    }
    calcMove(speedX,speedY,speedZ){
        socket.emit("basket", {speedX,speedY,speedZ})
    }
    showPC(data){
        this.setState({...this.state, score: data.move})
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
        socket.emit('clickedB');
    }
    
    render() {
        socket.on('basket', data => {
            if(data.finish){
                this.showPC(data)
            }
            else this.movement(data)
        });
        socket.on('clickedB', data => {
            console.log(data)
            if(data) this.setState({...this.state, startGame: true });
        });
        return (
            <div>
                {!this.state.startGame?<button onClick={(e) =>this.handleClick(e)}>start</button>:<div>
                    {/* <p>Score: {JSON.stringify(this.state.score)}</p> */}
                    {this.state.speedX === 0?<div className="desktopBackground">{<p className="pRanking">"Jesus Sanchez Sanz - 200 puntos"</p>/*this.state.score.map(elem => <div>{elem.id} - {elem.score}</div>)*/}</div>:
                    <div>
                        <p>SpeedX: {this.state.speedX.toFixed(2)}</p>
                        <p>SpeedY: {this.state.speedY.toFixed(2)}</p>
                        <p>SpeedZ: {this.state.speedZ.toFixed(2)}</p>
                        <p>Classes: {this.state.movement}</p>
                        <div style={{position: "relative"}}>
                            <div className="objects">
                                <img alt="" className="fair" src="/img/juego-martillo.png" />
                                <img alt="" className={this.state.bellResizing} src="/img/campana.png" />
                                <img alt="" className={this.state.movement} src="/img/cuadrado.png" />
                            </div>
                            <div className="background">
                            </div>
                        </div>
                    </div>}
                    <div id="winner">
                    </div>
                </div>}
            </div>
        )
    }
}
