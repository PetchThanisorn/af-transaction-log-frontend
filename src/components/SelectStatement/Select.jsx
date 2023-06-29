import React, { useState, useEffect } from "react";
import { SelectOutlined, DeleteTwoTone } from "@ant-design/icons";
import {
  Space,
  Table,
  Tag,
  Dropdown,
  Typography,
  Select,
  Button,
  List,
  message,
  Upload,
} from "antd";
import "./Select.css";

import Swal from "sweetalert2";

function SelectStatement() {
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [accnos, setAccnos] = useState([]);
  const [monthSelect, setMonthSelect] = useState("");
  const [yearSelect, setYearSelect] = useState("");
  const [yearMonth, setyearMonth] = useState({});
  const [accnoSelect, setAccnoselect] = useState("");
  const [list, setList] = useState([]);
  const monthStr = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/statement/period`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        }
      );
      const result = await response.json();
      setyearMonth(result["result"]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let years = [];
    for (const [key, value] of Object.entries(yearMonth)) {
      console.log(value);
      years.push(key);
    }
    setYear(years.reverse());
    console.log(yearMonth);
  }, [yearMonth]);

  useEffect(() => {
    if (yearSelect != "" && monthSelect != "") {
      const fetchData = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/statement/getaccno`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              period: String(yearSelect) + String(monthSelect),
            }),
          }
        );
        const result = await response.json();
        console.log(result);
        setAccnos(result["result"]);
      };
      fetchData();
      console.log("select", yearSelect, monthSelect);
    }
  
  }, [yearSelect, monthSelect]);

  useEffect(() => {
    selectApi();
  }, [accnoSelect]);

  const selectApi = async (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        year: yearSelect,
        month: monthSelect,
        accno: accnoSelect,
        ascending: true,
      }),
    };
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/statement/select`,
      requestOptions
    );

    const data = await response.json();
    console.log(data["result"]);
    setList(data["result"]);
    console.log(data);
  };
  const columns = [
    {
      title: "Trans Date",
      dataIndex: "transdate",
      key: "transdate",
    },
    {
      title: "Effect Date",
      dataIndex: "effdate",
      key: "effdate",
    },
    {
      title: "Description",
      dataIndex: "particular",
      key: "particular",
    },
    {
      title: "Debit",
      dataIndex: "Withdrawal",
      key: "Withdrawal",
      align: "right",
    },
    {
      title: "Credit",
      dataIndex: "deposit",
      key: "deposit",
      align: "right",
    },
    {
      title: "Balance",
      dataIndex: "Balance",
      key: "Balance",
      align: "right",
    },
    {
      title: "Channel",
      dataIndex: "terminalno",
      key: "terminalno",
    },
  ];

  const deleteApi = async () => {
    try {
      Swal.fire({
        title: "ยืนยันการลบข้อมูล",
        text: "ข้อมูลที่ถูกลบไปไม่สามารถกู้คืนกลับมาได้",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยันลบข้อมูล",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              year: yearSelect,
              month: monthSelect,
              accno: accnoSelect,
            }),
          };
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/statement/delete`,
            requestOptions
          );
          const data = await response.json();
          if (data["message"] == "ok") {
            if (data["rowsAffected"] > 0) {
              Swal.fire(
                "ลบข้อมูลเรียบร้อย",
                "ลบข้อมูล " + data["rowsAffected"] + " รายการ",
                "success"
              ).then(() => {
                setList([]);
              });
            } else {
              Swal.fire(
                "ไม่พบข้อมูล",
                "ไม่พบข้อมูล หรือ ถูกลบไปแล้ว",
                "error"
              ).then(() => {
                setList([]);
              });
            }
          }
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="Select">
      <div style={{fontSize:"20px"}}>
        <span className="margin-right">เลือก ปี :</span>
        <Select
          style={{ width: 150, marginRight: 10 }}
          onChange={(value) => {
            setYearSelect(value);
            setMonth(yearMonth[value]);
          }}
          options={year.map((year) => ({
            label: year,
            value: year,
          }))}
        />
        <span className="margin-right">เดือน :</span>
        <Select
          style={{ width: 200, marginRight: 10 }}
          onChange={(value) => {
            setMonthSelect(value);
          }}
          options={month.map((month) => ({
            label: monthStr[month - 1] + " " + yearSelect + "/" + month,
            value: month.padStart(2, "0"),
          }))}
        />
        <span className="margin-right">เลขบัญชี:</span>
        <Select
          style={{ width: 200, marginRight: 10 }}
          onChange={(value) => {
            setAccnoselect(value);
          }}
          onSelect={() => {
            selectApi();
          }}
          options={accnos.map((a) => ({
            label: a["AccNo"],
            value: a["AccNo"],
          }))}
        />
        <span
          style={
            yearSelect.length == 0 ||
            monthSelect.length == 0 ||
            accnoSelect.length == 0
              ? { display: "none" }
              : null
          }
        >
          <Button
            onClick={(e) => {
              selectApi();
            }}
          >
            ค้นหา
          </Button>
        </span>
      </div>
      
      <div>
        <Table
          dataSource={list}
          columns={columns}
          size="small"
          bordered
          pagination={{ pageSize: 1000 }}
        />
      </div>
      <div style={list.length == 0 ? { display: "none" } : null}>
        <Button icon={<DeleteTwoTone />} onClick={deleteApi}>
          ลบข้อมูลของเดือนนี้
        </Button>
      </div>
    </div>
  );
}

export default SelectStatement;
