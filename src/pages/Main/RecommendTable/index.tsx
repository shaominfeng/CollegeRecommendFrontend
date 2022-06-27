import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import React from "react";
const RecommendTable = (universities: any) => {
  interface DataType {
    key: React.Key;
    id: string;
    required: string;
    score: number;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "院校代号",
      dataIndex: "id",
      key: "id",
      width: 100,
      fixed: "left",
    },
    {
      title: "投当最低分数线",
      dataIndex: "score",
      key: "score",
      width: 100,
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
  console.log(universities);
  const data: DataType[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      id: universities[i]["院校代号"],
      score: universities[i]["投当最低分数线"],
      required: universities[i]["院校、专业组（再选科目要求）"],
    });
  }
  console.log("data", data);
  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      size="middle"
      scroll={{ x: "calc(700px + 50%)", y: 240 }}
    />
  );
};

export default RecommendTable;
