import { useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { Layout, Space, Button } from "antd";

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
          <Header className="header" >Header</Header>
          <Content style={contentStyle }>Content</Content>
          <Footer style={footerStyle}>Footer</Footer>
        </Layout>
      </Space>
    </>
  );
}

export default App;
