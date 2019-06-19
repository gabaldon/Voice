import React, { Component } from 'react'
// import { ReactMic } from 'react-mic';

export class Example extends Component {
    constructor(props) {
      super(props);
      this.state = {
        audioChunks: [],
        rec: undefined,
        recordedAudio: undefined,
        record: undefined,
        stop: undefined,
        url: "",
      }

    }
    
    componentDidMount(){
      navigator.mediaDevices.getUserMedia({audio:true})
      .then(stream => {this.handlerFunction(stream)})
       
    }

    handlerFunction = (stream) => {
      this.setState({rec: new MediaRecorder(stream)})
      this.state.rec.ondataavailable = e => {
        this.state.audioChunks.push(e.data);
        if (this.state.rec.state == "inactive"){
          let blob = new Blob(this.state.audioChunks,{type:'audio/mpeg-3'});
          let recordedAudio = document.getElementById("recordedAudio")
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
    e.preventDefault()
    let record = document.getElementById("record")
    let stop = document.getElementById("stopRecord")
      
    console.log('I was clicked')
    // record.disabled = true;
    record.style.backgroundColor = "blue"
    // stop.disabled = false;
    this.state.rec.start()
  }

  stop = e => {
    e.preventDefault()

    let record = document.getElementById("record")
    let stop = document.getElementById("stopRecord")

    console.log("I was clicked")
    // record.disabled = false;
    // stop.disabled=false;
    record.style.backgroundColor = "red"
    this.state.rec.stop();
  }
 

  sendFileToCloudinary = (recordedBlob) => {
    console.log(recordedBlob)
    console.log("se envia ahora a cloudi")
    this.setState({ url: recordedBlob });
    this.props.handleFileUpload(recordedBlob)
  }

    render() {
      
      return (
        <div className="mic-container">
         	<p>
      			<button id="record" onClick={this.rec}>Record</button>
      			<button id="stopRecord" onClick={this.stop}>Stop</button>
      		</p>
      		<p>
      			<audio controls id="recordedAudio"></audio>
      	
      		</p>
        </div>
      );
    }
  }

export default Example
