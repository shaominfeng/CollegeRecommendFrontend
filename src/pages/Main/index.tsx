import { Button, Form, Input, Radio, RadioChangeEvent, Space } from "antd";
import React, { useState } from "react";
import { recommend } from "../../apis/commom";
import RecommendTable from "./RecommendTable";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { parse } = require("json2csv");
const Main = () => {
  const [subject, setSubject] = useState("physics");
  const [form] = Form.useForm();
  const [universities, setUniversities] = useState({});
  const onFinish = async (values: any) => {
    const data = (await recommend(subject, values.score)) as any;
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

  async function query() {
    try {
      console.log("Success:", subject, form.getFieldValue("score"));
      const response = (await recommend(
        subject,
        form.getFieldValue("score")
      )) as any;
      setUniversities(response);
      console.log(response);
    } catch (e) {}
  }

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
        form={form}
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
          <Space size="large">
            <Button type="primary" onClick={query}>
              查询
            </Button>
            <Button type="primary" htmlType="submit">
              下载推荐表
            </Button>
          </Space>
        </Form.Item>
      </Form>
      {(universities as any)["学校推荐"] ? (
        <RecommendTable
          universities={(universities as any)["学校推荐"]["学校填报信息"]}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Main;
