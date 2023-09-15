"use client";

import { MooncakeCard } from "@/components/MooncakeCard";
import { UserHeaderContext } from "@/contexts/UserHeaderContext";
import { SignupMooncakeInfo, SignupMooncakeMould, SignupMooncakeType } from "@/types/Mooncake";
import {
  IconHash,
  IconIdentity,
  IconKey,
  IconMail,
  IconUserCardPhone,
} from "@douyinfe/semi-icons";
import {
  Banner,
  Button,
  CardGroup,
  Descriptions,
  Form,
  Highlight,
} from "@douyinfe/semi-ui";
import Section from "@douyinfe/semi-ui/lib/es/form/section";
import Numeral from "@douyinfe/semi-ui/lib/es/typography/numeral";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";

export default function SignupPage() {
  const title = "2023中秋月饼信息收集表";

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
      mouldImage:
        "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg",
      seriesId: 1,
      seriesName: "花好月圆",
    },
    {
      mouldId: 2,
      mouldName: "好",
      mouldImage:
        "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg",
      seriesId: 1,
      seriesName: "花好月圆",
    },
    {
      mouldId: 3,
      mouldName: "月",
      mouldImage:
        "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg",
      seriesId: 1,
      seriesName: "花好月圆",
    },
    {
      mouldId: 4,
      mouldName: "圆",
      mouldImage:
        "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg",
      seriesId: 1,
      seriesName: "花好月圆",
    },
    {
      mouldId: 5,
      mouldName: "雄狮1",
      mouldImage:
        "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg",
      seriesId: 2,
      seriesName: "万狮如意",
    },
    {
      mouldId: 6,
      mouldName: "雄狮2",
      mouldImage:
        "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg",
      seriesId: 2,
      seriesName: "万狮如意",
    },
    {
      mouldId: 7,
      mouldName: "如意1",
      mouldImage:
        "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg",
      seriesId: 2,
      seriesName: "万狮如意",
    },
    {
      mouldId: 8,
      mouldName: "如意2",
      mouldImage:
        "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg",
      seriesId: 2,
      seriesName: "万狮如意",
    },
    {
      mouldId: 9,
      mouldName: "樱花1",
      mouldImage:
        "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg",
      seriesId: 3,
      seriesName: "樱花",
    },
    {
      mouldId: 10,
      mouldName: "樱花2",
      mouldImage:
        "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg",
      seriesId: 3,
      seriesName: "樱花",
    },
    {
      mouldId: 11,
      mouldName: "樱花3",
      mouldImage:
        "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg",
      seriesId: 3,
      seriesName: "樱花",
    },
    {
      mouldId: 12,
      mouldName: "樱花4",
      mouldImage:
        "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg",
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

  const [accessKey, setAccessKey] = useState("");
  const [deliveryName, setDeliveryName] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [freight, setFreight] = useState(0);
  const [cost, setCost] = useState(freight + 3);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

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
      <Form className="m-6">
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
              />
            ))}
          </CardGroup>
        </Section>

        <Section text="注册密钥" className="my-2">
          <Form.Input
            field="accessKey"
            label="注册密钥"
            prefix={<IconKey />}
            placeholder="如果你能看见这句话请联系玖叁捏"
            onChange={setAccessKey}
          />
        </Section>

        <Section text="收货信息" className="my-2">
          <Form.Input
            field="deliveryName"
            label="收货人姓名"
            prefix={<IconIdentity />}
            placeholder="酒酸"
            helpText="建议为昵称"
            onChange={setDeliveryName}
          />
          <Form.Input
            field="deliveryPhone"
            label="收货人手机号"
            prefix={<IconUserCardPhone />}
            placeholder="110"
            type="tel"
            onChange={(v) => setDeliveryPhone(Number(v))}
          />
          <Form.TextArea
            field="deliveryAddress"
            label="收货人地址"
            placeholder="北京市东城区长安街北侧"
            showClear
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

        <Section text="账号信息" className="relative my-2">
          <Form.Input
            className="relative"
            field="email"
            label="账号邮箱"
            prefix={<IconMail />}
            placeholder="1919810@gmail.com"
            suffix={
              <div
                className="w-20"
                style={{
                  color: "var(--semi-color-link)",
                  fontSize: 14,
                  userSelect: "none",
                  cursor: "pointer",
                }}
              >
                发送验证码
              </div>
            }
            helpText={
              <Highlight
                sourceString="用于接收订单状态推送与账号登录"
                searchWords={["接收订单状态推送", "账号登录"]}
                highlightStyle={{
                  borderRadius: 6,
                  marginLeft: 4,
                  marginRight: 4,
                  paddingLeft: 4,
                  paddingRight: 4,
                  backgroundColor: "rgba(var(--semi-teal-5), 1)",
                  color: "rgba(var(--semi-white), 1)",
                }}
              />
            }
            onChange={setEmail}
          />
          <Form.Input
            field="otp"
            label="邮箱验证码"
            prefix={<IconHash />}
            placeholder="114514"
            type="number"
            maxLength={6}
            onChange={setOtp}
          />
        </Section>

        <Button theme="solid" type="primary" block size="large">
          提交
        </Button>
      </Form>
    </>
  );
}
