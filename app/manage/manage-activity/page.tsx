"use client";

import { ActivityInfo, ActivityStatus } from "@/types/Activity";
import { IconDelete, IconEdit, IconMore } from "@douyinfe/semi-icons";
import {
  Button,
  ButtonGroup,
  Table,
  Typography,
} from "@douyinfe/semi-ui";

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
      dataIndex: "status",
      render: (text: number) => {
        let content = "";
        switch (text) {
          case ActivityStatus.NOT_STARTED:
            content = "未开始";
            break;

          case ActivityStatus.IN_PROGRESS:
            content = "进行中";
            break;

          case ActivityStatus.FINISHED:
            content = "已截止";
            break;

          default:
            content = "未知状态";
            break;
        }
        return content;
      },
    },
    {
      title: "订单数",
      dataIndex: "orderCount",
    },
    {
      title: "开始时间",
      dataIndex: "startTime",
      render: (text: number) => new Date(text).toLocaleString(),
    },
    {
      title: "截至时间",
      dataIndex: "upToTime",
      render: (text: number) => new Date(text).toLocaleString(),
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
  ];
  return (
    <>
      <Title heading={2}>活动管理</Title>
      <div className="my-4">
        <Button theme="solid" type="primary">
          新增
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
