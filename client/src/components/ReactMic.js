import React, { Component } from 'react'

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
        pulse: false,
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
        if (this.state.rec.state === "inactive"){
          let blob = new Blob(this.state.audioChunks,{type:'audio/mpeg-3'});
          let recordedAudio = document.getElementById("recordedAudio")
          recordedAudio.src = URL.createObjectURL(blob);
          recordedAudio.controls=true;
          recordedAudio.autoplay=true;
          this.sendFileToCloudinary(blob)
        }
      }
    }

  rec = e => {
    e.preventDefault()
    let record = document.getElementById("record")
    let stop = document.getElementById("stopRecord")
    console.log('I was clicked')
    this.state.rec.start()
    this.setState({ pulse: true })
  }

  stop = e => {
    e.preventDefault()

    let record = document.getElementById("record")
    let stop = document.getElementById("stopRecord")
    console.log("I was clicked")
    this.state.rec.stop();
    this.setState({ pulse: false })
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
          <button id="record" className={`voice-recording-btn ${this.state.pulse? 'pulse-rec' : '' }`} title="Start recording" onClick={this.rec}></button>
          <button id="stopRecord" className="stop-voice-recording-btn" title="Stop recording" onClick={this.stop}></button>
        </p>
        <p>
          <audio controls id="recordedAudio"></audio>
      
        </p>
      </div>
    );
  }
}

export default Example
