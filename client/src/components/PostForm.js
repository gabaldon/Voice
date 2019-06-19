import React, { Component } from 'react'
import PostServices from '../service/post-services'
// import Modal from 'react-bootstrap/Modal'
import { Redirect } from 'react-router-dom'
// import RecorderManager from '../recorder'
import Example from './ReactMic'
// import ReactMic from './react-mic/React-micf'


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
        this.getMyLocation = this.getMyLocation.bind(this);
        
    }
    // componentDidMount() {
    //     this.getMyLocation()
    //   }
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

        // console.log("This is the Form data ",FormData)
        // console.log("This is the Blob ",url)
       
        let uploadData = new FormData();
        uploadData.append("blob", url.blob);

        // console.log("This is the Blob ",url)
        // console.log(uploadData)

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
    

    handleClose = () => this.setState({ show: false ,
    
        redirect: true
    })
    handleShow = () => this.setState({ show: true })

    // handlechange = (e, key) => {
    //     const { name, value } = e.target

    //     const _postform = {...this.state.postform};
    //     _postform[key][name] = value;
    //     this.setState({
    //         postform: _postform
    //     }, () => {console.log(this.state)})
    // }

    handlechange = e => {
        const { name, value } = e.target
        this.setState({
            postform: {
                ...this.state.postform,
                [name]: value
            }
        })
        // this.props.loadPoints(this.props.data)
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
        // this.setState({postform:{latitude: latitude, longitude: longitude}})
        // const recorder = RecorderManager.create()
        return(
            <div>
             {this.state.redirect ? <Redirect to='/'></Redirect> : null}
            <div className={`post-container col ${this.state.movein ? 'move-in-right' : '' }`}>
            <form className="col" onSubmit={this.handleSubmit}>
                <div className="post-form-it description">
                    <label className="description-title" htmlFor="description"></label>
                    <input onChange={(e) => this.handlechange(e)} value={this.state.postform.description} type="text" className="row" id="description" name="description" placeholder="Write a description" />
                </div>
               
                <button className="post-form-it geolocation-btn  row" type="button" onClick={this.getMyLocation} ></button>
                <Example className="post-form-it mic-container  row" handleFileUpload={url => this.handleFileUpload(url)}/>
                {this.state.postform.audio &&
                <div className="row">
                    <audio className="post-form-it audio-controls  row" autoplay muted loop controls src={this.state.postform.audio}/>
                    <button type="submit" className="btn-post post-form-it row" ></button>
                </div>
                }
            </form>
            <button className="btn-close" onClick={this.handleClose} >Close</button>
            </div>
            </div>
        )
    }


}

// { "type": "FeatureCollection",

//     "features": [{ 
        
//         "type": "Feature",
//         "geometry": {
//             "type": "Point", 
//             "coordinates": [
//                 {"long": Number, 
//                 "lat": Number}
//             ] },

//         "properties": {
//             "description": String,
//             "audio": String,
//             "color": String
//         }

//       }]
// }