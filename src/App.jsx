import { useState } from "react";
import "./App.css";

import Home from "./components/Home/Home";
import { Layout, Space, Button } from "antd";
import { BrowserRouter as Router, Routes, Route , Link } from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;
const contentStyle = {
  textAlign: "center",
  minHeight: `calc(100vh - 130px)`,
  lineHeight: "75px",
  color: "#120338",
  backgroundColor: "#efdbff",

};
const siderStyle = {
  textAlign: "center",
  lineHeight: "50px",
  color: "#fff",
  backgroundColor: "#fff",
};
const footerStyle = {
  textAlign: "center",
  color: "#6e459a",
  backgroundColor: "#b37feb",
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
            <Footer className="footer" style={footerStyle}>ACC-LiFe Statement BBL</Footer>
          </Layout>
        </Space>
      </Router>
    </>
  );
}

export default App;
