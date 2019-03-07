import React, { Component } from 'react'
import {Link} from "react-router-dom"
import "./Home.css"


export default class Home extends Component {
    
    render() {
        return (
            <div className="backgroundHome dance" style={{viewBox: "0 0 100 100"}}>
                <Link to="/feria"><img className="buttons" src="/img/home/boton-feria.png" /></Link>
                <Link to="/basket"><img className="buttons" src="/img/home/boton-basketball.png" /></Link>
                <Link to="/west"><img className="buttons" src="/img/home/boton-cowboy.png" /></Link>
            </div>
            
        )
    }
}
