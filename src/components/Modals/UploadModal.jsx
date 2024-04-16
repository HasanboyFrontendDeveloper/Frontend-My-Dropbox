import { useState } from "react";

import "./Modals.css";


const UploadModal = ({ show, setShow, uploadFile }) => {
  const [fileName, setFileName] = useState('')
  const [file, setFile] = useState({});

  const closeHandler = (e) => {
    if (e.target.className === "upload-box show") {
      setShow("hide");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    uploadFile(file, fileName)
    setShow("hide");
    setFile({})
    setFileName('')
  };

  console.log('upload');

  return (
    <div className={`upload-box ${show}`} onClick={closeHandler}>
      <div className="upload-field">
        <div className="wrapper">
          <h2>Upload New File</h2>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="File Name"
              className="input"
              name="fileName"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              required
            />
            <button className="submit-btn" onClick={()=> {document.getElementsByClassName('upload').click()}}>
              <label>
                Choose file
                <input
                  type="file"
                  className="upload"
                  name="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                  hidden
                />
              </label>
            </button>
            <div className="submit-btn-box">
              <button className="submit-btn">
                <span>Submit</span>
              </button>
            </div>
          </form>
        </div>
        <button className="close" onClick={() => setShow("hide")}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default UploadModal;
