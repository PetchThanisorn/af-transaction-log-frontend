import { useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { Layout, Space, Button } from "antd";
import { BrowserRouter as Router, Routes, Route , Link } from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;

const contentStyle = {
  textAlign: "center",
  minHeight: `calc(100vh - 50px)`,
  lineHeight: "120px",
  color: "#",
  backgroundColor: "#d3adf7",
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#fff",
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",

  minHeight: "50px",
};

function readCSVFile() {
  var files = document.querySelector("#file").files;

  if (files.length > 0) {
    // Selected file
    var file = files[0];

    // FileReader Object
    var reader = new FileReader();

    // Read file as string
    reader.readAsText(file);

    // Load event
    reader.onload = function (event) {
      // Read file data
      var csvdata = event.target.result;

      // Split by line break to gets rows Array
      var rowData = csvdata.split("\n");

      // <table > <tbody>
      var tbodyEl = document
        .getElementById("tblcsvdata")
        .getElementsByTagName("tbody")[0];
      tbodyEl.innerHTML = "";

      // Loop on the row Array (change row=0 if you also want to read 1st row)
      for (var row = 1; row < rowData.length; row++) {
        // Insert a row at the end of table
        var newRow = tbodyEl.insertRow();

        // Split by comma (,) to get column Array
        rowColData = rowData[row].split(",");

        // Loop on the row column Array
        for (var col = 0; col < rowColData.length; col++) {
          // Insert a cell at the end of the row
          var newCell = newRow.insertCell();
          newCell.innerHTML = rowColData[col];
        }
      }
    };
  } else {
    alert("Please select a file.");
  }
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
          size={[0, 48]}
        >
          <Layout>
            <Header className="header">
              <div>ACC-LiFe Statement BBL</div>
              <ul className="nav-wrapper">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </Header>
            <Content style={contentStyle}>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </Content>
            <Footer style={footerStyle}>Footer</Footer>
          </Layout>
        </Space>
      </Router>
    </>
  );
}

export default App;
