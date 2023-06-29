import React, { useState, useEffect } from "react";
import {
  UploadOutlined,
  FileAddTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import {
  Button,
  message,
  Upload,
  Space,
  Table,
  Tag,
  Badge,
  Statistic,
  Card,
  Row,
  Col,
} from "antd";
import CountUp from "react-countup";
import { FileTextFilled, FileAddOutlined } from "@ant-design/icons";
import "./Home.css";
import Swal from "sweetalert2";
function Home() {
  const [list, setList] = useState([]);
  const [accno, setAccno] = useState("");
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);
  const [Upload, setUpload] = useState(false);

<<<<<<< HEAD
  const enterUpload = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {

      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });

    }, 6000);
  };

=======
>>>>>>> cfdff3860395c20480d6e5b4f79848be95c9b99e
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
        setFiles(files);
        Swal.fire({
          title: "ไม่พบข้อมูล เลขที่บัญชี",
          text: "โปรดตรวจสอบฟิลด์ข้อมูล Account No.",
          icon: "error",
        });
        setFile(e.name);
        inputFileElementClear();
        addFileElementClear();
        return "";
      } else {
        if (files.length < 1) {
          console.log("accNo has set.");
          setAccno(accountNo);
          setFile(e.name);
          files.push(e);
          setFiles(files);
          const listStatement = list.concat(rows.reverse());
          setList(listStatement);
        } else {
          if (accno != accountNo) {
            Swal.fire({
              title: "เลขที่บัญชีไม่ตรงกัน",
              text: `ต้องเป็นเลขที่บัญชี ${accno} เท่านั้น`,
              icon: "error",
            });
            console.log("not equals", files);
            setFile(e.name);
<<<<<<< HEAD
=======
      
>>>>>>> cfdff3860395c20480d6e5b4f79848be95c9b99e
          } else {
            setFile(e.name);
            files.push(e);
            setFiles(files);
            const listStatement = list.concat(rows.reverse());
            setList(listStatement);
          }
        }
      }
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
    console.log(e.target.files[0]);
    const filtered = files.filter((file) => {
      return file["name"] == e.target.files[0].name;
    });

    if (e.target.files[0].type != "text/csv") {
      Swal.fire({
        title: "รองรับไฟล์ CSV เท่านั้น",
        text: "โปรดอัพโหลดไฟล์ .csv เท่านั้น",
        icon: "error",
      });

      return "";
    } else if (filtered.length > 0) {
      Swal.fire({
        title: "ข้อมูลถูกเพิ่มไปแล้ว",
        text: "ไฟล์ " + e.target.files[0].name + " ถูกเพิ่มไปแล้ว",
        icon: "error",
      });

      return "";
    } else {
      setFiles([e.target.files[0]]);
    }
    inputFileElementClear();
    addFileElementClear();
  };
  const addFile = (e) => {
    const filtered = files.filter((file) => {
      return file["name"] == e.target.files[0].name;
    });
    if (e.target.files[0].type != "text/csv") {
      Swal.fire({
        title: "รองรับไฟล์ CSV เท่านั้น",
        text: "โปรดอัพโหลดไฟล์ .csv เท่านั้น",
        icon: "error",
      });
      return "";
    } else if (filtered.length > 0) {
      Swal.fire({
        title: "ข้อมูลถูกเพิ่มไปแล้ว",
        text: "ไฟล์ " + e.target.files[0].name + " ถูกเพิ่มไปแล้ว",
        icon: "error",
      });

      return "";
    } else {
      let listFile = files.concat(e.target.files[0]);
      setFiles(listFile);
    }
    inputFileElementClear();
    addFileElementClear();
  };

  const insertApi = async (e) => {
    Swal.fire({
      title: "ยืนยันการเพิ่มข้อมูล",
      text: "สามารถกลับไปตรวจสอบความถูกต้องก่อนอัพโหลดก่อนได้",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน , เพิ่มข้อมูล",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setUpload(true);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: "", data: list }),
        };
        const response = await fetch(
<<<<<<< HEAD
          "http://127.0.0.1:3000/statement/insert",
          requestOptions
        );
        const data = await response.json();
        if(data["message"] == "OK"){
=======
          `${import.meta.env.VITE_API_URL}/statement/insert`,
          requestOptions
        );
        const data = await response.json();
        if (data["message"] == "OK") {
>>>>>>> cfdff3860395c20480d6e5b4f79848be95c9b99e
          setUpload(false);
          setList([]);
          setAccno("");
          setFile("");
          setFiles([]);
          addFileElementClear();
          inputFileElementClear();
          Swal.fire({
<<<<<<< HEAD
            title : "เพิ่มข้อมูล " + data["result"].length +" รายการ สำเร็จ",
            text : "สามารถตรวจสอบข้อมูลจากหน้า ค้นหา หรือ ลบรายการ" ,
            icon : "success"
          })
        }
        
=======
            title: "เพิ่มข้อมูล " + data["result"].length + " รายการ สำเร็จ",
            text: "สามารถตรวจสอบข้อมูลจากหน้า ค้นหา หรือ ลบรายการ",
            icon: "success",
          });
        }

