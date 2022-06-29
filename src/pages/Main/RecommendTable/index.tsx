import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import React from "react";
const RecommendTable = (props: { universities: any }) => {
  interface DataType {
    key: React.Key;
    schoolId: string;
    required: string;
    lowestScore: number;
    lastYearRank: number;
    chineseAndMathHighest: number;
    chineseAndMath: number;
    english: number;
    firstSubject: number;
    secondSubject: number;
    id: number;
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
      title: "2021年投档最低分",
      dataIndex: "lowestScore",
      key: "lowestScore",
      width: 50,
      fixed: "left",
    },
    {
      title: "2021年投档最低名次",
      dataIndex: "lastYearRank",
      key: "lastYearRank",
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
    {
      title: "投档最低分同分考生排序项",
      children: [
        {
          title: "语数成绩",
          dataIndex: "chineseAndMath",
          key: "chineseAndMath",
          width: 50,
        },
        {
          title: "语数最高成绩",
          dataIndex: "chineseAndMathHighest",
          key: "chineseAndMathHighest",
          width: 50,
        },
        {
          title: "外语成绩",
          dataIndex: "english",
          key: "english",
          width: 50,
        },
        {
          title: "首选科目成绩",
          dataIndex: "firstSubject",
          key: "firstSubject",
          width: 50,
        },
        {
          title: "再选科目最高成绩",
          dataIndex: "secondSubject",
          key: "secondSubject",
          width: 50,
        },
        {
          title: "志愿号",
          dataIndex: "id",
          key: "id",
          width: 50,
        },
      ],
    },
  ];
  console.log(props.universities);
  const data: DataType[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      schoolId: props.universities[i]?.schoolId,
      lowestScore: props.universities[i]?.lowestScore,
      lastYearRank: props.universities[i]?.lastYearRank,
      required: props.universities[i]?.required,
      chineseAndMathHighest:
        props.universities[i]?.sortRule.chineseAndMathHighest,
      chineseAndMath: props.universities[i]?.sortRule?.chineseAndMath,
      english: props.universities[i]?.sortRule?.english,
      firstSubject: props.universities[i]?.sortRule?.firstSubject,
      secondSubject: props.universities[i]?.sortRule?.secondSubject,
      id: props.universities[i]?.sortRule?.id,
    });
  }
  // console.log("data", data);
  return (
    <Table
      style={{ margin: "8px" }}
      columns={columns}
      dataSource={data}
      bordered
      size="large"
      scroll={{ x: "calc(700px + 50%)" }}
    />
  );
};

export default RecommendTable;
