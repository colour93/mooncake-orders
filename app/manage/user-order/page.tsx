"use client";

import { OrderInfo, OrderInfoFormatted } from "@/types/Order";
import { UserInfo, UserInfoFormatted } from "@/types/User";
import { IconDelete, IconEdit, IconMore } from "@douyinfe/semi-icons";
import { Button, ButtonGroup, Table, Typography } from "@douyinfe/semi-ui";

export default function UserOrderPage() {
  const { Title } = Typography;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 50,
      fixed: true,
    },
    
    {
      title: "用户",
      dataIndex: "user.name",
    },
    {
      title: "收货人",
      dataIndex: "deliveryName",
    },
    {
      title: "状态",
      dataIndex: "statusString",
    },
    {
      title: "活动",
      dataIndex: "activity.name",
    },
    {
      title: "更新时间",
      dataIndex: "updatedString",
    },
    {
      title: "创建时间",
      dataIndex: "createdString",
    },
    {
      title: "操作",
      width: 100,
      render: (_text: any, record: OrderInfoFormatted) => (
        <ButtonGroup>
          <Button icon={<IconEdit />} aria-label="编辑"></Button>
          <Button icon={<IconDelete />} aria-label="删除"></Button>
        </ButtonGroup>
      ),
    },
  ];
  const data: OrderInfo[] = [
    {
      id: 1,
      user: {
        id: 1,
        name: "玖叁",
        email: "colour_93@furry.top",
        orderCount: 1,
        created: 1694594107686,
      },
      status: 1,
      activity: {
        id: 1,
        name: "2023中秋",
        status: 1,
        orderCount: 10,
        startTime: 1694594107686,
        upToTime: 1694594107686,
      },
      mooncakes: [
        {
          id: 1,
          activity: {
            id: 1,
            name: "2023中秋",
            status: 1,
            orderCount: 10,
            startTime: 1694594107686,
            upToTime: 1694594107686,
          },
          type: {
            id: 1,
            name: "奶香白豆沙",
          },
          mould: {
            id: 1,
            name: "花",
            series: {
              id: 1,
              name: "花好月圆",
            },
          },
          status: 1,
        },
      ],
      freight: 15,
      price: 15,
      cost: 30,
      isPayed: true,
      deliveryName: "九三三",
      deliveryPhone: 110,
      deliveryAddress: "地址",
      created: 1694594107686,
      updated: 1694594107686,
    },
  ];
  return (
    <>
      <Title heading={2}>订单管理</Title>
      <div className="my-4">
        <Button theme="solid" type="primary">
          新增
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data.map((v) => new OrderInfoFormatted(v))}
      />
    </>
  );
}
