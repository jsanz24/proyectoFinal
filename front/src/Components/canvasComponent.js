import React from 'react'

function rect(props) {
  const {ctx, x, y, width, height} = props;
  ctx.fillRect(x, y, width, height);
}
export default class Canvas extends React.Component {
  componentDidMount() {
      this.updateCanvas();
  }
  
  updateCanvas() {
      const ctx = this.refs.canvas.getContext('2d');
      ctx.clearRect(0,0, 300, 300);
      
      rect({ctx, x: 110, y: 110, width: 50, height: 50});
  }
  render() {
      return (
          <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight}/>
      );
  }
}
