import React, { Component } from 'react'
import {Link} from "react-router-dom"
import "./Home.css"


export default class Home extends Component {
    
    render() {
        return (
            <div className="backgroundHome dance" style={{viewBox: "0 0 100 100"}}>
                

                <Link to="/feria"><button>feria</button></Link>
                <Link to="/basket"><button>basket</button></Link>
                <Link to="/robo"><button>robo</button></Link>
                <Link to="/pesca"><button>pesca</button></Link>
                <Link to="/funam"><button>funam</button></Link>
            </div>
        )
    }
}
