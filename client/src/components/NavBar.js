import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthServices from '../service/auth-services'
import PostForm from './PostForm'



class Navigation extends Component {

    constructor(props) {
        super(props)
        this.service = new AuthServices()
    }
    logout = () => {
        this.service.logout()
        .then(x => this.props.setTheUser(null))
        
    }


    render() {
        if (this.props.userInSession) {
            
        return (
        <div className="navBar">
        <div><Link to="/post" >Post</Link></div>
        <div onClick={this.logout} >Cerrar sesión</div>
        
        </div>

        )
        
    } else{
        return (
            <div className="navBar">
            <div><Link to="/login" >Log In</Link></div>
            </div>
        )
    }
}
}

export default Navigation