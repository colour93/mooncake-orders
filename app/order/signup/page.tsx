"use client";

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
  Card,
  CardGroup,
  Descriptions,
  Form,
  Highlight,
  InputGroup,
  Popconfirm,
  Popover,
  Rating,
  Select,
} from "@douyinfe/semi-ui";
import Section from "@douyinfe/semi-ui/lib/es/form/section";
import { Dispatch, SetStateAction, useState } from "react";

interface MooncakeType {
  typeId: number;
  typeName: string;
}

interface MooncakeMould {
  mouldId: number;
  mouldName: string;
  seriesId: number;
  seriesName: string;
}

interface MooncakeMouldSeries {
  seriesId: number;
  seriesName: string;
  moulds: {
    mouldId: number;
    mouldName: string;
  }[];
}

interface MooncakeInfo {
  typeId: number;
  seriesId: number;
  mouldId: number;
}

interface MooncakeCardProps {
  index: number;
  mooncakeInfo: MooncakeInfo;
  updateMooncakeInfo: (mooncakeInfo: MooncakeInfo, index: number) => void;
  mooncakeTypes: MooncakeType[];
  mooncakeMoulds: MooncakeMould[];
}

const MooncakeCard: React.FC<MooncakeCardProps> = ({
  index,
  mooncakeInfo,
  updateMooncakeInfo,
  mooncakeTypes,
  mooncakeMoulds,
}) => {
  const { typeId, seriesId, mouldId } = mooncakeInfo;

  // 组织 series
  const mooncakeMouldSeries: MooncakeMouldSeries[] = mooncakeMoulds.reduce(
    (result, mould) => {
      const existingSeries = result.find(
        (series) => series.seriesId === mould.seriesId
      );

      if (existingSeries) {
        existingSeries.moulds.push({
          mouldId: mould.mouldId,
          mouldName: mould.mouldName,
        });
      } else {
        result.push({
          seriesId: mould.seriesId,
          seriesName: mould.seriesName,
          moulds: [
            {
              mouldId: mould.mouldId,
              mouldName: mould.mouldName,
            },
          ],
        });
      }

      return result;
    },
    [] as MooncakeMouldSeries[]
  );

  return (
    <Popover
      trigger="click"
      showArrow
      content={
        <InputGroup>
          <Select
            placeholder="馅料"
            value={typeId}
            onChange={(v) => {
              mooncakeInfo.typeId = v as number;
              updateMooncakeInfo(mooncakeInfo, index);
            }}
          >
            {mooncakeTypes.map(({ typeId, typeName }) => (
              <Select.Option key={typeId} value={typeId}>
                {typeName}
              </Select.Option>
            ))}
          </Select>
          <Select
            placeholder="模具"
            value={mouldId}
            onChange={(v) => {
              mooncakeInfo.seriesId = mooncakeMoulds.find(
                (item) => item.mouldId === (v as number)
              )!.seriesId;
              mooncakeInfo.mouldId = v as number;

              updateMooncakeInfo(mooncakeInfo, index);
            }}
          >
            {mooncakeMouldSeries.map(({ seriesId, seriesName, moulds }) => (
              <Select.OptGroup key={seriesId} label={seriesName}>
                {moulds.map(({ mouldId, mouldName }) => (
                  <Select.Option key={mouldId} value={mouldId}>
                    {mouldName}
                  </Select.Option>
                ))}
              </Select.OptGroup>
            ))}
          </Select>
        </InputGroup>
      }
    >
      <Card
        style={{ maxWidth: "40vw" }}
        headerLine={false}
        shadows="hover"
        cover={
          <img
            alt="example"
            src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg"
          />
        }
      >
        <Card.Meta
          description={
            (mooncakeTypes.find((item) => item.typeId === typeId)?.typeName ??
              "馅料") +
            " - " +
            (mooncakeMoulds.find((item) => item.mouldId === mouldId)
              ?.mouldName ?? "模具")
          }
        ></Card.Meta>
      </Card>
    </Popover>
  );
};

export default function OrderSignup() {
  const [mooncakeTypes, setMooncakeTypes] = useState([
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

  const [mooncakeMoulds, setMooncakeMoulds] = useState([
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

  const [mooncakeGroup, setMooncakeGroup] = useState([
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

  const updateMooncakeInfo = (mooncakeInfo: MooncakeInfo, index: number) => {
    let originMooncakeGroup = mooncakeGroup.slice();
    originMooncakeGroup[index] = mooncakeInfo;
    setMooncakeGroup(originMooncakeGroup);
  };

  return (
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
              index={idx}
              mooncakeInfo={mooncakeInfo}
              updateMooncakeInfo={updateMooncakeInfo}
              mooncakeTypes={mooncakeTypes}
              mooncakeMoulds={mooncakeMoulds}
            />
          ))}
        </CardGroup>
      </Section>

      <Section text="注册密钥" className="my-2">
        <Form.Input
          field="accessCode"
          label="注册密钥"
          prefix={<IconKey />}
          placeholder="如果你能看见这句话请联系玖叁捏"
        />
      </Section>

      <Section text="收货信息" className="my-2">
        <Form.Input
          field="username"
          label="收货人姓名"
          prefix={<IconIdentity />}
          placeholder="酒酸"
          helpText="建议为昵称"
        />
        <Form.Input
          field="phone"
          label="收货人手机号"
          prefix={<IconUserCardPhone />}
          placeholder="110"
          type="tel"
        />
        <Form.TextArea
          field="address"
          label="收货人地址"
          placeholder="北京市东城区长安街北侧"
          showClear
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
          <Descriptions.Item itemKey="包装费">￥3.00</Descriptions.Item>
          <Descriptions.Item itemKey="运费">约￥19.00</Descriptions.Item>
          <Descriptions.Item itemKey="合计">约￥22.00</Descriptions.Item>
        </Descriptions>
      </Section>

      <Section text="账号信息" className="my-2">
        <Form.Input
          field="email"
          label="账号邮箱"
          prefix={<IconMail />}
          placeholder="1919810@gmail.com"
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
          extraText={
            <div
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
        />
        <Form.Input
          field="otp"
          label="邮箱验证码"
          prefix={<IconHash />}
          placeholder="114514"
          type="number"
          maxLength={6}
        />
      </Section>
    </Form>
  );
}
