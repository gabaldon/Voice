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
    
    componentDidMount(){
      navigator.mediaDevices.getUserMedia({audio:true})
      .then(stream => {this.handlerFunction(stream)})


       
    }

    handlerFunction = (stream) => {
      rec = new MediaRecorder(stream);
      rec.ondataavailable = e => {
        audioChunks.push(e.data);
        if (rec.state == "inactive"){
          let blob = new Blob(audioChunks,{type:'audio/mpeg-3'});
          recordedAudio.src = URL.createObjectURL(blob);
          recordedAudio.controls=true;
          recordedAudio.autoplay=true;
          this.sendFileToCloudinary(blob)
        }
      }
    }

    // startRecording = () => {
    //   console.log("COMIENZA A GRABAR")
    //   this.setState({
    //     record: true
    //   });
    // }
  
    // stopRecording = () => {
    //   console.log("para de A GRABAR")
    //   this.setState({
    //     record: false
    //   });
    // }

   
    rec = e => {
      let record = e.target
      console.log('I was clicked')
      record.disabled = true;
      record.style.backgroundColor = "blue"
      stopRecord.disabled=false;
      audioChunks = [];
      rec.start();
    }
    
    stop = e => {
      let record = e.target
      console.log("I was clicked")
      record.disabled = false;
      stop.disabled=true;
      record.style.backgroundColor = "red"
      rec.stop();
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
      			<button id="record" onClick={this.rec}>Record</button>
      			<button id="stopRecord" onClick={this.stop} disabled>Stop</button>
      		</p>
      		<p>
      			<audio controls id="recordedAudio"></audio>
      	
      		</p>
        </div>
      );
    }
  }

export default Example
