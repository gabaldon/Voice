import React, {Component} from 'react';
import Navigation from './components/NavBar'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import AuthServices from "./service/auth-services"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import Intro from './components/Intro'

// import PostServices from "./service/post-services"
// import ProtectedRoute from './components/auth/Protected-route'
import {Switch, Route} from 'react-router-dom'
//Cesium components
// import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
// import SkyBox from "cesium/Source/Scene/SkyBox"
// import SkyAtmosphere from "cesium/Source/Scene/SkyAtmosphere"
// import Scene from "cesium/Source/Scene/Scene"
// import Color from "cesium/Source/Core/Color"

// import CesiumGlobe from "./components/cesium/CesiumGlobe"

import PostForm from './components/PostForm';

import Cartesian3 from "cesium/Source/Core/Cartesian3"
import PostServices from './service/post-services'
import ScreenSpaceEventHandler from 'cesium/Source/Core/ScreenSpaceEventHandler'
import Cesium from 'cesium/Source/Cesium'
import Color from "cesium/Source/Core/Color"
import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
import SkyBox from "cesium/Source/Scene/SkyBox"


Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmODFhMmExZS1jZDAwLTRlNjctYmY1MS04OWIzNzZmOTA4ZmIiLCJpZCI6MTE4OTgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTk5MTgwODJ9.jtqbFIAPLfshQhRKW5VKU5qOSs682b446jPKo5ca2MA"


class App extends Component {
    
    
    constructor(props) {
        super(props)
        
        this.state = { 
            appear: true,
            loggedInUser: null,
            viewerLoaded : false,
            query: '',
            data: [],
        }
        this.servicesAuth = new AuthServices()
        

    }


    
    setUser = userObj => this.setState({ loggedInUser: userObj })

    
    
    fetchUser = () => {
        if (this.state.loggedInUser === null) {
            this.servicesAuth.loggedin()
            .then(response => {
                
                this.setState({ loggedInUser: response })
            })
            .catch(x => this.setState({ loggedInUser: false }))
            
        }
    }

    loadPointsFromSon = () => {


        this.services.getAllPosts()
        .then(data =>{
    
            this.setState({
                data: data,
            })
            console.log(this.state.data[this.state.data.length - 1])
            this.viewer.entities.removeAll()
            this.loadPoints(this.state.data)
    })
    .catch(err => console.log(err))

    }  
    
