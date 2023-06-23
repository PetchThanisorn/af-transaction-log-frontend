import React, { useState, useEffect } from "react";
import { SelectOutlined, DeleteTwoTone, DownOutlined } from "@ant-design/icons";
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

  const yearMonth = {
    2020: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    2019: ["1", "2", "3", "4", "5", "6", "7", "8"],
  };
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
    let years = [];
    for (const [key, value] of Object.entries(yearMonth)) {
      console.log(value);
      years.push(key);
    }
    setYear(years);
  }, []);

  return (
    <div className="Select">
      {/* <Button
        onClick={() => {
          console.log(year);
          let val = year.map((year) => ({
            label: year,
            value: year,
          }));
          console.log(val);
        }}
      ></Button>
      <Button
        onClick={() => {
          console.log(month);
          let val = month.map((month) => ({
            label: month,
            value: month,
          }));
          console.log(val);
        }}
      ></Button> */}

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
          label: monthStr[month-1] +" "+ yearSelect + "/" +month,
          value: month.padStart(2, '0'),
        }))}
      />

      <Button onClick={()=>{
        console.log(yearSelect+monthSelect);
      }}>ค้นหา</Button>
    </div>
  );
}

export default SelectStatement;
