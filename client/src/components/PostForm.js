import React, { Component } from 'react'
import PostServices from '../service/post-services'
// import Modal from 'react-bootstrap/Modal'
import { Redirect } from 'react-router-dom'
// import RecorderManager from '../recorder'
import Example from './ReactMic'
// import ReactMic from './react-mic/React-micf'



export default class PostForm extends Component {

    constructor() {
        super()
        this.state = {
            postform: {   
            
              
                    type: "Point", 
                    longitude: 0,
                    latitude: 0,
                    description: '',
                    audio: '',
                    color: ''
                
    
            
                    },
            show: true
        }
        this.services = new PostServices()
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.getMyLocation = this.getMyLocation.bind(this);
        
    }
    // componentDidMount() {
    //     this.getMyLocation()
    //   }

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
                this.setState({ redirect: true }, () => {
                    this.setPost(response)
                })
            })
            .catch(error => console.log(error.response.data.message))
    }
     
    
    render(){
        // this.setState({postform:{latitude: latitude, longitude: longitude}})
        // const recorder = RecorderManager.create()
        return(
            <div className="modal-container">
             
             {this.state.redirect ? <Redirect to='/'></Redirect> : null}
            <form onSubmit={this.handleSubmit}>
                <div className="description">
                    <label htmlFor="description">Descripción</label>
                    <input onChange={(e) => this.handlechange(e)} value={this.state.postform.description} type="text" className="form-control" id="description" name="description" />
                </div>
                {/* <input type="text" value={this.state.postform.latitude} />
                <input type="text" value={this.state.postform.longitude} /> */}
                <button type="button" onClick={this.getMyLocation} >Get Geolocation</button>
                <div className="location">
                    {/* <label htmlFor="coodinates">Location </label> */}
                    {/* <input onChange={(e) => this.handlechange(e)} value={this.state.postform.coodinates} type="text" className="form-control" id="location" name="coordinates" /> */}
                </div>

                {/* <ReactMic/> */}
                <Example handleFileUpload={url => this.handleFileUpload(url)}/>



                {/* <div>{recorder}</div> */}
                {/* <div className="form-group">
                    <label htmlFor="audio">URL imagen</label>
                    <input onChange={(e) => this.handleFileUpload(e)} type="file" className="form-control" id="audio" name="audio" />
                </div> */}
            {this.state.postform.audio &&
            <div>
                <audio controls src={this.state.postform.audio}/>
                <button type="submit" className="send-btn" >Enviar</button>
            </div>
            }
            </form>
            <button className="close" onClick={this.handleClose} >Close</button>
            {/* this.viewer.entities.removeAll() */}
            {/* this.loadPoints(this.state.data) */}
            
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