    loadPoints = (data) => {
        data.forEach(post =>{
            var long = post.longitude
            var lat = post.latitude
            let entity = this.viewer.entities.add({
                position : Cartesian3.fromDegrees(
                    long,
                    lat
                    ),
                    point : {
                        show : true, // default
                        color : Color.SPRINGGREEN, // default: WHITE
                        pixelSize : 5, // default: 1
                        outlineColor : Color.SPRINGGREEN , // default: BLACK
                        outlineWidth : 3 // default: 0
                    },
                    polyline :{
                        positions : Cesium.Cartesian3.fromDegreesArray([
                            long, lat,
                            long, lat
                        ]),
                        width : 2
                    },
                    description: `<h3 style='max-height: 648px; height: 60px;color: grey; text-align: center'>${post.description}</h3>`
                    
                });
                
                // EVENT LISTENER
                this.viewer.scene.pickTranslucentDepth = true
                var handler = new ScreenSpaceEventHandler(this.viewer.scene.canvas);
                
                handler.setInputAction((click)=> {
                    var pickedObject = this.viewer.scene.pick(click.position)
                    if (Cesium.defined(pickedObject) && (pickedObject.id === entity)) {
                        entity.point.pixelSize = 10;
                        console.log(pickedObject)

                        console.log(post.audio)
                        console.log(post.description)
                        
                        let audio = new Audio(post.audio)
                        let playPromise = audio.play()
                        .then(res => console.log(res))  
                        if(playPromise !== null) {
                            playPromise.catch(err => {
                                console.log(err)
                                audio.play()
                            })
    
                        }

                    } else {
                        
                        entity.point.pixelSize = 5;
                    }
                    this.viewer.scene.requestRender()
                }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
                
                //END EVENT LISTENER movement.endPostion
                
            })//END OF FOR EACH
        }
        
        componentDidMount() {

            
            if(this.state.appear) setTimeout(() => this.setState({ appear: false }), 6000)

                
            
            
            this.setState({
                viewerLoaded : true,
                
            });
            
            this.viewer = new Viewer(this.cesiumContainer, {
                animation : false,
                baseLayerPicker : false,
                fullscreenButton : false,
                useDepthPicking:true,
                geocoder : false,
                homeButton : false,
                infoBox : true,
                sceneModePicker : false,
                requestRenderMode: true,
                selectionIndicator : false,
                timeline : false,
                navigationHelpButton : false,
                scene3DOnly : true,
                skyBox: new SkyBox({
                    show: false
                }),
                // contextOptions : {
                    //     webgl: {
                        //         alpha: true
                        //     }
                        // }
                        
                    })
                    // this.viewer.scene.skyBox.destroy();
                    // this.viewer.scene.skyAtmosphere.destroy();
                    // new Cesium.Color(255,182,193,1)
                    this.viewer.scene.highDynamicRange = false
        this.viewer.scene.backgroundColor = Cesium.Color.BLANCHEDALMOND
        this.viewer.scene.skyAtmosphere.show = false
        this.viewer.scene.globe.showGroundAtmosphere = true
        this.viewer.scene.moon.show = false
        this.viewer.scene.sun.show = false
        this.services = new PostServices()
        

        

        this.services.getAllPosts()
        .then(data =>{

            this.setState({
                data: data,
            })
            this.loadPoints(this.state.data)
        
            //SEARCH BAR CONFIGURATION
            this.handleChange = (e)=>{

                let {name, value} = e.target
                this.setState({
                    [name]:value
                })
                const filtered = this.state.data.filter( elm => elm.description.toLowerCase().includes(e.target.value.toLowerCase()))
            
                this.viewer.entities.removeAll()

                console.log(e.target.value)
                console.log("Data filtered: ", filtered)

                if (e.target.value.length > 0) {
                    this.loadPoints(filtered)
                } else {
                    this.loadPoints(this.state.data)
                }
               

            this.viewer.scene.requestRender()
            }//END SEARCH BAR
        }) 
        .catch(err => console.log(err))
        //END OF PROMISE
    }//END OF COMPONENT DID MOUNT
    

    render() {

        const containerStyle = {
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'fixed',
            display : "flex",
            alignItems : "stretch",
            };
    
        const widgetStyle = {
            flexGrow : 2,
            
        }


        this.fetchUser()

        if (this.state.loggedInUser) {
            
        return (
            <main>
                {!this.state.appear}
              
            
            <div className="cesiumGlobeWrapper" style={containerStyle}>
                
                <div
                    className="cesiumWidget"
                    ref={ element => this.cesiumContainer = element }
                    style={widgetStyle}
                    > 
                </div> 
                <form className="SearchBar">
                <input  className="SearchBarInput" type="text" name="query" value={this.state.query} onChange={(e)=>this.handleChange(e)} placeholder="Search.." >
                
                </input>
                </form> 
                
            </div>
            
            <Navigation userInSession={this.state.loggedInUser} setTheUser={this.setUser} />
            <Switch>
            <Route path="/post" render={() => <PostForm loadPointsFromSon={this.loadPointsFromSon} setTheUser={this.setUser} />} />
            </Switch> 
            </main>
        )}else{
            
            return(

            <main>
            {this.state.appear &&
            <Intro/> }
            <div className="cesiumGlobeWrapper" style={containerStyle}>
                
                <div
                    className="cesiumWidget"
                    ref={ element => this.cesiumContainer = element }
                    style={widgetStyle}
                    > 
                 <form className="SearchBar">
                <input  className="SearchBarInput" type="text" name="query" value={this.state.query} onChange={(e)=>this.handleChange(e)} placeholder="Search..." >
                
                </input>
                </form> 
                </div> 
                
            </div>
        

            
            <Navigation userInSession={this.state.loggedInUser}/>
            <div className="footer"></div>
           
            <Switch>
            <Route path="/signup" render={() => <Signup setTheUser={this.setUser} />} />
            <Route path="/login" render={() => <Login setTheUser={this.setUser} />} />
            </Switch>
            </main>
            )
        }

    }
}

export default App;