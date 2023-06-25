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
import Home from "../Home/Home";
import "./Select.css";

function SelectStatement() {
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [monthSelect, setMonthSelect] = useState("");
  const [yearSelect, setYearSelect] = useState("");
  const [yearMonth, setyearMonth] = useState({});
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
      const response = await fetch("http://127.0.0.1:3000/statement/period", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const result = await response.json();
      setyearMonth(result['result']);
    };
    fetchData();
  }, []);

  useEffect(()=>{
    let years = [];
    for (const [key, value] of Object.entries(yearMonth)) {
      console.log(value);
      years.push(key);
    }
    setYear(years);
    console.log(yearMonth);
  },[yearMonth])

  const selectApi = async (e) => {
    let selected = yearSelect+ monthSelect;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year: yearSelect, month: monthSelect,ascending:true }),
    };
    const response = await fetch(
      "http://127.0.0.1:3000/statement/select",
      requestOptions
    );
    const data = await response.json();
    setList(data["result"])
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
    },
    {
      title: "Credit",
      dataIndex: "deposit",
      key: "deposit",
    },
    {
      title: "Balance",
      dataIndex: "Balance",
      key: "Balance",
    },
    {
      title: "Channel",
      dataIndex: "terminalno",
      key: "terminalno",
    },

  
    
  ];
  
  const deleteApi = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year: yearSelect, month: monthSelect }),
      };
      const response = await fetch(
        "http://127.0.0.1:3000/statement/delete",
        requestOptions
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="Select">
      <div>
          <span>กรุณาเลือก ปี :</span>
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
      <span>เดือน :</span>
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

      <Button
        onClick={(e) => {
          selectApi()
        }} 
        icon = {<SelectOutlined />}
      >
        ค้นหา
      </Button>
      </div>
      <div style= {list.length == 0 ? {display : "none"} : null}>
     <Table dataSource={list} columns={columns} /> 
      </div>
        

      <Button icon={<DeleteTwoTone />} onClick={deleteApi}>
  ลบข้อมูลของเดือนนี้
</Button>
    </div>
   

  );


}


export default SelectStatement;