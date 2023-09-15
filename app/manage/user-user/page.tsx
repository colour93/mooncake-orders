"use client";

import { UserInfo, UserInfoFormatted } from "@/types/User";
import { IconDelete, IconEdit, IconMore } from "@douyinfe/semi-icons";
import { Button, ButtonGroup, Table, Typography } from "@douyinfe/semi-ui";

export default function UserUserPage() {
  const { Title } = Typography;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 50,
      fixed: true,
    },
    {
      title: "昵称",
      dataIndex: "name",
      fixed: true,
    },
    {
      title: "订单数",
      dataIndex: "orderCount",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "创建时间",
      dataIndex: "createdString",
    },
    {
      title: "操作",
      width: 100,
      render: (_text: any, record: UserInfoFormatted) => (
        <ButtonGroup>
          <Button icon={<IconEdit />} aria-label="编辑"></Button>
          <Button icon={<IconDelete />} aria-label="删除"></Button>
        </ButtonGroup>
      ),
    },
  ];
  const data: UserInfo[] = [
    {
      id: 1,
      name: "玖叁",
      email: "colour_93@furry.top",
      orderCount: 1,
      created: 1694594107686,
    },
  ];
  return (
    <>
      <Title heading={2}>用户管理</Title>
      <div className="my-4">
        <Button theme="solid" type="primary">
          新增
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data.map((v) => new UserInfoFormatted(v))}
      />
    </>
  );
}
