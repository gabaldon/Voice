import React, { Component } from 'react'
import AuthServices from '../../service/auth-services'
import { Link, Redirect } from 'react-router-dom'
// import Modal from 'react-bootstrap/Modal'


class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            
            username: '', 
            password: '',
            
        }
        this.services = new AuthServices()
        // MODAL
        // this.handleShow = this.handleShow.bind(this)
        // this.handleClose = this.handleClose.bind(this)
    }

    
    // MODAL
    // handleClose = () => this.setState({ show: false })
    // handleShow = () => this.setState({ show: true })

    handleChange = e => {
        console.log(e)
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    

    handleSubmit = e => {

        e.preventDefault()
        const { username, password } = this.state
        this.services.login(username, password)
            .then(response => {
                this.setState({ redirect: true }, () => {
                    this.props.setTheUser(response)
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="loginForm">
           {this.state.redirect ? <Redirect to='/'></Redirect> : null}
            <div className="loginForm SignupForm">
             <Link to="/signup" >Si no te has registrado aún ¡Registrarse!</Link>
            <form onSubmit={this.handleSubmit} className="loginForm">
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
            
            </div>    
        )
    }

}

export default Login
