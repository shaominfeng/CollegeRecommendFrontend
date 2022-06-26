import * as React from "react";
import { useEffect } from "react";
import { findAll } from "../../apis/commom";
import { Col, Layout, Row, Space } from "antd";
const { Header, Footer, Content } = Layout;
import "./index.less";
import Main from "../Main";
const Home = () => {
  useEffect(() => {
    //TODO: login account email
    (async function doCall() {
      const user = (await findAll()).data;
    })();
  }, []);
  return (
    <Layout className="body">
      <Header className="header">
        <h1 className="title">2022年高考志愿学校推荐</h1>
      </Header>
      <Content className="content">
        <Row className="main">
          <Col span={4}></Col>
          <Col span={16}>
            <Main />
          </Col>
          <Col span={4}></Col>
        </Row>
      </Content>
      {/*<Footer className="footer"> Footer</Footer>*/}
    </Layout>
  );
};

export default Home;
