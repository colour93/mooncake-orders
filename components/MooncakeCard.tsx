import { Card, InputGroup, Popover, Select } from "@douyinfe/semi-ui";
import {
  MooncakeInfo,
  MooncakeMould,
  MooncakeMouldSeries,
  MooncakeType,
} from "@/types/Mooncake";

interface MooncakeCardProps {
  index: number;
  mooncakeInfo: MooncakeInfo;
  updateMooncakeInfo: (mooncakeInfo: MooncakeInfo, index: number) => void;
  mooncakeTypes: MooncakeType[];
  mooncakeMoulds: MooncakeMould[];
  disabled?: boolean;
}

const MooncakeCard: React.FC<MooncakeCardProps> = ({
  index,
  mooncakeInfo,
  updateMooncakeInfo,
  mooncakeTypes,
  mooncakeMoulds,
  disabled = false,
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
      trigger={disabled ? "custom" : "click"}
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
            {mooncakeTypes.map(({ typeId, typeName }, idx) => (
              <Select.Option key={idx} value={typeId}>
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
            {mooncakeMouldSeries.map(
              ({ seriesId, seriesName, moulds }, idx) => (
                <Select.OptGroup key={idx} label={seriesName}>
                  {moulds.map(({ mouldId, mouldName }, idx) => (
                    <Select.Option key={idx} value={mouldId}>
                      {mouldName}
                    </Select.Option>
                  ))}
                </Select.OptGroup>
              )
            )}
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

export { MooncakeCard };
