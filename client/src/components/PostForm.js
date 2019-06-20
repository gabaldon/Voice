import React, { Component } from 'react'
import PostServices from '../service/post-services'
import { Redirect } from 'react-router-dom'
import Example from './ReactMic'

export default class PostForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            postform: {   
                type: "Point", 
                longitude: 0,
                latitude: 0,
                description: '',
                audio: '',
                color: ''
            },
            show: true,
            movein:false,
            error: false, 
        }
        this.services = new PostServices()
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.getMyLocation = this.getMyLocation.bind(this)
    }
  
    componentDidMount() {
        setInterval(() => this.setState({ movein: !this.state.loading }), 100);
    }

    getMyLocation() {
        const location = window.navigator && window.navigator.geolocation
        
        if (location) {
          location.getCurrentPosition((position) => {
            this.setState({
                postform: 
                {...this.state.postform,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }               
            })
          }, (error) => {
              console.log(error)
          })
        }
    }

    handleFileUpload = (url) => {

        console.log("This is the Blob ",url)
       
        let uploadData = new FormData();
        uploadData.append("blob", url);

        this.services.handleUpload(uploadData)
            .then(response => {
                console.log(response.secure_url)
                this.setState({
                    postform: {
                        ...this.state.postform, audio: response.secure_url
                    }
                })
                console.log(this.state.postform)
            })
            .catch(err => console.log(err))
    }
    
    handleClose = () => this.setState({ 
        show: false ,
        redirect: true
    })

    handleShow = () => this.setState({ show: true })

    handlechange = e => {
        const { name, value } = e.target
        this.setState({
            postform: {
                ...this.state.postform,
                [name]: value
            }
        })
    }

    setPost = postObj => this.setState({ postform: postObj })

    handleSubmit = e => {
        e.preventDefault()
        this.services.postPost(this.state.postform)
        .then(response => {
            this.props.loadPointsFromSon()
            this.setState({ redirect: true }, () => {
                this.setPost(response)
                console.log("Post Submited!")
            })
        })
        .catch(error => console.log(error))
    }
     
    render(){
        
        return(
            <div>
             {this.state.redirect ? <Redirect to='/'></Redirect> : null}
            <div className={`post-container col ${this.state.movein ? 'move-in-right' : '' }`}>
            <form className="col" onSubmit={this.handleSubmit}>
                <div className="post-form-it description">
                    <label className="description-title" htmlFor="description"></label>
                    <input onChange={(e) => this.handlechange(e)} value={this.state.postform.description} type="text" className="row" id="description" name="description" placeholder="Write a description" />
                </div>
                <button  className="post-form-it geolocation-btn  row" type="button" onClick={this.getMyLocation} title="Get my location"></button>
                <Example className="post-form-it mic-container  row" handleFileUpload={url => this.handleFileUpload(url)}/>
                {this.state.postform.audio &&
                <div className="row">
                    <button title="Submit" type="submit" className="btn-post post-form-it row" ></button>
                </div>
                }
            </form>
            <button className="btn-close" onClick={this.handleClose} >Close</button>
            </div>
            </div>
        )
    }


}