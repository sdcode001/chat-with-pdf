import './App.css';
import React, { useState } from 'react';
import {uploadBytes, getDownloadURL ,ref} from 'firebase/storage'
import storage from "./util/firebase";
import {SERVER_BASE_URL} from './env'
import axios from 'axios'
window.Buffer = window.Buffer || require("buffer").Buffer;



function App() {

  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);


  const handleSubmit = (event) => {  
    event.preventDefault();
    setPdfLoading(true)
    //upload pdf to firebase storage and get the url
    const storageRef=ref(storage, `pdfs/${pdfFile.name}`)

    uploadBytes(storageRef, pdfFile)
    .then(async(data)=>{
        getDownloadURL(data.ref)
        .then(async(url) => {
              setPdfUrl(url.toString())
             //submit project details to server for project creation
              const inputs = {projectName, description, pdfUrl}
              const config = {
                headers: {
                  "Content-type": "application/json",
                },
              }
              
              axios.post(SERVER_BASE_URL+'/project/create', inputs, config)
              .then((res) => {
                console.log(res.data)
              })
              .catch((err) => {
                console.log(err)
                setPdfLoading(false)
              })
        })
        .catch((err) => {
           console.log(err)
           setPdfLoading(false)
        })
    })
    .catch((err)=>{
        console.log(err)
        setPdfLoading(false)
        return
    })

};


  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };



  return (
    <div className="App">
      <h1>Project Submission Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="pdfFile">PDF File:</label>
          <input
            type="file"
            id="pdfFile"
            accept="application/pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
