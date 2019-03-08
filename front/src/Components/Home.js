import React, { Component } from 'react'
import {Link} from "react-router-dom"
import "./Home.css"


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            speedX: 0,
        }
        };
    render() {
        return (
            <div>
                {this.state.speedX === 0?<div className="desktopHome"></div>:
                <div>
                <img className="" src="/img/home/games.png"></img>
                <Link to="/feria"><img className="buttons" src="/img/home/barbieHome.png" /></Link>
                <Link to="/basket"><img className="buttons" src="/img/home/curryHome.png" /></Link>
               
                <Link to="/west"><img className="buttons" src="/img/home/westDesktop2home.png" /></Link>
                </div>}
            </div>
        )
    }
}
