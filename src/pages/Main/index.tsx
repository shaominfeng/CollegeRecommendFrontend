import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
} from "antd";
import React, { useState } from "react";
import { recommend } from "../../apis/commom";
import RecommendTable from "./RecommendTable";
const { Option } = Select;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { parse } = require("json2csv");
const Main = () => {
  const [subject, setSubject] = useState("physics");
  const [form] = Form.useForm();
  const [universities, setUniversities] = useState({});
  const onFinish = async (values: any) => {
    const data = (await recommend(subject, values.score)) as any;
    //console.log("Success:", values.score, subject, data);
    const result = data.school.schoolInfo.map((item: any) => ({
      院校代号: item.schoolId,
      "院校、专业组（再选科目要求）": item.required,
      "2021年投档最低分": item.lowestScore,
      投档最低分同分考生排序项: {
        语数成绩: item.sortRule.chineseAndMath,
        语数最高成绩: item.sortRule.chineseAndMathHighest,
        外语成绩: item.sortRule.english,
        首选科目成绩: item.sortRule.firstSubject,
        再选科目最高成绩: item.sortRule.secondSubject,
        志愿号: item.sortRule.id,
      },
    }));
    const csv = parse(result);
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

  const onCityChange = (value: string) => {
    switch (value) {
      case "jiangsu":
        form.setFieldsValue("jiangsu");
        return;
    }
  };
  return (
    <div className="query">
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
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            {" "}
            <Form.Item name="city" label="地区" rules={[{ required: true }]}>
              <Select
                placeholder="Select a option and change input text above"
                onChange={onCityChange}
                defaultValue="jiangsu"
              >
                <Option value="jiangsu">江苏</Option>
                <Option value="other" disabled>
                  待添加
                </Option>
                {/*<Option value="other">other</Option>*/}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}></Col>
        </Row>

        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            {" "}
            <Form.Item label="选科">
              <Radio.Group onChange={onChange} value={subject}>
                <Radio value="physics"> 物理 </Radio>
                <Radio value="history"> 历史 </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={8}></Col>
        </Row>

        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            {" "}
            <Form.Item
              label="总分"
              name="score"
              rules={[{ required: true, message: "总分忘记喽！" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}></Col>
        </Row>

        <Row>
          <Col span={8}></Col>
          <Col span={8}>
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
          </Col>
          <Col span={8}></Col>
        </Row>
      </Form>

      {(universities as any)?.school?.schoolInfo ? (
        <div className="query">
          <div>
            <Row>
              <Col span={8}>
                <p>
                  2022年分数:{(universities as any).scoreAndRank["2022"].score}
                </p>
                <p>
                  2022年全省排名:
                  {(universities as any).scoreAndRank["2022"].rank}
                </p>
                <p>
                  2021年换算分数:
                  {(universities as any).scoreAndRank["2021"].score}
                </p>
                <p>
                  2021年全省排名:
                  {(universities as any).scoreAndRank["2021"].rank}
                </p>
              </Col>
            </Row>
          </div>
          <RecommendTable
            universities={(universities as any).school.schoolInfo}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Main;
