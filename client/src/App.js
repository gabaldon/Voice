import React, {Component} from 'react';
import Navigation from './components/NavBar'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import AuthServices from "./service/auth-services"
import PostServices from "./service/post-services"
// import ProtectedRoute from './components/auth/Protected-route'
import {Switch, Route} from 'react-router-dom'
//Cesium components
// import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
// import SkyBox from "cesium/Source/Scene/SkyBox"
// import SkyAtmosphere from "cesium/Source/Scene/SkyAtmosphere"
// import Scene from "cesium/Source/Scene/Scene"
// import Color from "cesium/Source/Core/Color"
import CesiumGlobe from "./components/cesium/CesiumGlobe"
import PostForm from './components/PostForm';

class App extends Component {


    constructor(props) {
        super(props)
        this.state = { loggedInUser: null }
        this.services = new AuthServices()
        
    }

    setUser = userObj => this.setState({ loggedInUser: userObj })
        
    fetchUser = () => {
        if (this.state.loggedInUser === null) {
            this.services.loggedin()
            .then(response => {
                
                this.setState({ loggedInUser: response })
            })
            .catch(x => this.setState({ loggedInUser: false }))
            
    }
    }
    

    render() {

        this.fetchUser()

        if (this.state.loggedInUser) {
            
        return (
            <main>
            <CesiumGlobe/>
            <Navigation userInSession={this.state.loggedInUser} setTheUser={this.setUser} />
            <Switch>
            <Route path="/post" render={() => <PostForm setTheUser={this.setUser} />} />
            </Switch> 
            </main>
        )}else{
            
            return(
            <main>
            <Navigation userInSession={this.state.loggedInUser}/>
            <CesiumGlobe/>
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