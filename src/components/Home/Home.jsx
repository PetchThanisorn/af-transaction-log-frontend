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
    // Read file data
    var csvdata = event.target.result;

    // Split by line break to gets rows Array
    var rowData = csvdata.split("\n");
    // Loop on the row Array (change row=0 if you also want to read 1st row)
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
  
const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
      console.log(info.file);
      readCSVFile(info.file);
      message.success(`${info.file.name} file uploaded successfully`);
    }
  },
};

function Home() {
  return (
    <div>
      <input type="file" onChange={readCSVFile}></input>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  );
}

export default Home;