>>>>>>> cfdff3860395c20480d6e5b4f79848be95c9b99e
        console.log(data);
      }
    });
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
<<<<<<< HEAD
  useEffect(
    (e) => {
      console.log(list, file);
    },
    [list, file]
  );
=======

>>>>>>> cfdff3860395c20480d6e5b4f79848be95c9b99e
  const removeSelected = (e) => {
    files.splice(e, 1);
    setFiles(files);
  };

  useEffect(() => {
<<<<<<< HEAD
    console.log("state : ", files);
=======
>>>>>>> cfdff3860395c20480d6e5b4f79848be95c9b99e
    if (files.length > 0) {
      const lastFile = files.pop();
      readCSVFile(lastFile);
    }
  }, [files]);
<<<<<<< HEAD
=======
  useEffect(()=>{
    setFile("");
  },[file])

>>>>>>> cfdff3860395c20480d6e5b4f79848be95c9b99e
  const formatter = (value) => <CountUp end={value} separator="," />;
  return (
    <div className="home">
      <div>
        <input
          id="upload-input"
          style={{ display: "none" }}
          type="file"
          onChange={newFile}
          accept=".csv"
        ></input>
        <input
          id="add-input"
          style={{ display: "none" }}
          type="file"
          onChange={addFile}
          accept=".csv"
        ></input>
        {accno == "" ? (
          <Button
            icon={<FileAddTwoTone />}
            className="margin-right"
            onClick={inputFileElement}
          >
            เพิ่มไฟล์ CSV
          </Button>
        ) : (
<<<<<<< HEAD
          <Button icon={<DeleteTwoTone />} onClick={clearAll}>
            ล้างข้อมูลทั้งหมด
          </Button>
=======
          <div>
            <Button icon={<FileAddTwoTone />} onClick={addFileElement}>
              เพิ่มข้อมูล CSV
            </Button>
            <Button
              icon={<DeleteTwoTone />}
              onClick={clearAll}
              style={{ marginLeft: "10px" }}
            >
              ล้างข้อมูลทั้งหมด
            </Button>
          </div>
>>>>>>> cfdff3860395c20480d6e5b4f79848be95c9b99e
        )}
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
                    bordered={false}
                    color="blue"
                    style={{ padding: "10px", fontSize: "18px" }}
                    onClose={() => {
                      removeSelected(i);
                    }}
                  >
                    <FileTextFilled />
                    <span>{e.name}</span>
                  </Tag>
                ))}
<<<<<<< HEAD
                <Button onClick={addFileElement}>
                  <FileAddOutlined />
                  เพิ่มข้อมูล CSV
                </Button>
=======
>>>>>>> cfdff3860395c20480d6e5b4f79848be95c9b99e
              </Space>
            </span>
          </div>
          <Row gutter={16}>
            <Col span={8}>
              <Card size="small">
                <Statistic title="เลขที่บัญชี" value={accno} precision={2} />
              </Card>
            </Col>
            <Col span={8}>
              <Card size="small">
                <Statistic
                  title="จำนวนรายการ"
                  value={list.length}
                  precision={2}
                  formatter={formatter}
                />
              </Card>
            </Col>
<<<<<<< HEAD
            <Col span={8}>
             
            </Col>
          </Row>
        </div>
        <Table
          style={{marginTop:"30px"}}
          dataSource={list}
          columns={columns}
          size="small"
          pagination={{ pageSize: 1000 }}
          bordered
=======
            <Col span={8}></Col>
          </Row>
        </div>
        <Table
          style={{ marginTop: "30px" }}
          dataSource={list}
          columns={columns}
          size="small"
          bordered
          pagination={{ pageSize: 1000 }}
          
>>>>>>> cfdff3860395c20480d6e5b4f79848be95c9b99e
        />
        <Button
          style={{ marginRight: "20px" }}
          icon={<UploadOutlined />}
<<<<<<< HEAD
          loading = {Upload}
=======
          loading={Upload}
>>>>>>> cfdff3860395c20480d6e5b4f79848be95c9b99e
          onClick={() => {
            insertApi();
          }}
        >
<<<<<<< HEAD
          บันทึกไฟล์เข้าสู่ระบบ 
=======
          บันทึกไฟล์เข้าสู่ระบบ
>>>>>>> cfdff3860395c20480d6e5b4f79848be95c9b99e
        </Button>
      </div>
    </div>
  );
}

export default Home;
