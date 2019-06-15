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
            <div className="loginContainer">
           {this.state.redirect ? <Redirect to='/'></Redirect> : null}
            <div className="loginForm col">
            <form onSubmit={this.handleSubmit} className="login">
                <div className="form-group">
                    <label className="row" htmlFor="username"></label>
                    <input onChange={this.handleChange} value={this.state.username} type="text" className="form-control" id="username" name="username" placeholder="Username"/>
                </div>
                <div className="form-group">
                    <label className=" row" htmlFor="password"></label>
                    <input onChange={this.handleChange} value={this.state.password} type="password" className="form-control" id="password" name="password" placeholder="Password"/>
                </div>

                <button type="submit" className="form-group row btn-access"></button>
                <Link to="/signup" className="form-group SignupLink row">Sign Up</Link>
            </form>
            </div>
            
            </div>    
        )
    }

}

export default Login
