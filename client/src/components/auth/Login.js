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
            movein:false,
            error: false,
        }
        this.services = new AuthServices()
        this.handleClose = this.handleClose.bind(this)
        // MODAL
        // this.handleShow = this.handleShow.bind(this)
        // this.handleClose = this.handleClose.bind(this)
    }

    componentDidMount() {
        setInterval(() => this.setState({ movein: !this.state.loading }), 100);
      }
    // MODAL
    // handleClose = () => this.setState({ show: false })
    // handleShow = () => this.setState({ show: true })

    handleChange = e => {
        console.log(e)
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleClose = () => this.setState({ show: false ,
    
        redirect: true
    })

    handleSubmit = e => {

        e.preventDefault()
        const { username, password } = this.state
        this.services.login(username, password)
            .then(response => {
                this.setState({ redirect: true }, () => {
                    this.props.setTheUser(response)
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({error: error.response.data.message})
            })
    }
    validation = () =>{
        if(this.state.error){
            return <p className="error">{this.state.error}</p>
        }
        
    } 

    render() {
        return (
            <div className="loginContainer">
           {this.state.redirect ? <Redirect to='/'></Redirect> : null}
            <div className={`loginForm ${this.state.movein ? 'move-in-right' : '' } col`}>
           <button className="btn-close" onClick={this.handleClose} >Close</button>
            <form onSubmit={this.handleSubmit} className="login">
                <div className="form-group">
                    <label  htmlFor="username"></label>
                    <input onChange={this.handleChange} value={this.state.username} type="text" className="form-control" id="username" name="username" placeholder="Username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password"></label>
                    <input onChange={this.handleChange} value={this.state.password} type="password" className="form-control" id="password" name="password" placeholder="Password"/>
                </div>
                {this.validation()}
                <button type="submit" className="form-group row btn-access"></button>
                <Link to="/signup" className="form-group SignupLink row">If you don´t have an account Sign Up</Link>
            </form>
            </div>
            
            </div>    
        )
    }

}

export default Login
