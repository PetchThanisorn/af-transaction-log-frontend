import React, { useState, useEffect } from "react";
import {
  UploadOutlined,
  FileAddTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { Space, Table, Tag } from "antd";
import { encode, decode, labels } from "windows-874";
import "./Home.css";

function Home() {
  const [file, setFile] = useState([]);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [show,setShow] = useState(true);

  const columns = [
    {
      title: "Trans Date",
      dataIndex: "transdate",
      key: "transdate",
    },
    {
      title: "Effect Date",
      dataIndex: "effectdate",
      key: "effectdate",
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

  async function readCSVFile(e) {
    let fieldHeader = {};
    let rowsHeaderName = [];
    let isHeaderRow = {};
    let rowStatement = {};
    let reader = new FileReader();
    let accountNo = "";
    let rows = [];

    // Read file as string
    reader.readAsText(e.target.files[0]);

    // Load event
    reader.onload = function (event) {
      let csvdata_original = event.target.result;
      let csvdata = csvdata_original;
      const encoder = new TextEncoder("utf-8");
      const encodedData = encoder.encode(csvdata);

      // Convert Uint8Array from Windows-874 to UTF-8
      const decoder = new TextDecoder("tis-620");
      const utf8String = decoder.decode(encodedData);

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
            let colHeader = rowColData[col].replace(/\s|\./g, "");
            console.log(colHeader.toLowerCase());
            rowsHeaderName.push(colHeader.toLowerCase());
          }
          //ตาราง
          if (
            isHeaderRow["headerRow"] < row &&
            col != rowColData.length &&
            end == 0
          ) {
            rowStatement[rowsHeaderName[col]] = rowColData[col].replaceAll(
              /\r/g,
              ""
            );
            if (col == rowColData.length - 1) {
              //added Data to rowStatement
              rowStatement["accno"] = accountNo;
              if (rowStatement["chequeno"]) {
                delete Object.assign(rowStatement, {
                  ["description"]:
                    rowStatement["description"] +
                    "   " +
                    rowStatement["chequeno"],
                })["ChequeNo"];
              }
              rowStatement["key"] = (row - start).toString();
              rows.push(rowStatement);
              rowStatement = {};
            }
            if (rowColData[0] == "") {
              end = row;
            }
          }
          //ฟิลด์ข้อมูล Account No.
          if (rowColData[col] == "Account No.") {
            fieldHeader = { fieldName: "", next: col + 1 };
          }
          //บันทึกฟิลด์ข้อมูลตาม fieldHeader
          if (
            Object.keys(fieldHeader).length > 0 &&
            fieldHeader["next"] == col
          ) {
            accountNo = rowColData[col];
            fieldHeader = {};
          }
        }
      }

      setList(rows.reverse());
    };
  }

  const inputFileElement = (e) => {
    console.log("Click");
    document.getElementById("upload-input").click();
  };

  const insertApi = async (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: "", data: list }),
    };
    const response = await fetch(
      "http://127.0.0.1:3000/statement/insert",
      requestOptions
    );
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    console.log(list);
    // setList(list)
  }, [list]);

  return (
    <div className="home">
      <div>
        <input
          id="upload-input"
          style={{ display: "none" }}
          type="file"
          onChange={readCSVFile}
        ></input>
        
        
        <Button icon={<FileAddTwoTone />} onClick={inputFileElement}>
          เพิ่มไฟล์ CSV
        </Button>
        <>  </>
        <Button icon={<DeleteTwoTone />} onClick={() => setList([])}>
        ล้างข้อมูลในตาราง
        </Button>
        <>  </>
      </div>
      <div>
        {list.length == 0 ? "" : <Table dataSource={list} columns={columns} />}
      </div>
      <div>
        <Button icon={<UploadOutlined />} onClick={insertApi}>
          Upload Statement
        </Button>
        <> </>
        <Button
          onClick={() => {
            setCount(0);
          }}
        >
          count is : {count}
        </Button>
      </div>
    </div>
  );
}

export default Home;
