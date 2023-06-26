import { useState , react, useEffect } from "react";
import "./App.css";
import Select from "./components/SelectStatement/Select";
import Home from "./components/Home/Home";
import { Layout, Space, Button,ConfigProvider } from "antd";
import { BrowserRouter as Router, Routes, Route , Link , useLocation } from "react-router-dom";

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
  const [path , setPath] = useState("");

  useEffect(()=>{

    console.log(window.location.pathname);
  },[])
  return (dddd
    <ConfigProvider
    theme={{
      token: {
        fontFamily:"Kanit",
      },
    }}
  >
    < div style={{fontFamily:"Kanit"}}>
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
                  <Link to="/"  className=" in-route">นำเข้าข้อมูล</Link>
                </li>
                <li>
                  <Link  to="/SelectStatement" className="in-route" >ค้นหา หรือ ลบรายการ</Link>
                </li>

              </ul>
            </Header>
            <Content style={contentStyle}>
            <div></div>

              <Routes>
              {/* <Route path="/" element={<Home />} />
                <Route path="/SelectStatement" element={<Select />} /> */}
                <Route path="/" element={<div>dwdwd</div>} />
                <Route path="/SelectStatement" element={<div>dwdwd</div>} />
              </Routes>
            </Content>
            <Footer className="footer" style={footerStyle}>ACC-LiFe Statement BBL</Footer>
          </Layout>
        </Space>
      </Router>
    </div>
  </ConfigProvider>
    
  );
}

export default App;
