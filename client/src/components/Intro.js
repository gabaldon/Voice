import React, {Component} from 'react'
import {TransitionMotion, spring} from 'react-motion'

const leavingSpringConfig = {stiffness: 60, damping: 15};

export default class Intro extends Component {



    constructor(props) {
        super(props);
        this.state = {mouse: [], now: 't' + 0};
      };
    
      handleMouseMove = ({pageX, pageY}) => {
        // Make sure the state is queued and not batched.
        this.setState(() => {
          return {
            mouse: [pageX - 25, pageY - 25],
            now: 't' + Date.now(),
          };
        });
      };
    
      handleTouchMove = (e) => {
        e.preventDefault();
        this.handleMouseMove(e.touches[0]);
      };
    
      willLeave = (styleCell) => {
        return {
          ...styleCell.style,
          opacity: spring(0, leavingSpringConfig),
          scale: spring(2, leavingSpringConfig),
        };
      };
    
   
        
    render(){
        const {mouse: [mouseX, mouseY], now} = this.state;
        const styles = mouseX == null ? [] : [{
          key: now,
          style: {
            opacity: spring(1),
            scale: spring(0),
            x: spring(mouseX),
            y: spring(mouseY),
          }
        }];
      
        return(
            <header className={`intro-bg col`} >
        <TransitionMotion willLeave={this.willLeave} styles={styles}>
            {circles =>
            <div
                onMouseMove={this.handleMouseMove}
                onTouchMove={this.handleTouchMove}
                className="demo7">
                {circles.map(({key, style: {opacity, scale, x, y}}) =>
                <div
                    key={key}
                    className="demo7-ball"
                    style={{
                    opacity: opacity,
                    scale: scale,
                    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                    WebkitTransform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                    }} />
                )}
            </div>
            }
        </TransitionMotion>
            <h1 id="intro-h1">Voice</h1>
            <p>Record and share your voice to the world</p>
            <div>
            <svg id="wave" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 38.05">
            <title>Audio Wave</title>
            <path id="Line_1" data-name="Line 1" d="M0.91,15L0.78,15A1,1,0,0,0,0,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H0.91Z"/>
            <path id="Line_2" data-name="Line 2" d="M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0s0,0,0,0V10A1,1,0,0,0,7,9H6.91Z"/>
            <path id="Line_3" data-name="Line 3" d="M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H12.91Z"/>
            <path id="Line_4" data-name="Line 4" d="M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H18.91Z"/>
            <path id="Line_5" data-name="Line 5" d="M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,0,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H24.91Z"/>
            <path id="Line_6" data-name="Line 6" d="M30.91,10l-0.12,0A1,1,0,0,0,30,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H30.91Z"/>
            <path id="Line_7" data-name="Line 7" d="M36.91,0L36.78,0A1,1,0,0,0,36,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H36.91Z"/>
            <path id="Line_8" data-name="Line 8" d="M42.91,9L42.78,9A1,1,0,0,0,42,10V28a1,1,0,1,0,2,0s0,0,0,0V10a1,1,0,0,0-1-1H42.91Z"/>
            <path id="Line_9" data-name="Line 9" d="M48.91,15l-0.12,0A1,1,0,0,0,48,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H48.91Z"/>
            </svg>
            </div>
           
            
            
        </header>
        )
    }
}




