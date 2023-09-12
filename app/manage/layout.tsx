"use client";
import { IconKanban, IconCart, IconUser } from "@douyinfe/semi-icons";
import { Nav, Dropdown, Avatar } from "@douyinfe/semi-ui";
import Link from "next/link";
import React from "react";

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav
        className="h-16"
        mode={"horizontal"}
        header={{
          text: "玖叁月饼订单系统",
        }}
        footer={
          <>
            <Dropdown
              position="bottomRight"
              render={
                <Dropdown.Menu>
                  <Dropdown.Item>修改密码</Dropdown.Item>
                  <Dropdown.Item>登出</Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <Avatar size="small" className="mr-2">
                玖叁
              </Avatar>
            </Dropdown>
          </>
        }
      />
      <Nav
        className="float-left h-[calc(100vh-4rem)]"
        defaultOpenKeys={["manage-side", "user-side"]}
        defaultSelectedKeys={["overview"]}
        footer={{
          collapseButton: true,
        }}
        renderWrapper={({ itemElement, isSubNav, isInSubNav, props }) => {
          return (
            <Link
              style={{ textDecoration: "none" }}
              href={`/manage/${props.itemKey}`}
            >
              {itemElement}
            </Link>
          );
        }}
        items={[
          {
            itemKey: "/",
            text: "数据面板",
            icon: <IconKanban />,
          },
          {
            itemKey: "manage-side",
            text: "管理侧",
            icon: <IconCart />,
            items: [
              {
                itemKey: "manage-activity",
                text: "活动管理",
              },
              {
                itemKey: "manage-mooncake",
                text: "月饼管理",
              },
              {
                itemKey: "manage-bake",
                text: "烘焙管理",
              },
            ],
          },
          {
            itemKey: "user-side",
            text: "用户侧",
            icon: <IconUser />,
            items: [
              {
                itemKey: "user-user",
                text: "用户管理",
              },
              {
                itemKey: "user-order",
                text: "订单管理",
              },
              {
                itemKey: "user-mooncake",
                text: "月饼管理",
              },
            ],
          },
        ]}
      ></Nav>
      <div className="flex flex-col p-6">{children}</div>
    </>
  );
}
