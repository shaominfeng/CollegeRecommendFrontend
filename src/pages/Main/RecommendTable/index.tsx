import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import React from "react";
const RecommendTable = (props: { universities: any }) => {
  interface DataType {
    key: React.Key;
    schoolId: string;
    required: string;
    lowestScore: number;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "院校代号",
      dataIndex: "schoolId",
      key: "schoolId",
      width: 50,
      fixed: "left",
    },
    {
      title: "投当最低分数线",
      dataIndex: "lowestScore",
      key: "lowestScore",
      width: 50,
      fixed: "left",
    },
    {
      title: "院校、专业组（再选科目要求）",
      dataIndex: "required",
      key: "required",
      width: 100,
      fixed: "left",
    },
  ];
  console.log(props.universities);
  const data: DataType[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      schoolId: props.universities[i].schoolId,
      lowestScore: props.universities[i].lowestScore,
      required: props.universities[i].required,
    });
  }
  console.log("data", data);
  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      size="large"
      // scroll={{ x: "calc(700px + 50%)", y: 240 }}
    />
  );
};

export default RecommendTable;
