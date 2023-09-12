"use client";

import {
  ActivityInfo,
  ActivityInfoFormatted,
  ActivityStatus,
} from "@/types/Activity";
import { IconDelete, IconEdit, IconLink, IconMore } from "@douyinfe/semi-icons";
import {
  Button,
  ButtonGroup,
  Descriptions,
  Image,
  Popover,
  TabPane,
  Table,
  Tabs,
  Tag,
  Typography,
} from "@douyinfe/semi-ui";
import { TagColor } from "@douyinfe/semi-ui/lib/es/tag";

const ActivityTag: React.FC<{ activityInfo: ActivityInfo }> = ({
  activityInfo,
}) => {
  const {
    id,
    name,
    status,
    statusString,
    orderCount,
    startTimeString,
    upToTimeString,
  } = new ActivityInfoFormatted(activityInfo);
  const data = [
    {
      key: "ID",
      value: id,
    },
    {
      key: "状态",
      value: statusString,
    },
    {
      key: "订单数",
      value: orderCount,
    },
    {
      key: "开始时间",
      value: startTimeString,
    },
    {
      key: "截至时间",
      value: upToTimeString,
    },
  ];
  let tagColor: TagColor = "white";
  switch (status) {
    case ActivityStatus.NOT_STARTED:
      tagColor = "green";

      break;

    case ActivityStatus.IN_PROGRESS:
      tagColor = "blue";
      break;

    case ActivityStatus.FINISHED:
      tagColor = "red";
      break;

    default:
      break;
  }

  return (
    <Popover
      showArrow
      content={
        <Descriptions
          className="py-2 px-4"
          align="left"
          data={data}
        ></Descriptions>
      }
    >
      <Tag color={tagColor} className="mx-1">
        {name}
      </Tag>
    </Popover>
  );
};

export default function ManageMooncakePage() {
  const { Title, Text } = Typography;

  const typeColumns = [
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
      title: "链接",
      dataIndex: "link",
      render: (link: string) => (
        <Text icon={<IconLink />} link={{ href: link, target: "_blank" }} underline>{link}</Text>
      ),
    },
    {
      title: "活动",
      dataIndex: "activity",
      render: (activits: ActivityInfo[]) => (
        <>{activits.map((activityInfo) => ActivityTag({ activityInfo }))}</>
      ),
    },
    {
      title: "操作",
      width: 100,
      render: (_text: any, record: any) => (
        <ButtonGroup>
          <Button icon={<IconEdit />} aria-label="编辑"></Button>
          <Button icon={<IconDelete />} aria-label="删除"></Button>
        </ButtonGroup>
      ),
    },
  ];
  const typeData = [
    {
      id: 1,
      name: "奶香白豆沙",
      link: "https://www.bilibili.com/video/BV1X341117FN/",
      activity: [
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
      ],
    },
  ];

  const mouldColumns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 50,
      fixed: true,
    },
    {
      title: "系列",
      dataIndex: "series",
      fixed: true,
    },
    {
      title: "名称",
      dataIndex: "name",
      fixed: true,
    },
    {
      title: "图片",
      dataIndex: "img",
      render: (link: string) => (
        <Image src=""></Image>
      ),
    },
    {
      title: "活动",
      dataIndex: "activity",
      render: (activits: ActivityInfo[]) => (
        <>{activits.map((activityInfo) => ActivityTag({ activityInfo }))}</>
      ),
    },
    {
      title: "操作",
      width: 100,
      render: (_text: any, record: any) => (
        <ButtonGroup>
          <Button icon={<IconEdit />} aria-label="编辑"></Button>
          <Button icon={<IconDelete />} aria-label="删除"></Button>
        </ButtonGroup>
      ),
    },
  ];
  const mouldData = [
    {
      id: 1,
      name: "花1",
      link: "https://www.bilibili.com/video/BV1X341117FN/",
      activity: [
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
      ],
    },
  ];

  return (
    <>
      <Title heading={2}>月饼管理</Title>
      <Tabs>
        <TabPane itemKey="1" tab="口味">
          <div className="my-4">
            <Button theme="solid" type="primary">
              新增
            </Button>
          </div>
          <Table columns={typeColumns} dataSource={typeData} />
        </TabPane>
        <TabPane itemKey="2" tab="模具">
          <div className="my-4">
            <Button theme="solid" type="primary">
              新增
            </Button>
          </div>
          <Table columns={mouldColumns} dataSource={mouldData} />
        </TabPane>
      </Tabs>
    </>
  );
}
