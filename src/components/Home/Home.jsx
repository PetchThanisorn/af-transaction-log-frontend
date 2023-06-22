import React, { useState } from "react";
import { UploadOutlined, FileAddTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { Space, Table, Tag } from "antd";
import { encode, decode, labels } from "windows-874";
import "./Home.css";

function Home() {
  const [file, setFile] = useState([]);
  const [list, setList] = useState([]);
  const reversed = list.reverse();
  const columns = [
    {
      title: "Trans Date",
      dataIndex: "TransDate",
      key: "TransDate",
    },
    {
      title: "Effect Date",
      dataIndex: "EffectDate",
      key: "EffectDate",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: "Debit",
      dataIndex: "Debit",
      key: "Debit",
    },
    {
      title: "Credit",
      dataIndex: "Credit",
      key: "Credit",
    },
    {
      title: "Balance",
      dataIndex: "Balance",
      key: "Balance",
    },
    {
      title: "Channel",
      dataIndex: "Channel",
      key: "Channel",
    },
  ];

  let fieldHeader = {};

  let rowsHeaderName = [];
  let isHeaderRow = {};
  let rowStatement = {};

  async function readCSVFile(e) {
    let reader = new FileReader();
    setList([]);
    // Read file as string
    reader.readAsText(e.target.files[0]);

    // Load event
    reader.onload = function (event) {
      let csvdata_original = event.target.result;
      let csvdata = csvdata_original;
      const encoder = new TextEncoder('utf-8');
      const encodedData = encoder.encode(csvdata);
  
      // Convert Uint8Array from Windows-874 to UTF-8
      const decoder = new TextDecoder('tis-620');
      const utf8String = decoder.decode(encodedData);
      console.log(utf8String);
      let start = 0;
      let end = 0;

      //Clearing /, /"
      for (let i = 0; i < csvdata_original.length; i++) {
        if (csvdata_original[i] == '"') {
          if (start == 0) {
            start = i;
          } else {
            let oldValue = csvdata_original.substring(start, i + 1);

            let newValue = oldValue.replaceAll(/"/g, "");
            newValue = newValue.replaceAll(/,/g, "");
            csvdata = csvdata.replace(oldValue, newValue);
            start = 0;
          }
        }
      }

      let rowData = csvdata.split("\n");
      for (let row = 0; row < rowData.length; row++) {
        if (
          (rowData[row] + "").includes("Trans Date,Effect Date,Description")
        ) {
          isHeaderRow = { headerRow: row };
        }
        let rowColData = rowData[row].split(",");

        for (let col = 0; col < rowColData.length; col++) {
          //หัวตาราง
          if (isHeaderRow["headerRow"] == row && col != rowColData.length - 1) {
            rowsHeaderName.push(rowColData[col].replace(/\s/g, ""));
          }

          //ตาราง
          if (
            isHeaderRow["headerRow"] < row &&
            col != rowColData.length - 1 &&
            end == 0
          ) {
            rowStatement[rowsHeaderName[col]] = rowColData[col];
            if (col == rowColData.length - 2) {
              //added Data to rowStatement
              list.push(rowStatement);
              rowStatement = {};
            }
            if (rowColData[0] == "") {
              console.log(row);
              end = row;
            }
          }
          //ฟิลด์ข้อมูล Account No.
          if (rowColData[col] == "Account No.") {
            fieldHeader = { fieldName: "", next: col + 1 };
          }
          //ฟิลด์ข้อมูล Account No.
          if (rowColData[col] == "Account Nickname") {
            fieldHeader = { fieldName: "", next: col + 1 };
          }
          //บันทึกฟิลด์ข้อมูลตาม fieldHeader
          if (
            Object.keys(fieldHeader).length > 0 &&
            fieldHeader["next"] == col
          ) {
            fieldHeader = {};
          }
        }
      }
      setList(reversed.reverse());
      console.log(list);
    };
  }

  const inputFileElement = (e) => {
    console.log("Click");
    document.getElementById("upload-input").click();
  };

  return (
    <div className="home">
      <input
        id="upload-input"
        style={{ display: "none" }}
        type="file"
        onChange={readCSVFile}
      ></input>
      
      <Button icon={<FileAddTwoTone />} onClick={inputFileElement}>เพิ่มไฟล์ CSV</Button>
      <Button icon={<DeleteTwoTone />} onClick={()=>setList([])}>Remove</Button>
      <Table dataSource={list} columns={columns} />

      <Button icon={<UploadOutlined />} onClick={""}>Upload Statement</Button>
    </div>
  );
}

export default Home;
