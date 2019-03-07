import React, { Component } from 'react'
import io from 'socket.io-client';
import "./basket.css"
import {Link} from "react-router-dom"

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
            distance: Math.floor((Math.random()*25)+25),
            round:1,
            shooting:true
        };
        this.test();
        socket.on('basket', data => this.movement(data));
        socket.on("basketAll", data =>{
            console.log(data)
            this.setState({...this.state, 
                score: data.shot, 
                speedX: this.state.speedX != 0?1:0, 
                speedY: 0, 
                speedZ: 0, 
                movement:"ball ", 
                canastaPoint:"canasta ", 
                round: this.state.round+1,
                distance: Math.floor((Math.random()*25)+25),
                shooting:true,
                score:data.shot
            })
        })
        socket.on('clickedB', data => {
            console.log(data);
            this.setState({...this.state, startGame: true })
        });
    }
    calcMove(speedX,speedY,speedZ){
        socket.emit("basket", {speedX,speedY,speedZ, distance: this.state.distance, round:this.state.round})
    }
    showPC(data){
        console.log("SHOWPC")
        socket.emit("basketAll")
    }
    movement(data){
        console.log(data)
        
        let className = "ball "
        if(data.fail){
            Math.floor(Math.random()*2)==0?className += "ballAwryLeft ":className += "ballAwryCenter "
        }
        else{
            className += "ballNice "
            this.canastaPoint()
        }
        if(data.finish){
            this.showPC(data)
        }
        this.setState({ ...this.state, movement:className})
    }
    
    canastaPoint(){
        let className = "canastaPoint "
        this.setState({ ...this.state, canastaPoint:className})
    }
    test(){
        if(window.DeviceMotionEvent){
            window.addEventListener("devicemotion", event => {
                
                let speedX = this.state.speedX;
                let speedY = this.state.speedY;
                let speedZ = this.state.speedZ;
                
                if(this.state.shooting){
                    if(speedX < event.acceleration.x) speedX = event.acceleration.x;
                    if(speedY < event.acceleration.y) speedY = event.acceleration.y;
                    if(speedZ < event.acceleration.z) speedZ = event.acceleration.z;
                    this.setState({...this.state, speedX, speedY, speedZ})
                    if(speedX > 35 || speedY > 35 || speedZ > 35 ){
                        this.setState({ ...this.state, shooting: false})
                        this.calcMove(speedX,speedY,speedZ)
                    } 
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
        
        return (
            <div>
                {!this.state.startGame?<button onClick={(e) =>this.handleClick(e)}>start</button>:<div>
                    {/* <p>Score: {JSON.stringify(this.state.score)}</p>  */}
                    {this.state.speedX === 0?<div className="desktopBackgroundBasket"><div className="flexbox-container">{this.state.score.map((elem,idx) => <div >{idx+1} - {elem.id} - {elem.score}</div>)}</div><Link to="/home"><button>back</button></Link></div>:
                    <div>
                        <p>SpeedX: {this.state.distance.toFixed(2)}</p>
                        <div style={{position: "relative"}}>
                            <div className="objects">
                                <img alt="" className={this.state.canastaPoint} src="/img/basket/canasta.png" />
                                <img alt="" className={this.state.movement} src="/img/basket/ball.png" />
                            </div>
                        </div>
                        <div className="backgroundBasket"></div>
                        <div id="winner"></div>
                        <Link to="/home"><button>back</button></Link>
                    </div>}
                </div>}
            </div>
        )
    }
}
