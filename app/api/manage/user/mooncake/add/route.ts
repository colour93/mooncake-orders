import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { Mooncake } from "@/entities/Mooncake";
import {
  MooncakeAddBody,
  MooncakeAdd,
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
    const body = (await req.json()) as MooncakeAddBody;

    const data = new MooncakeAdd();

    // order
    const order = await orderRepository.findOne({
      relations: {
        activity: true,
      },
      where: { id: body.orderId },
    });
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
    const mooncakeType = await mooncakeTypeRepository.findOne({
      relations: {
        activities: true,
      },
      where: {
        id: body.mooncakeTypeId,
      },
    });
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
    data.mooncakeType = mooncakeType;

    // mooncakeMould
    const mooncakeMould = await mooncakeMouldRepository.findOne({
      relations: {
        series: {
          activities: true,
        },
      },
      where: {
        id: body.mooncakeMouldId,
      },
    });
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

    const result = await mooncakeRepository.save(data);
    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
