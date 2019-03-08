import React, { Component } from 'react'
import io from 'socket.io-client';
import "./west.css"
import authService from "../../Service/authSevice"
import {Link} from "react-router-dom"

const socket = io(`${process.env.REACT_APP_API_URL}`);

export default class wildWest extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            speedX: 0,
            movement: "gun ",
            startGame:false,
            shooting:true
        };
        this.service = new authService();
        this.test();
        socket.on('wildWest', id => {
            console.log("winner: "+id)
            this.movement()
            this.setState({...this.state, winner: id })
        });
        socket.on('clickedW', (data) => {
            console.log(data)
            this.setState({...this.state, startGame: true })
        });
    }
    checkProfile(){
        // this.service.login(username, password)
        //     .then(response => {
    }
    movement(){
        this.setState({ ...this.state, movement:"gun shootAnimation"})
    }

    test(){
        if(window.DeviceMotionEvent){
            window.addEventListener("devicemotion", event => {
                
                let speedX = this.state.speedX;
                
                if(this.state.shooting){
                    if(speedX < event.acceleration.x) speedX = event.acceleration.x;
                    this.setState({...this.state, speedX})
                    if(speedX > 50){
                        socket.emit("wildWest")
                    } 
                } 
            }, false);
        }
        else{
            console.log("correcto")
        }   
    }
    
    handleClick(e){
        console.log("entra")
        socket.emit('clickedW');
    }
    
    render() {
        
        return (
            <div>
                {!this.state.startGame?<button onClick={(e) =>this.handleClick(e)}>start</button>:<div>
                    {/* <p>Score: {JSON.stringify(this.state.score)}</p>  */}
                    {this.state.speedX === 0?<div className="fondoDesktopWest"><div className="flexbox-container">{this.state.winner}</div><Link to="/home"><button>back</button></Link></div>:
                    <div>
                        <p>SpeedX: {this.state.speedX}</p>
                        <div style={{position: "relative"}}>
                            <div className="objects">
                                <Link to="/home"><button>back</button></Link>
                                <img alt="" className={this.state.className} src="/img/west/gun.png" />
                            </div>
                        </div>
                        <div className="backgroundWestMobile"></div>
                        <div id="winner"></div>
                    </div>}
                </div>}
            </div>
        )
    }
}