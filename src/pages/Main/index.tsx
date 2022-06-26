import { Button, Form, Input, Radio, RadioChangeEvent } from "antd";
import React, { useState } from "react";
import { recommend } from "../../apis/commom";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { parse } = require("json2csv");
const Main = () => {
  const [subject, setSubject] = useState("physics");
  // const [universities, setUniversities] = useState({});
  const onFinish = async (values: any) => {
    const data = (await recommend(subject, values.score)) as any;
    // setUniversities(data);
    console.log("Success:", values.score, subject, data);
    const csv = parse(data["学校推荐"]["学校填报信息"]);
    const url = window.URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" })
    );
    const link = document.createElement("a");
    link.href = url;
    const sub = subject === "physics" ? "物理" : "历史";
    link.download = `2022年高考志愿推荐-${sub}-${values.score}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // function download() {
  //   try {
  //     const response = await recommend(subject, values.score);
  //     let fileName = "2022年志愿推荐";
  //     const url = window.URL.createObjectURL(
  //       new Blob([response.data], { type: "application/pdf" })
  //     );
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = fileName;
  //     link.click();
  //   } catch (e) {}
  // }

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setSubject(e.target.value);
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size="large"
      >
        {/*<Form.Item*/}
        {/*  label="选科"*/}
        {/*  name="username"*/}
        {/*  rules={[{ required: true, message: "Please input your username!" }]}*/}
        {/*>*/}
        {/*  <Input />*/}
        {/*</Form.Item>*/}
        <Form.Item label="选科">
          <Radio.Group onChange={onChange} value={subject}>
            <Radio value="physics"> 物理 </Radio>
            <Radio value="history"> 历史 </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="总分"
          name="score"
          rules={[{ required: true, message: "总分忘记喽！" }]}
        >
          <Input />
        </Form.Item>
        {/*<Form.Item*/}
        {/*  label="Password"*/}
        {/*  name="password"*/}
        {/*  rules={[{ required: true, message: "Please input your password!" }]}*/}
        {/*>*/}
        {/*  <Input.Password />*/}
        {/*</Form.Item>*/}

        {/*<Form.Item*/}
        {/*  name="remember"*/}
        {/*  valuePropName="checked"*/}
        {/*  wrapperCol={{ offset: 8, span: 16 }}*/}
        {/*>*/}
        {/*  <Checkbox>Remember me</Checkbox>*/}
        {/*</Form.Item>*/}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          {/*<Button type="primary" onClick={() => download()}>*/}
          {/*  download*/}
          {/*</Button>*/}
          <Button type="primary" htmlType="submit">
            下载推荐表
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Main;
