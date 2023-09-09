"use client";

import {
  Avatar,
  Button,
  Card,
  CardGroup,
  Divider,
  Steps,
} from "@douyinfe/semi-ui";
import React from "react";

interface OrderCardProps {
  created: number;
  updated: number;
  deliveryId?: string;
  current: number;
  stepsTemplate: {
    title: string;
    desc: string;
  }[];
  stepsData: number[];
}

const OrderCard: React.FC<OrderCardProps> = ({
  created,
  updated,
  deliveryId,
  current,
  stepsTemplate,
  stepsData,
}) => {
  const stepParsedData = stepsData.map((rawData) =>
    new Date(rawData).toLocaleString()
  );

  return (
    <Card
      title={
        <div className="flex justify-between items-center">
          <span className="font-bold">2023 中秋订单</span>
          <span className="text-xs opacity-70">
            {new Date(created).toLocaleString()}
          </span>
        </div>
      }
      className="w-full"
      shadows="hover"
      footerLine={true}
      footer={
        <div className="flex justify-between items-center">
          <span className="text-xs opacity-70">
            最后更新于 {new Date(updated).toLocaleString()}
          </span>
          <>
            {deliveryId && <Button type="primary" className="mr-2">复制运单号</Button>}
            <Button theme="solid" type="primary">
              详情
            </Button>
          </>
        </div>
      }
    >
      <Steps type="basic" direction="vertical" size="small" current={current}>
        {stepsTemplate.map(({ title, desc }, idx) => (
          <Steps.Step
            title={title}
            description={
              stepParsedData[idx] ? desc + " " + stepParsedData[idx] : null
            }
            key={idx}
          />
        ))}
      </Steps>
    </Card>
  );
};

export default function Order() {
  const stepsTemplate = [
    {
      title: "已创建",
      desc: "订单创建于",
    },
    {
      title: "烘焙中",
      desc: "烘焙开始于",
    },
    {
      title: "已包装",
      desc: "月饼包装于",
    },
    {
      title: "运输中",
      desc: "开始运输于",
    },
    {
      title: "已完成",
      desc: "订单完成于",
    },
  ];

  const stepsData = [
    1694270152085, 1694290152085, 1694290252085, 1694300252085,
  ];

  return (
    <>
      <header className="p-4 shadow-sm bg-white">
        <span>
          <span className="ml-4 my-4 mr-2 font-bold text-xl">玖叁</span>
          的月饼订单
        </span>
      </header>
      <div className="p-6 flex flex-col bg-gray-100 h-[calc(100vh-60px)]">
        <CardGroup className="w-full">
          <OrderCard
            created={1694270152085}
            updated={1694300252085}
            stepsTemplate={stepsTemplate}
            stepsData={stepsData}
            current={3}
            deliveryId="sBNRguNMQq6v"
          />
        </CardGroup>
      </div>
    </>
  );
}
