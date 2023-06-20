import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";

// const [file, setFile] = useState("");

function readCSVFile(e) {

  var reader = new FileReader();
 
  // Read file as string
  reader.readAsText(e.target.files[0]);

  // Load event
  reader.onload = function (event) {
    var csvdata = event.target.result;
    var rowData = csvdata.split("\n");
    for (var row = 0; row < rowData.length; row++) {
     var rowColData = rowData[row].split(",");
      // Loop on the row column Array
      for (var col = 0; col < rowColData.length; col++) {
        if(row == 0){
          console.log("HEADER >> ", rowColData[col]);
        }else{
          console.log(rowColData[col]);
        }
      }
    }
  }
};

const inputFileElement = (e)=>{
  console.log("Click");
  document.getElementById("upload-input").click();
}

function Home() {
  return (
    <div>
      <input id="upload-input" style={{display:"none"}} type="file" onChange={readCSVFile}></input>

      <Button icon={<UploadOutlined />} onClick={inputFileElement}>Click to Upload</Button>
    
    </div>
  );
}

export default Home;
