import { useState, react, useEffect } from "react";
import "./App.css";
import Select from "./components/SelectStatement/Select";
import Home from "./components/Home/Home";
import { Layout, Space, Button, ConfigProvider } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { FileAddOutlined , FileSearchOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;

const contentStyle = {
  textAlign: "center",
  minHeight: `calc(100vh - 137px)`,
  lineHeight: "75px",
  color: "#120338",
  backgroundColor: "rgb(197 223 255)",
  padding:"20px 0px 0px 0px",
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "rgb(197 223 255)",
  minHeight: "50px",
};

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Kanit",
        },
      }}
    >
      <div style={{ fontFamily: "Kanit" }}>
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
                <div>
                ACC-Life Statement BBL
                </div>
                <ul className="nav-wrapper">
                  <li>
                    <Link to="/" className="underlined">
                    <Button className="nav-button" type="text" shape="round" size="large" icon={<FileAddOutlined /> }>
                     เพิ่มข้อมูล
                    </Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/SelectStatement" className="underlined">
                    <Button className="nav-button" type="text" shape="round" size="large" icon={<FileSearchOutlined /> } >
                    ค้นหา หรือ ลบรายการ
                    </Button>
                      
                    </Link>
                  </li>
                </ul>
              </Header>
              <Content style={contentStyle}>
                <div style={{backgroundColor:"#f8f9fa",margin:"0px 40px 0px 40px",padding:"0px 0px 30px 0px",minHeight:"600px",border:"0px solid",borderRadius:"20px"}}>
                  <Routes >
                  <Route path="/" element={<Home />} />
                  <Route path="/SelectStatement" element={<Select />} />
                </Routes>
                </div>
                
              </Content>
              <Footer className="footer" style={footerStyle}>
                ACC-Life Statement BBL
              </Footer>
            </Layout>
          </Space>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
