import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthServices from '../service/auth-services'

class Navigation extends Component {

    constructor(props) {
        super(props)
        this.service = new AuthServices()

    }
    logout = () => {
        this.service.logout()
        .then(x => {
            this.props.setTheUser(null)
        })
    }
    
    render() {
        if (this.props.userInSession) {
            
        return (
            <div className="navBar">
                <div className="logo">
                    <svg id="logo" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.05 11.32"><defs><style>.cls-1{'fill:none;stroke:#12f70a;stroke-width:0.4px;'}</style></defs><title>logo</title><path className="cls-1" d="M7.55,3C8,1.93,8.5.64,7.53.25v0H9.87L5.72,11c-1.1-.72-1.46-.85-1.92-2.09L1.43,2.5A4.71,4.71,0,0,0,.2.25v0H2.5l0,.19a6.4,6.4,0,0,0,.42,1.46l2.5,6.84Z"/><path className="cls-1" d="M9.39,7a3.92,3.92,0,0,1,4.17-3.88,3.77,3.77,0,0,1,3.92,3.74,4,4,0,0,1-4.11,3.9A3.8,3.8,0,0,1,9.39,7Zm6.5.19c0-1.53-.82-3-2.5-3A2.41,2.41,0,0,0,11,6.71c0,1.45.87,3,2.47,3A2.41,2.41,0,0,0,15.89,7.18Z"/><path className="cls-1" d="M19.32,3.31a1.51,1.51,0,0,0,1-.25h0V8.8c0,.72-.09,1.3.6,1.7v0H18.36v0c.69-.39.6-1,.6-1.7V5c0-.72.09-1.29-.6-1.68v0Zm.3-.94a1,1,0,0,1-1-1,1,1,0,0,1,1-.93,1,1,0,0,1,.94,1A1,1,0,0,1,19.62,2.37Z"/><path className="cls-1" d="M28.14,4.92h0a2.58,2.58,0,0,0-1.92-.77,2.5,2.5,0,0,0-2.63,2.56,3.09,3.09,0,0,0,3.27,3,4.07,4.07,0,0,0,2.3-.77h0l-.82,1.49a5.85,5.85,0,0,1-2.08.31C23.85,10.75,22,9.17,22,7.12c0-2.7,2.11-4,4.48-4a7.68,7.68,0,0,1,1.7.19Z"/><path className="cls-1" d="M30.95,6.68a2.94,2.94,0,0,0,3.15,3,4.15,4.15,0,0,0,2.58-.83h0l-.79,1.48a5.66,5.66,0,0,1-2.17.39c-2.67,0-4.51-1.68-4.51-3.87a3.69,3.69,0,0,1,3.93-3.77,3.38,3.38,0,0,1,3.54,3.57Zm4.12-.91a1.81,1.81,0,0,0-2-1.62,2,2,0,0,0-2,1.62Z"/></svg>
                </div>
                <div className="waves">
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
                <div className="logout-btn link" onClick={this.logout} >log out</div>
                <div className="link"><Link to="/post" >Post</Link></div>
            </div>

        )
        
    } else {
        return (
            <div className="navBar">
                <div className="logo">
                    <svg id="logo" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.05 11.32"><defs><style>.cls-1{'fill:none;stroke:#12f70a;stroke-width:0.4px;'}</style></defs><title>logo</title><path className="cls-1" d="M7.55,3C8,1.93,8.5.64,7.53.25v0H9.87L5.72,11c-1.1-.72-1.46-.85-1.92-2.09L1.43,2.5A4.71,4.71,0,0,0,.2.25v0H2.5l0,.19a6.4,6.4,0,0,0,.42,1.46l2.5,6.84Z"/><path className="cls-1" d="M9.39,7a3.92,3.92,0,0,1,4.17-3.88,3.77,3.77,0,0,1,3.92,3.74,4,4,0,0,1-4.11,3.9A3.8,3.8,0,0,1,9.39,7Zm6.5.19c0-1.53-.82-3-2.5-3A2.41,2.41,0,0,0,11,6.71c0,1.45.87,3,2.47,3A2.41,2.41,0,0,0,15.89,7.18Z"/><path className="cls-1" d="M19.32,3.31a1.51,1.51,0,0,0,1-.25h0V8.8c0,.72-.09,1.3.6,1.7v0H18.36v0c.69-.39.6-1,.6-1.7V5c0-.72.09-1.29-.6-1.68v0Zm.3-.94a1,1,0,0,1-1-1,1,1,0,0,1,1-.93,1,1,0,0,1,.94,1A1,1,0,0,1,19.62,2.37Z"/><path className="cls-1" d="M28.14,4.92h0a2.58,2.58,0,0,0-1.92-.77,2.5,2.5,0,0,0-2.63,2.56,3.09,3.09,0,0,0,3.27,3,4.07,4.07,0,0,0,2.3-.77h0l-.82,1.49a5.85,5.85,0,0,1-2.08.31C23.85,10.75,22,9.17,22,7.12c0-2.7,2.11-4,4.48-4a7.68,7.68,0,0,1,1.7.19Z"/><path className="cls-1" d="M30.95,6.68a2.94,2.94,0,0,0,3.15,3,4.15,4.15,0,0,0,2.58-.83h0l-.79,1.48a5.66,5.66,0,0,1-2.17.39c-2.67,0-4.51-1.68-4.51-3.87a3.69,3.69,0,0,1,3.93-3.77,3.38,3.38,0,0,1,3.54,3.57Zm4.12-.91a1.81,1.81,0,0,0-2-1.62,2,2,0,0,0-2,1.62Z"/></svg>
                </div>
                <div className="waves">
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
                <div className="login link"><Link to="/login">Log In</Link></div>
            </div>
        )
    }
}
}

export default Navigation