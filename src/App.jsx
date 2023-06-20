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
