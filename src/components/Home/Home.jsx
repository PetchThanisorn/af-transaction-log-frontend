import React, { useState, useEffect } from "react";
import {
  UploadOutlined,
  FileAddTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { Space, Table, Tag } from "antd";
import "./Home.css";
import Swal from "sweetalert2";
function Home() {
  const [list, setList] = useState([]);
  const [accno, setAccno] = useState("");
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);

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
      align: "right",
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
      align: "right",
    },
    {
      className: "column-money",
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      align: "right",
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
    reader.readAsText(e);

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

              rowStatement["key"] = Math.abs(
                row + list.length - start
              ).toString();
              console.log(rowStatement["key"]);
              rows.push(rowStatement);
              rowStatement = {};
            }
            if (rowColData[0] == "") {
              end = row;
            }
          }
          //หาฟิลด์ข้อมูล Account No.
          if (rowColData[col] == "Account No.") {
            fieldHeader = { fieldName: "", next: col + 1 };
          }

          //บันทึกฟิลด์ข้อมูลตาม Account No.
          if (
            Object.keys(fieldHeader).length > 0 &&
            fieldHeader["next"] == col
          ) {
            accountNo = rowColData[col];

            fieldHeader = {};
          }
        }
      }
      if (accountNo == "") {
        Swal.fire({
          title: "ไม่พบข้อมูล เลขที่บัญชี",
          text: "โปรดตรวจสอบฟิลด์ข้อมูล Account No.",
          icon: "error",
        });
        inputFileElementClear();
        addFileElementClear();
        return "";
      }

      setFile(e.name);
      files.push(e);
      setFiles(files);
      const listStatement = list.concat(rows.reverse());
      setList(listStatement);
    };
  }

  const inputFileElement = (e) => {
    console.log("Click");
    document.getElementById("upload-input").click();
  };
  const inputFileElementClear = () => {
    document.getElementById("upload-input").value = "";
  };
  const addFileElement = (e) => {
    console.log("Click");
    document.getElementById("add-input").click();
  };
  const addFileElementClear = (e) => {
    document.getElementById("add-input").value = "";
  };
  const newFile = (e) => {
    if (e.target.files[0].type != "text/csv") {
      Swal.fire({
        title: "รองรับไฟล์ CSV เท่านั้น",
        text: "โปรดอัพโหลดไฟล์ .csv เท่านั้น",
        icon: "error",
      });
      inputFileElementClear();
      addFileElementClear();
      return "";
    } else {
      setFiles([e.target.files[0]]);
    }
  };
  const addFile = (e) => {
    if (e.target.files[0].type != "text/csv") {
      Swal.fire({
        title: "รองรับไฟล์ CSV เท่านั้น",
        text: "โปรดอัพโหลดไฟล์ .csv เท่านั้น",
        icon: "error",
      });
      inputFileElementClear();
      addFileElementClear();
      return "";
    } else {
      let listFile = files.concat(e.target.files[0]);
      console.log("list-file : ", listFile);
      setFiles(listFile);
    }
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
  const clearAll = () => {
    Swal.fire({
      title: "ยืนยันการล้างข้อมูล",
      text: "ล้างข้อมูลที่นำเข้าทั้งหมด",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน ล้างข้อมูล",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setList([]);
        setAccno("");
        setFile("");
        setFiles([]);
        addFileElementClear();
        inputFileElementClear();
      }
    });
  };
  useEffect(
    (e) => {
      console.log(list, file);
    },
    [list, file]
  );
  const removeSelected = (e) => {
    files.splice(e, 1);
    setFiles(files);
  };

  useEffect(() => {
    console.log(files);
    if (files.length > 0) {
      const lastFile = files.pop();
      readCSVFile(lastFile);
    }
  }, [files]);

  return (
    <div className="home">
      <div>
        <input
          id="upload-input"
          style={{ display: "none" }}
          type="file"
          onChange={newFile}
        ></input>
        <input
          id="add-input"
          style={{ display: "none" }}
          type="file"
          onChange={addFile}
        ></input>

        <Button
          icon={<FileAddTwoTone />}
          className="margin-right"
          onClick={inputFileElement}
        >
          {accno == "" ? "เพิ่มไฟล์ CSV" : "เปลี่ยนไฟล์ CSV"}
        </Button>
      </div>
      <div style={list.length == 0 ? { display: "none" } : null}>
        <div style={{ fontSize: "20px", textAlign: "left" }}>
          <div>
            <span>ชื่อไฟล์ : </span>
            <span>
              <Space size={[0, 8]} wrap>
                {files.map((e, i) => (
                  <Tag
                    key={i}
                    color="green"
                    style={{ padding: "10px", fontSize: "18px" }}
                    onClose={() => {
                      removeSelected(i);
                    }}
                  >
                    <span>{e.name}</span>
                  </Tag>
                ))}
                <Button onClick={addFileElement}>เพิ่มข้อมูล CSV</Button>
              </Space>
            </span>
          </div>
          <span style={{ marginRight: "10px" }}>เลขที่บัญชี : {accno} </span>
        </div>
        <Table
          dataSource={list}
          columns={columns}
          size="small"
          pagination={{ pageSize: 1000 }}
          bordered
        />
        <Button
          style={{ marginRight: "20px" }}
          icon={<UploadOutlined />}
          onClick={() => {
            insertApi();
          }}
        >
          บันทึกไฟล์เข้าสู่ระบบ
        </Button>

        <Button icon={<DeleteTwoTone />} onClick={clearAll}>
          ล้างข้อมูลทั้งหมด
        </Button>
      </div>
    </div>
  );
}

export default Home;
