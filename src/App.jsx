import { useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { Layout, Space, Button } from "antd";

const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#b37feb",  
  position:"sticky",
  top:0
};
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
  backgroundColor: "#b37feb",
  position:"sticky",
  bottom:0,
  minHeight: '50px'
};


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
        size={[0, 48]}
      >
        <Layout>
          <Header style={headerStyle}>Header</Header>
          <Home style={contentStyle}></Home>
          <Footer style={footerStyle}>footer</Footer>
        </Layout>
      </Space>
    </>
  );
}

export default App;
