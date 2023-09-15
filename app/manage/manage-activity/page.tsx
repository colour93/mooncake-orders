"use client";

import {
  ActivityInfo,
  ActivityInfoFormatted,
} from "@/types/entity/Activity";
import { IconDelete, IconEdit } from "@douyinfe/semi-icons";
import { Button, ButtonGroup, Table, Typography } from "@douyinfe/semi-ui";

export default function ManageActivityPage() {
  const { Title } = Typography;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 50,
      fixed: true,
    },
    {
      title: "名称",
      dataIndex: "name",
      fixed: true,
    },
    {
      title: "状态",
      dataIndex: "statusString",
      // render: (text: number) => {},
    },
    {
      title: "订单数",
      dataIndex: "orderCount",
    },
    {
      title: "开始时间",
      dataIndex: "startTimeString",
      // render: (text: number) => new Date(text).toLocaleString(),
    },
    {
      title: "截至时间",
      dataIndex: "upToTimeString",
      // render: (text: number) => new Date(text).toLocaleString(),
    },
    {
      title: "操作",
      width: 100,
      render: (_text: any, record: ActivityInfo) => (
        <ButtonGroup>
          <Button icon={<IconEdit />} aria-label="编辑"></Button>
          <Button icon={<IconDelete />} aria-label="删除"></Button>
        </ButtonGroup>
      ),
    },
  ];
  const data: ActivityInfo[] = [
    {
      id: 1,
      name: "2023中秋",
      status: 2,
      orderCount: 1,
      startTime: 1694488000095,
      upToTime: 1694488519598,
    },
    {
      id: 2,
      name: "2022中秋",
      status: 3,
      orderCount: 3,
      startTime: 1654488000095,
      upToTime: 1654488519598,
    },
  ];
  return (
    <>
      <Title heading={2}>活动管理</Title>
      <div className="my-4">
        <Button theme="solid" type="primary">
          新增
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data.map((v) => new ActivityInfoFormatted(v))}
      />
    </>
  );
}
