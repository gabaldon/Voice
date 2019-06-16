import React, { Component } from 'react'
import AuthServices from '../../service/auth-services'
import { Link, Redirect } from 'react-router-dom'

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = { username: '', password: '', redirect: false }
        this.services = new AuthServices()
        this.handleClose = this.handleClose.bind(this)
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleClose = () => this.setState({ show: false ,
    
        redirect: true
    })

    handleSubmit = e => {
        e.preventDefault()
        const { username, password } = this.state
        this.services.signup(username, password)
        .then(response => {
            this.setState({ redirect: true }, () => {
                this.props.setTheUser(response)
            })
        })
        .catch(error => console.log({error}))
    }
    
    render() {
        return (
            <div className="loginForm move-in-right col">
           {this.state.redirect ? <Redirect to='/'></Redirect> : null}
            <button className="btn-close" onClick={this.handleClose} >Close</button>
            <form className="signUpForm" onSubmit={this.handleSubmit} className="login">
                <div className="form-group">
                    <label htmlFor="username"></label>
                    <input onChange={this.handleChange} value={this.state.username} type="text" className="form-control" id="username" name="username" placeholder="Username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password"></label>
                    <input onChange={this.handleChange} value={this.state.password} type="password" className="form-control" id="password" name="password" placeholder="Password"/>
                </div>
                <button type="submit" className="form-group row btn-access"></button>
                <Link to="/login" className="form-group SignupLink row">Back to Sign Up</Link>
            </form>
            
            </div> 
                   
        )
    }

}

export default Signup
