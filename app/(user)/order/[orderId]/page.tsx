"use client";

import { MooncakeCard } from "@/components/MooncakeCard";
import { UserHeaderContext } from "@/contexts/UserHeaderContext";
import { SignupMooncakeInfo, SignupMooncakeMould, SignupMooncakeType } from "@/types/entity/Mooncake";
import { IconIdentity, IconUserCardPhone } from "@douyinfe/semi-icons";
import {
  Form,
  Banner,
  CardGroup,
  Descriptions,
  Button,
} from "@douyinfe/semi-ui";
import Section from "@douyinfe/semi-ui/lib/es/form/section";
import Numeral from "@douyinfe/semi-ui/lib/es/typography/numeral";
import Head from "next/head";
import { useContext, useState, useEffect } from "react";

export default function OrderDetailPage({
  params,
}: {
  params: { orderId: string };
}) {
  const title = "2023 中秋订单";

  const { setHeader } = useContext(UserHeaderContext);
  setHeader && setHeader(title);

  const [mooncakeTypes, setMooncakeTypes] = useState<SignupMooncakeType[]>([
    {
      typeId: 1,
      typeName: "奶香白豆沙",
    },
    {
      typeId: 2,
      typeName: "黑芝麻豆沙",
    },
    {
      typeId: 3,
      typeName: "咸蛋黄莲蓉",
    },
    {
      typeId: 4,
      typeName: "[流心]椰椰椰咖啡",
    },
    {
      typeId: 5,
      typeName: "[流心]薄荷巧克力",
    },
  ]);

  const [mooncakeMoulds, setMooncakeMoulds] = useState<SignupMooncakeMould[]>([
    {
      mouldId: 1,
      mouldName: "花",
      seriesId: 1,
      seriesName: "花好月圆",
    },
    {
      mouldId: 2,
      mouldName: "好",
      seriesId: 1,
      seriesName: "花好月圆",
    },
    {
      mouldId: 3,
      mouldName: "月",
      seriesId: 1,
      seriesName: "花好月圆",
    },
    {
      mouldId: 4,
      mouldName: "圆",
      seriesId: 1,
      seriesName: "花好月圆",
    },
    {
      mouldId: 5,
      mouldName: "雄狮1",
      seriesId: 2,
      seriesName: "万狮如意",
    },
    {
      mouldId: 6,
      mouldName: "雄狮2",
      seriesId: 2,
      seriesName: "万狮如意",
    },
    {
      mouldId: 7,
      mouldName: "如意1",
      seriesId: 2,
      seriesName: "万狮如意",
    },
    {
      mouldId: 8,
      mouldName: "如意2",
      seriesId: 2,
      seriesName: "万狮如意",
    },
    {
      mouldId: 9,
      mouldName: "樱花1",
      seriesId: 3,
      seriesName: "樱花",
    },
    {
      mouldId: 10,
      mouldName: "樱花2",
      seriesId: 3,
      seriesName: "樱花",
    },
    {
      mouldId: 11,
      mouldName: "樱花3",
      seriesId: 3,
      seriesName: "樱花",
    },
    {
      mouldId: 12,
      mouldName: "樱花4",
      seriesId: 3,
      seriesName: "樱花",
    },
  ]);

  const [mooncakeGroup, setMooncakeGroup] = useState<SignupMooncakeInfo[]>([
    {
      typeId: 1,
      seriesId: 1,
      mouldId: 1,
    },
    {
      typeId: 2,
      seriesId: 1,
      mouldId: 2,
    },
    {
      typeId: 3,
      seriesId: 1,
      mouldId: 3,
    },
    {
      typeId: 4,
      seriesId: 1,
      mouldId: 4,
    },
    {
      typeId: 5,
      seriesId: 2,
      mouldId: 5,
    },
    {
      typeId: 2,
      seriesId: 2,
      mouldId: 7,
    },
  ]);

  const updateMooncakeGroup = (mooncakeInfo: SignupMooncakeInfo, index: number) => {
    let originMooncakeGroup = mooncakeGroup.slice();
    originMooncakeGroup[index] = mooncakeInfo;
    setMooncakeGroup(originMooncakeGroup);
  };

  const [deliveryName, setDeliveryName] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [freight, setFreight] = useState(0);
  const [cost, setCost] = useState(freight + 3);

  const [deadlineData, setDeadlineData] = useState<{
    timestamp: number | null;
    disabled: boolean;
  }>({
    timestamp: 1694340680400,
    disabled: false,
  });

  useEffect(() => {
    setCost(freight + 3);
  }, [freight]);

  const currencyParser = (oldVal: string) => {
    return oldVal
      .split(" ")
      .map((item) =>
        Number(item) || Number(item) === 0
          ? `￥${Number(item)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
          : item
      )
      .join(" ");
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Banner
        fullMode={false}
        type={deadlineData.disabled ? "danger" : "info"}
        closeIcon={null}
        className="my-2 mx-6"
        description={
          deadlineData.timestamp
            ? `信息编辑截至 ${new Date(
                deadlineData.timestamp
              ).toLocaleString()}`
            : "信息编辑无时间限制"
        }
      />
      <Form className="m-6" disabled={deadlineData.disabled}>
        <Section text="月饼信息" className="my-2">
          <Banner
            fullMode={false}
            type="info"
            closeIcon={null}
            className="my-2"
            description="点击编辑"
          />
          <CardGroup>
            {mooncakeGroup.map((mooncakeInfo, idx) => (
              <MooncakeCard
                key={idx}
                index={idx}
                mooncakeInfo={mooncakeInfo}
                updateMooncakeInfo={updateMooncakeGroup}
                mooncakeTypes={mooncakeTypes}
                mooncakeMoulds={mooncakeMoulds}
                disabled={deadlineData.disabled}
              />
            ))}
          </CardGroup>
        </Section>

        <Section text="收货信息" className="my-2">
          <Form.Input
            field="deliveryName"
            label="收货人姓名"
            prefix={<IconIdentity />}
            placeholder="酒酸"
            helpText="建议为昵称"
            initValue={deliveryName}
            onChange={setDeliveryName}
          />
          <Form.Input
            field="deliveryPhone"
            label="收货人手机号"
            prefix={<IconUserCardPhone />}
            placeholder="110"
            type="tel"
            initValue={deliveryPhone}
            onChange={(v) => setDeliveryPhone(Number(v))}
          />
          <Form.TextArea
            field="deliveryAddress"
            label="收货人地址"
            placeholder="北京市东城区长安街北侧"
            showClear
            initValue={deliveryAddress}
            onChange={setDeliveryAddress}
          />
        </Section>

        <Section text="价格计算" className="my-2">
          <Banner
            fullMode={false}
            type="info"
            closeIcon={null}
            className="my-2"
            description="仅供参考，实际请询问玖叁"
          />
          <Descriptions align="justify" className="flex justify-center">
            <Descriptions.Item itemKey="包装费">
              <Numeral parser={currencyParser}>{3}</Numeral>
            </Descriptions.Item>
            <Descriptions.Item itemKey="运费">
              <Numeral parser={currencyParser}>{freight}</Numeral>
            </Descriptions.Item>
            <Descriptions.Item itemKey="合计">
              <Numeral parser={currencyParser}>{cost}</Numeral>
            </Descriptions.Item>
          </Descriptions>
        </Section>

        <div className="flex justify-end">
          <Button className="ml-2" type="primary">
            取消
          </Button>
          <Button
            className="ml-2"
            theme="solid"
            type="primary"
            disabled={deadlineData.disabled}
          >
            保存
          </Button>
        </div>
      </Form>
    </>
  );
}
