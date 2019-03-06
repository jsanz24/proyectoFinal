import React, { Component } from 'react'
import io from 'socket.io-client';
import "./Feria.css"

const socket = io(`${process.env.REACT_APP_API_URL}`);


function calculate(cb) {
    socket.emit('clickedF');
    socket.on('clickedF', data => cb(null,data));
}

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
        socket.on('feriaAll', data => this.showPC(data));
        socket.on('feria', data => this.movement(data));
    }
    calcMove(speedX,speedY,speedZ){
        socket.emit("feria", {speedX,speedY,speedZ})
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
        else if (points >= 80) className += "power80Hit "
        else if (points >= 60) className += "power60Hit "
        else if (points >= 40) className += "power40Hit "
        
        this.setState({ ...this.state, movement:className})
        if(data.finish) this.callRanking();
    }
    
    bellResizing(){
        let className = "bell "
        className += "bellAnimation "
        this.setState({ ...this.state, bellResizing:className})
    }
    
    callRanking(){
        socket.emit("feriaAll")
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
                } 
                if(speedY < event.acceleration.y && event.acceleration.y){
                    speedY = event.acceleration.y;
                    this.setState({...this.state, speedX, speedY, speedZ})
                } 
                if(speedZ < event.acceleration.z && event.acceleration.z){
                    speedZ = event.acceleration.z;
                    this.setState({...this.state, speedX, speedY, speedZ})
                } 
                if(speedX > 20 || speedY > 20 || speedZ > 20) this.calcMove(speedX,speedY,speedZ)
                
            }, false);
        }
        else{
            console.log("correcto")
        }   
    }
    
    handleClick(e){
        calculate((err, data) => {
            console.log(data)
            if(data) this.setState({...this.state, startGame: true });
        });
    }
    
    render() {
        return (
            <div>
                {!this.state.startGame?<button onClick={(e) =>this.handleClick(e)}>start</button>:<div>
                    {/* <p>Score: {JSON.stringify(this.state.score)}</p> */}
                    {this.state.speedX === 0?<div className="desktopBackgroundFeria"><div className="flexbox-container">{this.state.score.map((elem,idx) => <div>{idx+1} - {elem.id} - {elem.score}</div>)}</div></div>:
                    <div>
                        <div style={{position: "relative"}}>
                            <div className="objects">
                                <img alt="" className="fair" src="/img/juego-martillo.png" />
                                <img alt="" className={this.state.bellResizing} src="/img/campana.png" />
                                <img alt="" className={this.state.movement} src="/img/cuadrado.png" />
                            </div>
                            <div className="background"></div>
                        </div>
                        <div id="winner"></div>
                    </div>}                    
                </div>}
            </div>
        )
    }
}
