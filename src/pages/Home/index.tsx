import * as React from "react";
// import { useEffect } from "react";
// import { findAll } from "../../apis/commom";
import { Col, Layout, Row } from "antd";
const { Header, Content } = Layout;
import "./index.less";
import Main from "../Main";
const Home = () => {
  const currentYear = new Date().getFullYear();
  // useEffect(() => {
  //   //TODO: login account email
  //   (async function doCall() {
  //     const user = (await findAll()).data;
  //   })();
  // }, []);
  return (
    <Layout className="body">
      <Header className="header">
        <h1 className="title">{`${currentYear}年高考志愿学校推荐`}</h1>
      </Header>
      <Content className="content">
        <Row className="main">
          <Col span={24}>
            <Main />
          </Col>
        </Row>
      </Content>
      {/*<Footer className="footer"> Footer</Footer>*/}
    </Layout>
  );
};

export default Home;
