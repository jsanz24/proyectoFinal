import React, { Component } from 'react'
import "./Feria.css"

// import ReactAccelerometer from 'react-accelerometer'

export default class Feria extends Component {
  /*

  var lastTimestamp;
  var speedX = 0, speedY = 0, speedZ = 0;
  window.addEventListener('devicemotion', function(event) {
    var currentTime = new Date().getTime();
    if (lastTimestamp === undefined) {
      lastTimestamp = new Date().getTime();
      return; //ignore first call, we need a reference time
    }
    //  m/s² / 1000 * (miliseconds - miliseconds)/1000 /3600 => km/h (if I didn't made a mistake)
    speedX += event.acceleration.x / 1000 * ((currentTime - lastTimestamp)/1000)/3600;
    //... same for Y and Z
    lastTimestamp = currentTime;
  }, false);
  
  */
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
      rotation: 0, 
      x2: 0, 
      y2: 0, 
      z2: 0, 
      lastTimestamp: undefined, 
      speedX: 0, 
      speedY: 0, 
      speedZ: 0
    }

    this.test();
  }

  movement(){
      let className = "cuadrado "
      let points = 120;
      if (points >= 100){
        className += "fairAnimation "
      } 
      return className
  }

  bellResizing(){
    let className = "bell "
    let points = 120;
    if (points >= 100){
      className += "bellAnimation "
    } 
    return className
}

  test() {
    if (window.DeviceOrientationEvent) {
		
      window.addEventListener("deviceorientation", (event) =>
      {
        
        var x = Math.round(event.gamma);
        var y = Math.round(event.beta);
        var rotation = Math.round(event.alpha);

        this.setState({x, y, rotation})
        
      }, true);

      
      
    } else {
    alert("Sorry, your browser doesn't support Device Orientation");
    }

    if(window.DeviceMotionEvent){
      window.addEventListener("devicemotion", event => {
        // PRUEBA 1 (aparentemente fail)
        console.log("Accelerometer: "
          + event.accelerationIncludingGravity.x + ", "
          + event.accelerationIncludingGravity.y + ", "
          + event.accelerationIncludingGravity.z
        );
        var x2 = event.accelerationIncludingGravity.x;
        var y2 = event.accelerationIncludingGravity.y;
        var z2 = event.accelerationIncludingGravity.z;

        this.setState({x2, y2, z2})
        
        // PRUEBA 2 (calculando velocidad)
        var currentTime = new Date().getTime();
        if (this.state.lastTimestamp === undefined) {
          this.setState({lastTimestamp: new Date().getTime()})
          return; //ignore first call, we need a reference time
        }
        //  m/s² / 1000 * (miliseconds - miliseconds)/1000 /3600 => km/h (if I didn't made a mistake)
        let speedX = this.state.speedX;
        let speedY = this.state.speedY;
        let speedZ = this.state.speedZ;

        if(speedX < event.acceleration.x) speedX = event.acceleration.x;
        if(speedY < event.acceleration.y) speedY = event.acceleration.y;
        if(speedZ < event.acceleration.z) speedZ = event.acceleration.z;

        //... same for Y and Z
        let lastTimestamp = currentTime;

        this.setState({lastTimestamp, speedX, speedY, speedZ})
        
      }, false);
    }else{
      console.log("DeviceMotionEvent is not supported");
    }
  }


  render() {
    console.log(this.state);

    return (
      <div>
        {/* <p>X: {this.state.x}</p>
        <p>Y: {this.state.y}</p>
        <p>Rotation: {this.state.rotation}</p>

        <p>X2: {this.state.x2.toFixed(2)}</p>
        <p>Y2: {this.state.y2.toFixed(2)}</p>
        <p>Z2: {this.state.z2.toFixed(2)}</p>

        <p>SpeedX: {this.state.speedX.toFixed(2)}</p>
        <p>SpeedY: {this.state.speedY.toFixed(2)}</p>
        <p>SpeedZ: {this.state.speedZ.toFixed(2)}</p> */}
        
        <div style={{position: "relative"}}>
        <img  className="fair" src="../../../img/juego-martillo.png" />
        <img  className={this.bellResizing()} src="../../../img/campana.png" />
        <img  className={this.movement()} src="../../../img/cuadrado.png" />
        </div>
      </div>
    )
  }
}
