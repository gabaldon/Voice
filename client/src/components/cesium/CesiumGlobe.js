import React, {Component} from 'react';
//Cesium components
import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
import SkyBox from "cesium/Source/Scene/SkyBox"
// import SkyAtmosphere from "cesium/Source/Scene/SkyAtmosphere"
// import Scene from "cesium/Source/Scene/Scene"
import Color from "cesium/Source/Core/Color"
import CesiumPoints from "./CesiumPoints"
import Cartesian3 from "cesium/Source/Core/Cartesian3"
import GeoJsonDataSource from "cesium/Source/DataSources/GeoJsonDataSource"
import EntityCollection from "cesium/Source/DataSources/EntityCollection"
import Data from '../../example.json'
import BillboardCollection from "cesium/Source/Scene/BillboardCollection"
import PostServices from '../../service/post-services'



class CesiumGlobe extends Component {
    state = {viewerLoaded : false}

    componentDidMount() {

        this.setState({
            viewerLoaded : true,
           
        });

        

        this.viewer = new Viewer(this.cesiumContainer, {
            animation : false,
            baseLayerPicker : true,
            fullscreenButton : false,
            geocoder : true,
            homeButton : false,
            infoBox : false,
            sceneModePicker : false,
            selectionIndicator : true,
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

        // this.billboards = new BillboardCollection();
        // this.viewer.dataSources.add(GeoJsonDataSource.load(Data))

    this.services = new PostServices()
        
    this.services.getAllPosts().then(data =>{
       data.forEach ( post =>{
            var long = post.longitude
            var lat = post.latitude
            
        
        

        this.viewer.entities.add(
            { position : Cartesian3.fromDegrees(
                long,
                lat
                ),
            point : {
                show : true, // default
                color : Color.BLUE, // default: WHITE
                pixelSize : 10, // default: 1
                outlineColor : Color.BLUE, // default: BLACK
                outlineWidth : 3 // default: 0
            },

            polyline :{
                positions : Cartesian3.fromDegreesArray([
                  -75.10, 39.57,
                  -77.02, 38.53,
                  -80.50, 35.14,
                  -80.12, 25.46]),
                width : 2
            }
        });
        })
    })
    }

   

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
                flexGrow : 2
            }
    

        return(

            <div className="cesiumGlobeWrapper" style={containerStyle}>
            
                <div
                    className="cesiumWidget"
                    ref={ element => this.cesiumContainer = element }
                    style={widgetStyle}
                    >   
                </div>
            </div>
        )
    }

}
export default CesiumGlobe;