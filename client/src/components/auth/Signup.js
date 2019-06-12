import React, { Component } from 'react'
import AuthServices from '../../service/auth-services'
import { Link, Redirect } from 'react-router-dom'

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = { username: '', password: '', redirect: false }
        this.services = new AuthServices()
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

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
            <div>
           {this.state.redirect ? <Redirect to='/'></Redirect> : null}
            <form className="signUpForm" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Usuario</label>
                    <input onChange={this.handleChange} value={this.state.username} type="text" className="form-control" id="username" name="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input onChange={this.handleChange} value={this.state.password} type="password" className="form-control" id="password" name="password" />
                </div>
                <button type="submit" className="btn btn-dark">¡Acceder!</button>
            </form>
            
            </div> 
                   
        )
    }

}

export default Signup
