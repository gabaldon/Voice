import React, {Component} from 'react';
//Cesium components
import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
import SkyBox from "cesium/Source/Scene/SkyBox"
// import SkyAtmosphere from "cesium/Source/Scene/SkyAtmosphere"
// import Scene from "cesium/Source/Scene/Scene"
import Color from "cesium/Source/Core/Color"
// import CesiumPoints from "./CesiumPoints"
import Cartesian3 from "cesium/Source/Core/Cartesian3"
// import GeoJsonDataSource from "cesium/Source/DataSources/GeoJsonDataSource"
// import EntityCollection from "cesium/Source/DataSources/EntityCollection"
// import Data from '../../example.json'
// import BillboardCollection from "cesium/Source/Scene/BillboardCollection"
import PostServices from '../../service/post-services'
import ScreenSpaceEventHandler from 'cesium/Source/Core/ScreenSpaceEventHandler'
import Cesium from 'cesium/Source/Cesium'

class CesiumGlobe extends Component {

    constructor (props){
        super(props)
        this.state = {
            viewerLoaded : false,
            query: '',
            data: [],
        }
       
    }

    loadPoints (data) {
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
                    color : Color.BLUE, // default: WHITE
                    pixelSize : 5, // default: 1
                    outlineColor : Color.BLUE, // default: BLACK
                    outlineWidth : 3 // default: 0
                },
                polyline :{
                    width : 2
                },
                description: post.description
        
            });

            // EVENT LISTENER
            this.viewer.scene.pickTranslucentDepth = true
            var handler = new ScreenSpaceEventHandler(this.viewer.scene.canvas);
    
            handler.setInputAction((click)=> {
            var pickedObject = this.viewer.scene.pick(click.position)
            if (Cesium.defined(pickedObject) && (pickedObject.id === entity)) {
            entity.point.pixelSize = 10;
            console.log(pickedObject)
            let audioUrl = post.audio
            console.log(post.audio)
            new Audio(audioUrl).play().then(res => console.log(res))  
                } else {
            
                entity.point.pixelSize = 5;
            }
            this.viewer.scene.requestRender()
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
            
            //END EVENT LISTENER movement.endPostion

            })//END OF FOR EACH
    }
    
    componentDidMount() {
        
        this.setState({
            viewerLoaded : true,
            
        });

        this.viewer = new Viewer(this.cesiumContainer, {
            animation : false,
            baseLayerPicker : false,
            fullscreenButton : false,
            useDepthPicking:true,
            geocoder : true,
            homeButton : false,
            infoBox : false,
            sceneModePicker : false,
            requestRenderMode: true,
            selectionIndicator : false,
            timeline : false,
            navigationHelpButton : false,
            scene3DOnly : true,
            skyBox: new SkyBox({
            show: false
            })
        })

        this.viewer.scene.backgroundColor = Color.SPRINGGREEN 
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

            this.loadPoints(data)
        
            //SEARCH BAR CONFIGURATION
            this.handleChange = (e)=>{

                let {name, value} = e.target
                this.setState({
                    [name]:value
                })
                const filtered = data.filter( elm => elm.description.toLowerCase().includes(e.target.value.toLowerCase()))
            
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

        return(
            
            <div className="cesiumGlobeWrapper" style={containerStyle}>
                
                <div
                    className="cesiumWidget"
                    ref={ element => this.cesiumContainer = element }
                    style={widgetStyle}
                    > 
                <div className="SearchBar">
                <input  type="text" name="query" value={this.state.query} onChange={(e)=>this.handleChange(e)}/>
                </div> 
                </div> 
                
            </div>
            
        )
    }

}
export default CesiumGlobe;