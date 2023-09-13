"use client";

import { BakeInfo, BakeInfoFormatted, BakeMooncakeInfo } from "@/types/Bake";
import { IconDelete, IconEdit, IconPrint } from "@douyinfe/semi-icons";
import {
  Button,
  ButtonGroup,
  Card,
  CardGroup,
  Descriptions,
  Modal,
  Table,
  Typography,
} from "@douyinfe/semi-ui";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { Attributes, useRef, useState } from "react";

const BakeMooncakeCard: React.FC<{
  bakeMooncakeInfo: BakeMooncakeInfo;
  key: string | number;
}> = ({ bakeMooncakeInfo, key }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: bakeMooncakeInfo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const data = [
    {
      key: "模具",
      value: `${bakeMooncakeInfo.mould.series.name} - ${bakeMooncakeInfo.mould.name}`,
    },
    {
      key: "用户",
      value: bakeMooncakeInfo.user.name,
    },
    {
      key: "ID",
      value: bakeMooncakeInfo.id,
    },
  ];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-48 m-2"
    >
      <Card shadows="always">
        <Descriptions align="left" data={data} />
      </Card>
    </div>
  );
};

const BakeMooncakeCardGroup: React.FC<{
  bakeMooncakes: BakeMooncakeInfo[];
}> = ({ bakeMooncakes }) => {
  const [cards, setCards] = useState(bakeMooncakes);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    console.log(event);
    const { active, over } = event;

    if (active.id !== over?.id) {
      setCards((prevCards) => {
        const oldIndex = prevCards.findIndex((card) => card.id === active.id);
        const newIndex = prevCards.findIndex((card) => card.id === over?.id);

        return arrayMove(prevCards, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="grid grid-cols-5">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cards.map((card) => card.id)}
          strategy={verticalListSortingStrategy}
        >
          {cards.map((card) => (
            <BakeMooncakeCard key={card.id} bakeMooncakeInfo={card} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default function ManageBakePage() {
  const { Title } = Typography;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      fixed: true,
      width: 50,
    },
    {
      title: "口味",
      dataIndex: "type.name",
    },
    {
      title: "活动",
      dataIndex: "activity.name",
    },
    {
      title: "状态",
      dataIndex: "statusString",
    },
    {
      title: "数量",
      dataIndex: "count",
    },
    {
      title: "创建时间",
      dataIndex: "createdString",
    },
    {
      title: "操作",
      width: 150,
      render: (_text: any, record: BakeInfoFormatted) => (
        <ButtonGroup>
          <Button icon={<IconPrint />} aria-label="打印"></Button>
          <Button icon={<IconEdit />} aria-label="编辑"></Button>
          <Button icon={<IconDelete />} aria-label="删除"></Button>
        </ButtonGroup>
      ),
    },
  ];

  const data: BakeInfo[] = [
    {
      id: 1,
      type: {
        id: 1,
        name: "奶香白豆沙",
      },
      activity: {
        id: 1,
        name: "2023中秋",
      },
      status: 1,
      count: 10,
      created: 1694571388583,
    },
  ];

  const mooncakes: BakeMooncakeInfo[] = [
    {
      id: 1,
      activity: {
        id: 1,
        name: "2023中秋",
      },
      user: {
        id: 1,
        name: "玖叁",
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
    },
    {
      id: 2,
      activity: {
        id: 1,
        name: "2023中秋",
      },
      user: {
        id: 1,
        name: "玖叁",
      },
      type: {
        id: 1,
        name: "奶香白豆沙",
      },
      mould: {
        id: 1,
        name: "好",
        series: {
          id: 1,
          name: "花好月圆",
        },
      },
    },
  ];

  const [detailModalVisible, setDetailModalVisible] = useState(false);

  return (
    <>
      <Title heading={2}>烘焙管理</Title>
      <div className="my-4">
        <Button theme="solid" type="primary">
          新增
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data.map((v) => new BakeInfoFormatted(v))}
        onRow={(record: BakeInfoFormatted | undefined, index) => {
          return {
            onClick: (event) => {
              setDetailModalVisible(true);
            },
          };
        }}
      ></Table>

      <Modal
        style={{ width: "72rem" }}
        visible={detailModalVisible}
        closeOnEsc={true}
        onOk={() => {
          setDetailModalVisible(false);
        }}
        onCancel={() => {
          setDetailModalVisible(false);
        }}
      >
        <BakeMooncakeCardGroup
          bakeMooncakes={mooncakes}
        ></BakeMooncakeCardGroup>
      </Modal>
    </>
  );
}
