import React, { Component } from 'react'
import {Link} from "react-router-dom"
import "./Home.css"


export default class Home extends Component {
    
    render() {
        return (
            <div className="backgroundHome">
                <img className="header" src="/img/home/gamesBig.png"></img>
                <Link to="/feria"><img className="buttons" src="/img/home/barbieHome.png" /></Link>
                <Link to="/basket"><img className="buttons" src="/img/home/curryHome.png" /></Link>
                <Link to="/west"><img className="buttons" src="/img/home/westDesktop2home.png" /></Link>
            </div>
            
        )
    }
}
