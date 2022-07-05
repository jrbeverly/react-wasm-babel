import React, { RefObject } from "react";

import { Fractal } from '@pkg/Fractal'

interface FractalProperties {
  magnitude: number;
  iterations: number;
  x: number;
  y: number;
}

interface CanvasProps {
  height: number;
  width: number;
  client: Fractal;
}

class Canvas extends React.Component<CanvasProps> {

  canvas: RefObject<HTMLCanvasElement> | null
  config: FractalProperties

  constructor(props : CanvasProps) {
    super(props);
    this.canvas = React.createRef();

    this.config = {
      x: 4.0,
      y: 1.50,
      iterations: 1,
      magnitude: 175,
    }
  }

  componentDidMount() {
    const { mandel_iteration } = this.props.client;

    if (this.canvas == null){
      return;
    }
    
    const context: CanvasRenderingContext2D | null = this.canvas.current ? this.canvas.current.getContext('2d') : null;
    if (context == null){
      return;
    }

    for (let x = 10; x < this.props.width; x++)  {
      for (let y = 10; y < this.props.height; y++)  {
        let m = mandel_iteration(
          x / this.config.magnitude - this.config.x, 
          y / this.config.magnitude - this.config.y, 
          this.config.magnitude
        );
        context.fillStyle = (m === 0) ? '#000' : 'hsl(0, 100%, ' + m + '%)';
        context.fillRect(x, y, 1, 1);
      }
    }
  }

  render() {
    return (
        <canvas ref={this.canvas} width={this.props.width} height={this.props.height}/>
    )
  }
}

export default Canvas;
