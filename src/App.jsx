import { useState } from "react";
import "./App.css";
import Select from "./components/SelectStatement/Select";
import Home from "./components/Home/Home";
import { Layout, Space, Button } from "antd";
import { BrowserRouter as Router, Routes, Route , Link } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

const contentStyle = {
  textAlign: "center",
  minHeight: `calc(100vh - 137px)`,
  lineHeight: "75px",
  color: "#120338",
  backgroundColor: "#D7C0AE",
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "50px",
  color: "#fff",
  backgroundColor: "#fff",
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#967E76",
  minHeight: "50px",
  
};



function App() {
 
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
              <div>ACC-Life Statement BBL</div>
              <ul className="nav-wrapper">
                <li>
                  <Link to="/"  className="underlined">เพิ่มข้อมูล</Link>
                </li>
                <li>
                  <Link to="/SelectStatement" className="underlined">ค้นหาหรือลบรายการ</Link>
                </li>

              </ul>
            </Header>
            <Content style={contentStyle}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/SelectStatement" element={<Select />} />
              </Routes>
            </Content>
            <Footer className="footer" style={footerStyle}>ACC-LiFe Statement BBL</Footer>
          </Layout>
        </Space>
      </Router>
    </>
  );
}

export default App;
