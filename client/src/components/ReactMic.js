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
          <ReactMic
            record={this.state.record}
            className="sound-wave row"
            onStop={this.sendFileToCloudinary}
            strokeColor="rgb(18, 247, 10)"
            backgroundColor="#00000000" />
          <div className="row">
          <button onClick={this.startRecording} className="voice-recording-btn" type="button"></button>
          <button onClick={this.stopRecording} className="stop-voice-recording-btn" type="button"></button>
          </div>
        </div>
      );
    }
  }

export default Example
