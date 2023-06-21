import React, { useState, } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { Space, Table, Tag } from 'antd';
import { useCSVReader } from 'react-papaparse'

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


const columns = [
  {
    title: 'Trans Date',
    dataIndex: 'transferDate',
    key: 'transferDate',
  },
  {
    title: 'Effect Date',
    dataIndex: 'effectDate',
    key: 'effectDate',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Debit',
    dataIndex: 'debit',
    key: 'debit',
  },
  {
    title: 'Credit',
    dataIndex: 'credit',
    key: 'credit',
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
  },
  {
    title: 'Channel',
    dataIndex: 'channel',
    key: 'channel',
  },
];

let numbers = [1, 2, 3, 4, 5];

const data = [
  {
    transferDate: '1',
    effectDate: 'John Brown',
    description: '32',
    debit: 'New York No. 1 Lake Park',
    credit:'asd',
    balance: 'asd',
    channel: 'ds',
  },  

]; 




const inputFileElement = (e)=>{
  console.log("Click");
  document.getElementById("upload-input").click();
}


function Home() {
  return (
    <div>
      <input id="upload-input" style={{display:"none"}} type="file" onChange={readCSVFile}></input>
      <Button icon={<UploadOutlined />} onClick={inputFileElement}>Click to Upload</Button>

      <box><Button onClick={""}>Remove</Button></box>
      <Table columns={columns} dataSource={data}  />
    </div>
  );
}

export default Home;
