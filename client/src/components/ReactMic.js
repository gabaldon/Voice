import React, { Component } from 'react'
import { ReactMic } from 'react-mic';

export class Example extends Component {
    constructor(props) {
      super(props);
      this.state = {
        record: false,
        url: ''
      }

    }
   
    startRecording = () => {
      console.log("COMIENZA A GRABAR")
      this.setState({
        record: true
      });
    }
  
    stopRecording = () => {
      console.log("para de A GRABAR")
      this.setState({
        record: false
      });
    }

   


    sendFileToCloudinary = (recordedBlob) => {
      console.log("se envia ahora a coludi")
      this.setState({ url: recordedBlob });
      this.props.handleFileUpload(this.state.url)
  }

    render() {
      return (
        <div className="mic-container">
         	<p>
      			<button id="record">Record</button>
      			<button id="stopRecord" disabled>Stop</button>
      		</p>
      		<p>
      			<audio controls id="recordedAudio"></audio>
      	
      		</p>
          <script src="prueba.js"></script>
        </div>
      );
    }
  }

export default Example
