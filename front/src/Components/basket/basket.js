import React, { Component } from 'react'
import io from 'socket.io-client';
import "./basket.css"

const socket = io(`${process.env.REACT_APP_API_URL}`);

export default class Basket extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            speedX: 0, 
            speedY: 0, 
            speedZ: 0,
            score: [],
            movement: "ball ",
            canastaPoint: "canasta ", 
            startGame:false,
            distance: Math.floor((Math.random()*25)+25)
        };
        this.test();
    }
    calcMove(speedX,speedY,speedZ){
        socket.emit("basket", {speedX,speedY,speedZ,distance:this.state.distance})
    }
    showPC(data){
        this.setState({...this.state, score: data.move})
    }
    movement(data){
        let className = "ball "
        let points = Math.floor(data.score);
        if (points >= 100){
            className += "ballNice "
            this.canastaPoint()
        } 
        this.setState({ ...this.state, movement:className})
    }
    
    canastaPoint(){
        let className = "canasta "
        className -= "canasta "
        className += "canastaPoint "
        this.setState({ ...this.state, canastaPoint:className})
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
                    {/* <p>Score: {JSON.stringify(this.state.score)}</p> 
                    <img alt="" className="fair" src="../../../img/feriaDesktop.png">{this.state.score.map(elem => <div>{elem.id} - {elem.score}</div>)}</img>*/}
                    {this.state.speedX === 0?<div className="desktopBackground">{this.state.score.map(elem => <div>{elem.id} - {elem.score}</div>)}</div>:
                    <div>
                        <p>SpeedX: {this.state.speedX.toFixed(2)}</p>
                        <p>SpeedY: {this.state.speedY.toFixed(2)}</p>
                        <p>SpeedZ: {this.state.speedZ.toFixed(2)}</p>
                        <p>Classes: {this.state.movement}</p>
                        <div style={{position: "relative"}}>
                            <div className="objects">
                                <img alt="" className={this.state.canastaPoint} src="/img/basket/canasta.png" />
                                <img alt="" className={this.state.movement} src="/img/basket/ball.png" />
                            </div>
                        </div>
                        <div className="backgroundBasket"></div>
                        <div id="winner"></div>
                    </div>}
                </div>}
            </div>
        )
    }
}
