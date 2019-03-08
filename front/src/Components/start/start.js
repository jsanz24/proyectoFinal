import React, { Component } from "react";
import "./start.scss"
import io from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_API_URL}`);

export default class Start extends Component {
  constructor(props) {
    super(props);
    socket.on('clickedW', (data) => {
        console.log(data)
        this.setState({...this.state, startGame: true })
    }
    );
}
  handleClick(e){
    console.log("entra")
    socket.emit('clickedW');
}

  render() {
    return (
      <div>
        <div className="presentation-content">
          <h1 className="presentation-title">Press any button to start</h1>
          <div className="top-button-group">
            <button className="retro-button" onClick={(e) =>this.handleClick(e)}>Start</button>
            <button className="retro-button" onClick={(e) =>this.handleClick(e)}>Select</button>
          </div>
          <div className="bottom-button-group">
            <button className="retro-button red-button" onClick={(e) =>this.handleClick(e)}>A</button>
            <button className="retro-button yellow-button" onClick={(e) =>this.handleClick(e)}>B</button>
            <button className="retro-button blue-button" onClick={(e) =>this.handleClick(e)}>X</button>
            <button className="retro-button green-button" onClick={(e) =>this.handleClick(e)}>Y</button>
          </div>
        </div>
      </div>
    );
  }
}
