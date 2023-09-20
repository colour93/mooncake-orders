import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { Mooncake } from "@/entities/Mooncake";
import {
  MooncakeUpdateBody,
  MooncakeUpdate,
} from "@/types/packet/request/manage/user/Mooncake";
import { Order } from "@/entities/Order";
import { MooncakeType } from "@/entities/MooncakeType";
import { MooncakeMould } from "@/entities/MooncakeMould";

const orderRepository = AppDataSource.getRepository(Order);
const mooncakeTypeRepository = AppDataSource.getRepository(MooncakeType);
const mooncakeMouldRepository = AppDataSource.getRepository(MooncakeMould);
const mooncakeRepository = AppDataSource.getRepository(Mooncake);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as MooncakeUpdateBody;

    // 先获取 mooncake 方便比对
    const mooncake = await mooncakeRepository.findOne({
      relations: {
        order: {
          activity: true,
        },
        mooncakeType: {
          activities: true,
        },
        mooncakeMould: {
          series: {
            activities: true,
          },
        },
      },
      where: {
        id: body.id,
      },
    });
    if (!mooncake)
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到月饼记录",
        data: {
          id: body.id,
        },
      });

    const data = new MooncakeUpdate(body);

    // order
    const order = body.orderId
      ? await orderRepository.findOneBy({ id: body.orderId })
      : mooncake.order;
    if (!order)
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到对应订单",
        data: {
          id: body.orderId,
        },
      });
    data.order = order;

    // mooncakeType
    const mooncakeType = body.mooncakeTypeId
      ? await mooncakeTypeRepository.findOne({
          relations: {
            activities: true,
          },
          where: {
            id: body.mooncakeTypeId,
          },
        })
      : mooncake.mooncakeType;
    if (!mooncakeType)
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到对应月饼口味",
        data: {
          id: body.mooncakeTypeId,
        },
      });
    if (!mooncakeType.activities?.map((v) => v.id).includes(order.activity.id))
      return NextResponse.json({
        code: ResponseCode.BAD_REQUEST,
        msg: "所选月饼口味与订单的活动 ID 不匹配",
        data: {},
      });

    // mooncakeMould
    const mooncakeMould = body.mooncakeMouldId
      ? await mooncakeMouldRepository.findOne({
          relations: {
            series: {
              activities: true,
            },
          },
          where: {
            id: body.mooncakeMouldId,
          },
        })
      : mooncake.mooncakeMould;
    if (!mooncakeMould)
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到对应月饼模具",
        data: {
          id: body.mooncakeMouldId,
        },
      });
    if (
      !mooncakeMould.series.activities
        ?.map((v) => v.id)
        .includes(order.activity.id)
    )
      return NextResponse.json({
        code: ResponseCode.BAD_REQUEST,
        msg: "所选月饼模具与订单的活动 ID 不匹配",
        data: {},
      });
    data.mooncakeMould = mooncakeMould;

    const result = await mooncakeRepository.update(
      {
        id: body.id,
      },
      data
    );
    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
