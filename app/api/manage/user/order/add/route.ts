import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { Order } from "@/entities/Order";
import {
  OrderAddBody,
  OrderAdd,
} from "@/types/packet/request/manage/user/Ordet";
import { Activity } from "@/entities/Activity";
import { User } from "@/entities/User";

const activityRepository = AppDataSource.getRepository(Activity);
const userRepository = AppDataSource.getRepository(User);
const orderRepository = AppDataSource.getRepository(Order);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OrderAddBody;

    const data = new OrderAdd(body);

    // activity
    const activity = await activityRepository.findOneBy({
      id: body.activityId,
    });
    if (!activity)
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到对应活动",
        data: {
          id: body.activityId,
        },
      });
    data.activity = activity;

    // user
    const user = await userRepository.findOneBy({
      id: body.userId,
    });
    if (!user)
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到对应用户",
        data: {
          id: body.userId,
        },
      });
    data.user = user;

    const result = await orderRepository.save(data);
    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
