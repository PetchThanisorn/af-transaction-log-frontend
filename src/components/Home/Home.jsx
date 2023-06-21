import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { Space, Table, Tag } from "antd";
import { encode, decode, labels } from "windows-874";

function Home() {
  const [file, setFile] = useState([]);
  const [rows, setRows] = useState({});

  function readCSVFile(e) {
    let rowsHeader = [];
    let fieldHeader = {};
    let isHeaderRow = {};

    let reader = new FileReader();
    // Read file as string
    reader.readAsText(e.target.files[0], "UTF-8");

    // Load event
    reader.onload = function (event) {
      let csvdata = event.target.result;
      let rowData = csvdata.split("\n");
      for (let row = 0; row < rowData.length; row++) {
        if ((rowData[row]+"").includes("Trans Date,Effect Date,Description")) {
          console.log(rowData[row]);
          isHeaderRow = { headerRow : row };
        }
        let rowColData = rowData[row].split(",");

        for (let col = 0; col < rowColData.length; col++) {
          // if(row==1 && col == 1){
          //   console.log(rowColData[col]);
          // }
          
          if (isHeaderRow["headerRow"] == row && col != (rowColData.length - 1)) {
            rowsHeader.push(rowColData[col]);
          }
          if (rowColData[col] == "Account No.") {
            const fieldName = rowColData[col];
            fieldHeader = { fieldName: "", next: col + 1 };
          }
          if (rowColData[col] == "Account Nickname") {
            const fieldName = rowColData[col];
            fieldHeader = { fieldName: "", next: col + 1 };
          }
          if (
            Object.keys(fieldHeader).length > 0 &&
            fieldHeader["next"] == col
          ) {
            fieldHeader = {};
          }
        }
        
      }
      console.log(rowsHeader);
    };
  }

  const columns = [
    {
      title: "Trans Date",
      dataIndex: "transferDate",
      key: "transferDate",
    },
    {
      title: "Effect Date",
      dataIndex: "effectDate",
      key: "effectDate",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Debit",
      dataIndex: "debit",
      key: "debit",
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },
    {
      title: "Channel",
      dataIndex: "channel",
      key: "channel",
    },
  ];

  let numbers = [1, 2, 3, 4, 5];

  const data = [
    {
      transferDate: "1",
      effectDate: "John Brown",
      description: "32",
      debit: "New York No. 1 Lake Park",
      credit: "asd",
      balance: "asd",
      channel: "ds",
    },
  ];

  const inputFileElement = (e) => {
    console.log("Click");
    document.getElementById("upload-input").click();
  };
  return (
    <div>
      <input
        id="upload-input"
        style={{ display: "none" }}
        type="file"
        onChange={readCSVFile}
      ></input>
      <Button icon={<UploadOutlined />} onClick={inputFileElement}>
        Click to Upload
      </Button>

      <Button onClick={""}>Remove</Button>
    </div>
  );
}

export default Home;
