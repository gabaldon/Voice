import React, { Component } from 'react'
import { ReactMic } from 'react-mic';

export class Example extends Component {
    constructor(props) {
      super(props);
      this.state = {
        record: false,
        url: '',
      }

    }
   
    startRecording = () => {
      this.setState({
        record: true
      });
    }
  
    stopRecording = () => {
      this.setState({
        record: false
      });
    }

  //   handleFileUpload = (e) => {

  //     const uploadData = new FormData();
  //     uploadData.append("audio", e.target.files[0]);

  //     this.services.handleUpload(uploadData)
  //         .then(response => {
  //             console.log(response.secure_url)
  //             this.setState({
  //                 postform: {
  //                     ...this.state.postform, audio: response.secure_url
  //                 }
  //             })
  //             console.log(this.state.postform)
  //         })
  //         .catch(err => console.log(err))
  // }
   
  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  onStop = (recordedBlob) => {

      this.setState({
        url: recordedBlob
      });
      this.props.handleFileUpload(this.state.url)
  }


    // onData(recordedBlob) {
    //   console.log('chunk of real-time data is: ', recordedBlob);
    // }
   
    // onStop(){
      
    //   console.log("Hola")
    
    // //   console.log('recordedBlob is: ', recordedBlob);
    // //   console.log('recordedBlob is: ', recordedBlob.blobURL);


    // //   console.log(this.state.url)

    // //   this.props.handleFileUpload(this.state.url)
    // }
   
    render() {
      return (
        <div>
          <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            onData={this.onData}
            strokeColor="#000000"
            backgroundColor="#FFFF" />
          <button onClick={this.startRecording} type="button">Start</button>
          <button onClick={this.stopRecording} type="button">Stop</button>
        </div>
      );
    }
  }

export default Example


